export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  subtasks?: SubTask[];
  completedAt?: Date;
}

export interface TimelinePhase {
  id: string;
  title: string;
  period: string;
  description: string;
  tasks: Task[];
  color: string;
  icon: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface UserProgress {
  userId: string;
  email: string;
  phases: {
    [phaseId: string]: {
      tasks: {
        [taskId: string]: {
          completed: boolean;
          completedAt?: Date;
          subtasks?: {
            [subtaskId: string]: {
              completed: boolean;
              completedAt?: Date;
            };
          };
        };
      };
    };
  };
  analytics: {
    totalTasks: number;
    completedTasks: number;
    totalSubtasks: number;
    completedSubtasks: number;
    progressPercentage: number;
    lastActive: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  deviceInfo: {
    userAgent: string;
    platform: string;
    screenResolution: string;
    timezone: string;
    language: string;
  };
  location?: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface AnalyticsEvent {
  userId: string;
  eventType: 'task_completed' | 'subtask_completed' | 'phase_started' | 'login' | 'register';
  eventData: any;
  timestamp: Date;
  deviceInfo: {
    userAgent: string;
    platform: string;
    screenResolution: string;
  };
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
}