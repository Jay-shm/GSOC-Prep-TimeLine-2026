import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCOGgaD358yrIEO44r5JpuI--NcLd0TmZQ",
  authDomain: "gsoc-prep-tracker.firebaseapp.com",
  projectId: "gsoc-prep-tracker",
  storageBucket: "gsoc-prep-tracker.firebasestorage.app",
  messagingSenderId: "289794175369",
  appId: "1:289794175369:web:06288c60b557a2d150f158",
  measurementId: "G-JPVB7XKBHY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;