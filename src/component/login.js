import { userSignOut } from "../lib/firebase";

function login (navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonLogOut = document.createElement('button');

    buttonLogOut.textContent = 'Cerrar Sesión';
    buttonLogOut.addEventListener('click', () => {
        userSignOut()
         .then((user) => {
            navigateTo('/', user);
          })
          .catch((error) => {
            console.error('Error al cerrar sesión', error);
          });
    });

    title.textContent = 'Feed';
    section.append(title, buttonLogOut) 
    
    return section;
}

export default login;