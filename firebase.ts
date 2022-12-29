// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from '@env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'todo-expo-4836e.firebaseapp.com',
  projectId: 'todo-expo-4836e',
  storageBucket: 'todo-expo-4836e.appspot.com',
  messagingSenderId: '518483268861',
  appId: FIREBASE_APP_ID,
  measurementId: 'G-4TPMD323GR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
