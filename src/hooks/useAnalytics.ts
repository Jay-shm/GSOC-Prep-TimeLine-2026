import { useEffect } from 'react';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { AnalyticsEvent, UserProgress } from '../types';

export const useAnalytics = () => {
  const { currentUser } = useAuth();

  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
    };
  };

  const getLocationInfo = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json?token=' + import.meta.env.VITE_IPINFO_TOKEN);

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();
      const [latitude, longitude] = (data.loc ?? '').split(',');

      return {
        country: data.country ?? null,
        region: data.region ?? null,
        city: data.city ?? null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
      };
    } catch (error) {
      console.warn('Could not fetch location data:', error);
      return null;
    }
  };

  const trackEvent = async (eventType: AnalyticsEvent['eventType'], eventData: any) => {
    if (!currentUser) return;

    try {
      const locationInfo = await getLocationInfo();
      const event: Omit<AnalyticsEvent, 'timestamp'> = {
        userId: currentUser.uid,
        eventType,
        eventData,
        deviceInfo: getDeviceInfo(),
        location: locationInfo ?? null,
      };

      await addDoc(collection(db, 'analytics'), {
        ...event,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const updateUserProgress = async (progressData: Partial<UserProgress>) => {
    if (!currentUser) return;

    try {
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      const locationInfo = await getLocationInfo();

      await setDoc(userProgressRef, {
        userId: currentUser.uid,
        email: currentUser.email,
        ...progressData,
        deviceInfo: getDeviceInfo(),
        location: locationInfo ?? null,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  const initializeUserProgress = async () => {
    if (!currentUser) return;

    try {
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      const locationInfo = await getLocationInfo();

      await setDoc(userProgressRef, {
        userId: currentUser.uid,
        email: currentUser.email,
        phases: {},
        analytics: {
          totalTasks: 0,
          completedTasks: 0,
          totalSubtasks: 0,
          completedSubtasks: 0,
          progressPercentage: 0,
          lastActive: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        deviceInfo: getDeviceInfo(),
        location: locationInfo ?? null,
      }, { merge: true });
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      initializeUserProgress();
      trackEvent('login', { timestamp: new Date().toISOString() });
    }
  }, [currentUser]);

  return {
    trackEvent,
    updateUserProgress,
    initializeUserProgress,
  };
};
