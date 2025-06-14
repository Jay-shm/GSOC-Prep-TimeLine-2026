import React from 'react';
import { motion } from 'framer-motion';

const ProgressSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Progress Bar Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100"
      >
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40"></div>
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-40 sm:w-48 mt-2"></div>
      </motion.div>

      {/* Timeline Cards Skeleton */}
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-48 sm:w-64 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-16 sm:w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>
            </div>
            
            <div className="h-12 sm:h-16 bg-gray-200 rounded mb-3 sm:mb-4"></div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2"></div>
              <div className="w-full bg-gray-200 rounded-full h-1"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressSkeleton;