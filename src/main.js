import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { home } from './component/home.js';
import error from './component/error.js';
import newAccount from './component/newaccount.js';
import { feed } from './component/feed.js';
import forgetpassword from './component/forgetpassword.js';
import createPost from './component/createpost.js';
import { profile } from './component/profile.js';

let userId = '';
function getUserId() {
  return userId;
}
let userPhoto = '';
function getUserPhoto() {
  return userPhoto;
}

let userName = '';
function getUserName() {
  return userName;
}

const routes = [
  { path: '/', component: home },
  { path: '/error', component: error },
  { path: '/feed', component: feed },
  { path: '/new_account', component: newAccount },
  { path: '/forget_password', component: forgetpassword },
  { path: '/create_post', component: createPost },
  { path: '/profile', component: profile },
];

const defaultRoute = '/';
const root = document.getElementById('root');

async function navigateTo(hash) {
  console.log('Navegando a la ruta:', hash);
  const route = routes.find((routeFound) => routeFound.path === hash);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(await route.component(navigateTo, getUserPhoto, getUserId, getUserName));
  } else {
    navigateTo('/error');
  }
}

onAuthStateChanged(getAuth(), async (user) => {
  if (user) {
    console.log('Usuario autenticado');
    const id = user.uid;
    userId = id;
    const photo = user.photoURL;
    userPhoto = photo;
    const name = user.displayName;
    userName = name;
    const allowedRoutes = ['/feed', '/profile', '/create_post'];
    const currentRoute = window.location.pathname;

    if (allowedRoutes.includes(currentRoute)) { /* empty */ } else if (currentRoute === '/error') {
      navigateTo('/error');
    } else {
      navigateTo('/feed');
    }
  } else {
    console.log('Usuario no autenticado, redirigiendo a inicio de sesión');
    const currentRoute = window.location.pathname;
    const allowedRoutes = ['/', '/new_account', '/forget_password'];

    if (allowedRoutes.includes(currentRoute)) { /* empty */ } else if (currentRoute === '/error') {
      navigateTo('/error');
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      navigateTo('/');
    }
  }
});

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
