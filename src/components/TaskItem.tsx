import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onSubtaskToggle?: (taskId: string, subtaskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onSubtaskToggle }) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  
  const completedSubtasks = task.subtasks?.filter(subtask => subtask.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const hasSubtasks = totalSubtasks > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-100 rounded-lg overflow-hidden"
    >
      <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 hover:bg-gray-50 transition-colors">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-indigo-500 border-indigo-500 text-white'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check size={10} className="sm:w-3 sm:h-3" />
            </motion.div>
          )}
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs sm:text-sm font-medium transition-all break-words ${
                  task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-800'
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-xs text-gray-500 mt-1 break-words">{task.description}</p>
              )}
              {hasSubtasks && (
                <p className="text-xs text-indigo-600 mt-1">
                  {completedSubtasks}/{totalSubtasks} subtasks completed
                </p>
              )}
            </div>
            
            {hasSubtasks && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <motion.div
                  animate={{ rotate: showSubtasks ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="sm:w-4 sm:h-4 text-gray-500" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {hasSubtasks && (
        <AnimatePresence>
          {showSubtasks && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 bg-gray-50"
            >
              <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                {task.subtasks?.map((subtask) => (
                  <div key={subtask.id} className="flex items-start space-x-2 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSubtaskToggle?.(task.id, subtask.id)}
                      className={`flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center transition-all ${
                        subtask.completed
                          ? 'bg-indigo-400 border-indigo-400 text-white'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      {subtask.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={8} className="w-2 h-2" />
                        </motion.div>
                      )}
                    </motion.button>
                    <p
                      className={`text-xs transition-all flex-1 min-w-0 break-words ${
                        subtask.completed
                          ? 'text-gray-400 line-through'
                          : 'text-gray-600'
                      }`}
                    >
                      {subtask.title}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default TaskItem;