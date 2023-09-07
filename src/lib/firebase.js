import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  sendPasswordResetEmail, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const signInWithFirestore = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    throw error;
  }
};

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

export const signUpAndSaveData = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};


  
export const userSignOut = async() => {
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    
  })
}

export const reseatEmail = async(email) => {
  //const configuracion = { url: "http://localhost:3000/", };
  return sendPasswordResetEmail(auth, email);
}


/*export function reseatEmail(email) {
  if (email) {
    console.log(email);
    const configuracion = { url: "http://localhost:3000/", };
    sendPasswordResetEmail(auth, email, configuracion).then(() => {
      console.log("Email de restablecimiento de contraseña enviado con éxito");
    })
      .catch((error) => {
        console.error(`Error al enviar el correo de restablecimiento de contraseña: ${error}`);
      });
  } else {
    console.error("Favor de ingresar un correo electrónico");
  }
} */
