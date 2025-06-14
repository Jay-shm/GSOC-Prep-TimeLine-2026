import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import ProgressBar from '../components/ProgressBar';
import TimelineCard from '../components/TimelineCard';
import SocialLinks from '../components/SocialLinks';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import ProgressSkeleton from '../components/UI/ProgressSkeleton';
import { useFirebaseProgress } from '../hooks/useFirebaseProgress';
import { Cloud, CloudOff, Check } from 'lucide-react';

const Dashboard: React.FC = () => {
  const {
    phases,
    loading,
    saving,
    error,
    handleTaskToggle,
    handleSubtaskToggle,
    trackEvent,
  } = useFirebaseProgress();

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    // Track page view
    trackEvent('login', { 
      timestamp: new Date().toISOString(),
      page: 'dashboard'
    });
  }, []);

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

  if (loading) {
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
                Loading your progress...
              </p>
              <div className="flex justify-center mt-4">
                <LoadingSpinner size="lg" />
              </div>
            </motion.div>

            <ProgressSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      
      {/* Sync Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 right-4 z-50"
      >
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg text-xs font-medium ${
          saving 
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {saving ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-3 h-3" />
              <span>Synced</span>
            </>
          )}
        </div>
      </motion.div>
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Error Message */}
          <AnimatePresence>
            {error && showError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <ErrorMessage 
                  message={error} 
                  onDismiss={() => setShowError(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

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