import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
//import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
//import { async } from 'regenerator-runtime';
//import { async } from 'regenerator-runtime';
//import { async } from 'regenerator-runtime';
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export const userSignin = async() => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
//export const userSignInGoogle = async() => signInWithPopup(auth, provider);

//export const userSignInGoogle = async() => signInWithPopup(auth, provider);

/*export const userSignin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
}*/

//export const signOutUser = async() => auth.signOut();
/*export const userSignin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
}*/

//export const signOutUser = async() => auth.signOut();
  
export const userSignOut = async() => {
    signOut(auth).then(() => {
      
      
    }).catch((error) => {
      
      
    })
}


/*export const userSignOut = async () => {
/*export const userSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}*/


/*onAuthStateChanged(auth, (user, navigateTo) => {
    if (user) {
/*onAuthStateChanged(auth, (user, navigateTo) => {
    if (user) {
        navigateTo('/login')
    } else {
        navigateTo('/')
    }
})
*/

