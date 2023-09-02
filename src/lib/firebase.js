// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACG5rW_-P4Y_Ut762pMUH4iKeMkxNAf2Q',
  authDomain: 'red-social-5d2b2.firebaseapp.com',
  projectId: 'red-social-5d2b2',
  storageBucket: 'red-social-5d2b2.appspot.com',
  messagingSenderId: '1053149612519',
  appId: '1:1053149612519:web:2ac9aa3caad8b07a4b5542',
  measurementId: 'G-K3Q4KXLZYX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
