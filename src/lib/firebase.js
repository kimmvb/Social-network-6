import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut , sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { async } from 'regenerator-runtime';

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
    const usersRef = collection(db, 'users');
    const queryRef = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(queryRef);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      if (userData.password === password) {
        // Las credenciales son válidas, usuario autenticado
        return userData;
      } else {
        // Las credenciales son inválidas
        throw new Error('Credenciales inválidas');
      }
    } else {
      // No se encontró ningún usuario con el correo electrónico dado
      throw new Error('Usuario no encontrado');
    }
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
    await userSaveData(name, email, password);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

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
    console.log('User signed out');
  }).catch((error) => {
    
  })
}

export const reseatEmail = async(email) => {
  return sendPasswordResetEmail(auth, email);
}