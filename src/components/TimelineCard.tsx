import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Target, BookOpen, Code } from 'lucide-react';
import { TimelinePhase } from '../types';
import TaskItem from './TaskItem';

interface TimelineCardProps {
  phase: TimelinePhase;
  onTaskToggle: (phaseId: string, taskId: string) => void;
  onSubtaskToggle: (phaseId: string, taskId: string, subtaskId: string) => void;
  index: number;
}

const iconMap = {
  foundation: BookOpen,
  project: Code,
  opensource: Target,
  gsoc: Calendar,
};

const TimelineCard: React.FC<TimelineCardProps> = ({ 
  phase, 
  onTaskToggle, 
  onSubtaskToggle, 
  index 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completedTasks = phase.tasks.filter(task => task.completed).length;
  const totalSubtasks = phase.tasks.reduce((sum, task) => sum + (task.subtasks?.length || 0), 0);
  const completedSubtasks = phase.tasks.reduce(
    (sum, task) => sum + (task.subtasks?.filter(subtask => subtask.completed).length || 0), 
    0
  );
  
  const progressPercentage = Math.round((completedTasks / phase.tasks.length) * 100);
  const subtaskProgressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  
  const IconComponent = iconMap[phase.icon as keyof typeof iconMap] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div
        className={`p-4 sm:p-6 cursor-pointer transition-all hover:bg-gray-50 ${phase.color}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md flex-shrink-0">
              <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
                {phase.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{phase.period}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                {completedTasks}/{phase.tasks.length} tasks
              </p>
              {totalSubtasks > 0 && (
                <p className="text-xs text-gray-500">
                  {completedSubtasks}/{totalSubtasks} subtasks
                </p>
              )}
              <p className="text-xs text-gray-500">{progressPercentage}% complete</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </motion.div>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 break-words">
          {phase.description}
        </p>
        
        <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            />
          </div>
          {totalSubtasks > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subtaskProgressPercentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100"
          >
            <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
              {phase.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={(taskId) => onTaskToggle(phase.id, taskId)}
                  onSubtaskToggle={(taskId, subtaskId) => onSubtaskToggle(phase.id, taskId, subtaskId)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TimelineCard;