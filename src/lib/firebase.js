import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// configuracion incial de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyACG5rW_-P4Y_Ut762pMUH4iKeMkxNAf2Q',
  authDomain: 'red-social-5d2b2.firebaseapp.com',
  projectId: 'red-social-5d2b2',
  storageBucket: 'red-social-5d2b2.appspot.com',
  messagingSenderId: '1053149612519',
  appId: '1:1053149612519:web:2ac9aa3caad8b07a4b5542',
  measurementId: 'G-K3Q4KXLZYX',
};

// inicio firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);

// funcion que ejecuta el login con google, muestra el pop up de gmail
export const userSignin = async() => {
  try {
    const response = await signInWithPopup(auth, provider);
    await setDoc(doc(db, "users", response.user.email), {
      name: response.user.displayName,
      email: response.user.email,
      origin: 'Google',
      password: ''
    });
    return {
      name: response.user.displayName,
      email: response.user.email,
      origin: 'Google',
      password: ''
    };;
  } catch (error) {
    throw new Error(error);
  }
}

export const userSaveData = async(name, email, password) => {
  try {
    const user = {
      name: name,
      email: email,
      origin: 'Tripify',
      password: password
    };
    await setDoc(doc(db, "users", email), user);
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
  
export const userSignOut = async() => {
  signOut(auth).then(() => {
    
  }).catch((error) => {
    
  })
}