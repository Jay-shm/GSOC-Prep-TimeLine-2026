import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { TimelinePhase, UserProgress, AnalyticsEvent } from '../types';
import { timelineData } from '../data/timelineData';

export const useFirebaseProgress = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phases, setPhases] = useState<TimelinePhase[]>(timelineData);

  // Load user progress from Firebase
  const loadUserProgress = async (): Promise<TimelinePhase[]> => {
    if (!currentUser) {
      setLoading(false);
      return timelineData;
    }

    try {
      setError(null);
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      const docSnap = await getDoc(userProgressRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as UserProgress;
        
        // Merge saved progress with timeline data
        const updatedPhases = timelineData.map(phase => {
          const savedPhase = userData.phases[phase.id];
          if (!savedPhase) return phase;
          
          return {
            ...phase,
            tasks: phase.tasks.map(task => {
              const savedTask = savedPhase.tasks[task.id];
              if (!savedTask) return task;
              
              return {
                ...task,
                completed: savedTask.completed,
                completedAt: savedTask.completedAt,
                subtasks: task.subtasks?.map(subtask => {
                  const savedSubtask = savedTask.subtasks?.[subtask.id];
                  if (!savedSubtask) return subtask;
                  
                  return {
                    ...subtask,
                    completed: savedSubtask.completed,
                    completedAt: savedSubtask.completedAt,
                  };
                }) || [],
              };
            }),
          };
        });
        
        setPhases(updatedPhases);
        setLoading(false);
        return updatedPhases;
      } else {
        // First-time user, initialize their progress
        await initializeUserProgress();
        setPhases(timelineData);
        setLoading(false);
        return timelineData;
      }
    } catch (err) {
      console.error('Error loading user progress:', err);
      setError('Failed to load your progress. Please try refreshing the page.');
      setLoading(false);
      return timelineData;
    }
  };

  // Initialize user progress for new users
  const initializeUserProgress = async () => {
    if (!currentUser) return;

    try {
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      const initialData: UserProgress = {
        userId: currentUser.uid,
        email: currentUser.email,
        phases: {},
        analytics: {
          totalTasks: timelineData.reduce((sum, phase) => sum + phase.tasks.length, 0),
          completedTasks: 0,
          totalSubtasks: timelineData.reduce(
            (sum, phase) => sum + phase.tasks.reduce((taskSum, task) => taskSum + (task.subtasks?.length || 0), 0),
            0
          ),
          completedSubtasks: 0,
          progressPercentage: 0,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          screenResolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
        },
      };

      await setDoc(userProgressRef, {
        ...initialData,
        'analytics.lastActive': serverTimestamp(),
        'analytics.createdAt': serverTimestamp(),
        'analytics.updatedAt': serverTimestamp(),
      });
    } catch (err) {
      console.error('Error initializing user progress:', err);
    }
  };

  // Save user progress to Firebase
  const saveUserProgress = async (updatedPhases: TimelinePhase[]) => {
    if (!currentUser) return;

    try {
      setSaving(true);
      setError(null);

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

      // Prepare progress data
      const progressData: Partial<UserProgress> = {
        phases: updatedPhases.reduce((acc, phase) => {
          acc[phase.id] = {
            tasks: phase.tasks.reduce((taskAcc, task) => {
              taskAcc[task.id] = {
                completed: task.completed,
                completedAt: task.completedAt ?? null, // Convert undefined to null
                subtasks: task.subtasks?.reduce((subtaskAcc, subtask) => {
                  subtaskAcc[subtask.id] = {
                    completed: subtask.completed,
                    completedAt: subtask.completedAt ?? null, // Convert undefined to null
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
          createdAt: new Date(), // This will be ignored if document exists
          updatedAt: new Date(),
        },
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          screenResolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
        },
      };

      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      await setDoc(userProgressRef, {
        ...progressData,
        userId: currentUser.uid,
        email: currentUser.email,
        'analytics.lastActive': serverTimestamp(),
        'analytics.updatedAt': serverTimestamp(),
      }, { merge: true });

      setSaving(false);
    } catch (err) {
      console.error('Error saving user progress:', err);
      setError('Failed to save your progress. Please try again.');
      setSaving(false);
    }
  };

  // Track analytics events
  const trackEvent = async (eventType: AnalyticsEvent['eventType'], eventData: any) => {
    if (!currentUser) return;

    try {
      const event: Omit<AnalyticsEvent, 'timestamp'> = {
        userId: currentUser.uid,
        eventType,
        eventData,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          screenResolution: `${screen.width}x${screen.height}`,
        },
      };

      await addDoc(collection(db, 'analytics'), {
        ...event,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error tracking event:', err);
    }
  };

  // Handle task toggle
  const handleTaskToggle = async (phaseId: string, taskId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            tasks: phase.tasks.map(task =>
              task.id === taskId
                ? { 
                    ...task, 
                    completed: !task.completed, 
                    completedAt: !task.completed ? new Date() : null 
                  }
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
        timestamp: new Date().toISOString(),
      });
    }
    
    // Save to Firebase
    await saveUserProgress(updatedPhases);
    
    return updatedPhases;
  };

  // Handle subtask toggle
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
                        ? { 
                            ...subtask, 
                            completed: !subtask.completed, 
                            completedAt: !subtask.completed ? new Date() : null 
                          }
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
        timestamp: new Date().toISOString(),
      });
    }
    
    // Save to Firebase
    await saveUserProgress(updatedPhases);
    
    return updatedPhases;
  };

  // Load progress on mount and auth state change
  useEffect(() => {
    if (currentUser) {
      loadUserProgress();
    } else {
      setPhases(timelineData);
      setLoading(false);
    }
  }, [currentUser]);

  // Set up real-time listener for progress updates
  useEffect(() => {
    if (!currentUser) return;

    const userProgressRef = doc(db, 'userProgress', currentUser.uid);
    const unsubscribe = onSnapshot(userProgressRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as UserProgress;
        
        // Only update if the document was updated by another device
        if (userData.analytics.updatedAt && 
            userData.analytics.updatedAt.toDate() > new Date(Date.now() - 5000)) {
          // Update phases with latest data from other devices
          const updatedPhases = timelineData.map(phase => {
            const savedPhase = userData.phases[phase.id];
            if (!savedPhase) return phase;
            
            return {
              ...phase,
              tasks: phase.tasks.map(task => {
                const savedTask = savedPhase.tasks[task.id];
                if (!savedTask) return task;
                
                return {
                  ...task,
                  completed: savedTask.completed,
                  completedAt: savedTask.completedAt,
                  subtasks: task.subtasks?.map(subtask => {
                    const savedSubtask = savedTask.subtasks?.[subtask.id];
                    if (!savedSubtask) return subtask;
                    
                    return {
                      ...subtask,
                      completed: savedSubtask.completed,
                      completedAt: savedSubtask.completedAt,
                    };
                  }) || [],
                };
              }),
            };
          });
          
          setPhases(updatedPhases);
        }
      }
    }, (error) => {
      console.error('Error listening to progress updates:', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return {
    phases,
    loading,
    saving,
    error,
    handleTaskToggle,
    handleSubtaskToggle,
    trackEvent,
    saveUserProgress,
    loadUserProgress,
  };
};