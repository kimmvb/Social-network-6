import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  updateDoc,
  where,
} from 'firebase/firestore';

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

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error);
  }
};

// funcion que ejecuta el login con google, muestra el pop up de gmail
export const singInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', response.user.uid), {
      name: response.user.displayName,
      email: response.user.email,
      origin: 'Google',
    });
    return {
      name: response.user.displayName,
      email: response.user.email,
      origin: 'Google',
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const createAccount = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      origin: 'Tripify',
    });
    return {
      name,
      email,
      origin: 'Tripify',
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const userSignOut = async () => {
  signOut(auth).then(() => {
    // eslint-disable-next-line no-console
    console.log('User signed out');
  }).catch((error) => {
    throw new Error(error);
  });
};

export const resetEmail = async (email) => sendPasswordResetEmail(auth, email);

export const newPost = async (userId, content) => {
  const name = auth.currentUser.displayName;
  const photo = auth.currentUser.photoURL;
  const postRef = collection(db, 'posts');
  await addDoc(postRef, {
    name,
    photo,
    userId,
    content,
    creationDate: new Date(),
  });
};

export const getPosts = async () => {
  const postRef = collection(db, 'posts');
  const q = query(postRef, orderBy('creationDate', 'desc'));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((document) => {
    posts.push({ id: document.id, ...document.data() });
  });
  return posts;
};

export const getPost = async (idPost) => {
  const postRef = collection(db, 'posts');
  const q = query(postRef, where('id', '==', idPost));
  return getDocs(q);
};

export const updatePost = async (idPost, content) => {
  const postRef = collection(db, 'posts', idPost);
  await updateDoc(postRef, {
    content,
  });
};

// 1. Asegúrate de que los usuarios estén autenticados.
// Puedes hacerlo en tu código de autenticación de Firebase.

// 2. Cuando un usuario quiera eliminar un post:
export const deletePost = async (postId, userId) => {
  // Verificar si el usuario está autorizado para eliminar el post según las reglas de seguridad
  const postRef = doc(db, 'posts', postId);
  const postSnapshot = await getDoc(postRef);

  if (postSnapshot.exists() && postSnapshot.data().userId === userId) {
    // El usuario está autorizado para eliminar el post
    await deleteDoc(postRef);
    console.log('El post se ha eliminado correctamente.');
  } else {
    console.log('No tienes permiso para eliminar este post.');
  }
};

// Función para eliminar un post por el userId
/* async function deletePostByUserId(userId) {
  try {
    // Realiza una consulta para encontrar un post con el userId proporcionado
    const querySnapshot =
    await getDocs(query(collection(db, 'posts'), where('userId', '==', userId)));

    // Verifica si se encontró un post
    if (!querySnapshot.empty) {
      // Obtiene el primer post encontrado
      const postDoc = querySnapshot.docs[0];
      const postId = postDoc.id;

      // Elimina el post utilizando el postId
      await deleteDoc(doc(db, 'posts', postId));

      console.log('El post se ha eliminado correctamente.');
    } else {
      console.log('No se encontró ningún post para el usuario.');
    }
  } catch (error) {
    console.error('Error al eliminar el post:', error);
  }
} */
