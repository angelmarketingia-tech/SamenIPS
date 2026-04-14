import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAh06JxdZtUSVZgqupnX4K3YZ3M8070xrY",
  authDomain: "samen-ips-portal-2026.firebaseapp.com",
  projectId: "samen-ips-portal-2026",
  storageBucket: "samen-ips-portal-2026.firebasestorage.app",
  messagingSenderId: "215082415520",
  appId: "1:215082415520:web:c578501b5e3aaaa03760c5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
