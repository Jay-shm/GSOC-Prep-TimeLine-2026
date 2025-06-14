import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import ProgressBar from '../components/ProgressBar';
import TimelineCard from '../components/TimelineCard';
import SocialLinks from '../components/SocialLinks';
import { timelineData } from '../data/timelineData';
import { TimelinePhase } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';

const Dashboard: React.FC = () => {
  const [phases, setPhases] = useState<TimelinePhase[]>(timelineData);
  const { trackEvent, updateUserProgress } = useAnalytics();

  const handleTaskToggle = async (phaseId: string, taskId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            tasks: phase.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date() : undefined }
                : task
            )
          }
        : phase
    );
    
    setPhases(updatedPhases);
    
    // Track analytics
    const task = phases.find(p => p.id === phaseId)?.tasks.find(t => t.id === taskId);
    if (task) {
      await trackEvent('task_completed', {
        phaseId,
        taskId,
        taskTitle: task.title,
        completed: !task.completed,
      });
    }
    
    // Update user progress in Firebase
    await updateProgressToFirebase(updatedPhases);
  };

  const handleSubtaskToggle = async (phaseId: string, taskId: string, subtaskId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            tasks: phase.tasks.map(task =>
              task.id === taskId
                ? {
                    ...task,
                    subtasks: task.subtasks?.map(subtask =>
                      subtask.id === subtaskId
                        ? { ...subtask, completed: !subtask.completed, completedAt: !subtask.completed ? new Date() : undefined }
                        : subtask
                    )
                  }
                : task
            )
          }
        : phase
    );
    
    setPhases(updatedPhases);
    
    // Track analytics
    const subtask = phases.find(p => p.id === phaseId)?.tasks.find(t => t.id === taskId)?.subtasks?.find(s => s.id === subtaskId);
    if (subtask) {
      await trackEvent('subtask_completed', {
        phaseId,
        taskId,
        subtaskId,
        subtaskTitle: subtask.title,
        completed: !subtask.completed,
      });
    }
    
    // Update user progress in Firebase
    await updateProgressToFirebase(updatedPhases);
  };

  const updateProgressToFirebase = async (updatedPhases: TimelinePhase[]) => {
    const totalTasks = updatedPhases.reduce((sum, phase) => sum + phase.tasks.length, 0);
    const completedTasks = updatedPhases.reduce(
      (sum, phase) => sum + phase.tasks.filter(task => task.completed).length,
      0
    );
    const totalSubtasks = updatedPhases.reduce(
      (sum, phase) => sum + phase.tasks.reduce((taskSum, task) => taskSum + (task.subtasks?.length || 0), 0),
      0
    );
    const completedSubtasks = updatedPhases.reduce(
      (sum, phase) => sum + phase.tasks.reduce(
        (taskSum, task) => taskSum + (task.subtasks?.filter(subtask => subtask.completed).length || 0),
        0
      ),
      0
    );

    const progressData = {
      phases: updatedPhases.reduce((acc, phase) => {
        acc[phase.id] = {
          tasks: phase.tasks.reduce((taskAcc, task) => {
            taskAcc[task.id] = {
              completed: task.completed,
              completedAt: task.completedAt,
              subtasks: task.subtasks?.reduce((subtaskAcc, subtask) => {
                subtaskAcc[subtask.id] = {
                  completed: subtask.completed,
                  completedAt: subtask.completedAt,
                };
                return subtaskAcc;
              }, {} as any) || {},
            };
            return taskAcc;
          }, {} as any),
        };
        return acc;
      }, {} as any),
      analytics: {
        totalTasks,
        completedTasks,
        totalSubtasks,
        completedSubtasks,
        progressPercentage: Math.round((completedTasks / totalTasks) * 100),
        lastActive: new Date(),
      },
    };

    await updateUserProgress(progressData);
  };

  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.filter(task => task.completed).length,
    0
  );

  const totalSubtasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.reduce((taskSum, task) => taskSum + (task.subtasks?.length || 0), 0),
    0
  );
  const completedSubtasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.reduce(
      (taskSum, task) => taskSum + (task.subtasks?.filter(subtask => subtask.completed).length || 0),
      0
    ),
    0
  );

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-4 px-2">
              My GSoC 2026 AI Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Track your progress through the complete preparation roadmap for Google Summer of Code in AI/ML.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8 sm:mb-12">
            <ProgressBar progress={completedTasks} total={totalTasks} />
            {totalSubtasks > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 sm:mt-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-green-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Detailed Progress</h4>
                  <span className="text-sm sm:text-lg font-bold text-green-600">
                    {Math.round((completedSubtasks / totalSubtasks) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {completedSubtasks} of {totalSubtasks} subtasks completed
                </p>
              </motion.div>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {phases.map((phase, index) => (
              <TimelineCard
                key={phase.id}
                phase={phase}
                onTaskToggle={handleTaskToggle}
                onSubtaskToggle={handleSubtaskToggle}
                index={index}
              />
            ))}
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 py-6 sm:py-8 border-t border-gray-200"
          >
            <div className="text-center px-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Connect with the Community
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Join our Discord community for support, updates, and discussions with fellow GSoC aspirants!
              </p>
              
              <div className="flex justify-center mb-4 sm:mb-6">
                <SocialLinks />
              </div>
              
              <motion.a
                href="https://discord.gg/wq5RQgg2"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Join our Discord Community
              </motion.a>
              
              <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
                <p>Made with ❤️ by Jay Rane & AI</p>
                <p className="mt-1">© 2025 GSoC AI Prep Tracker. Built for aspiring GSoC contributors.</p>
              </div>
            </div>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;