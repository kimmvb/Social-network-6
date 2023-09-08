import styles from "./../css/feed.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import { userSession } from "./../lib/index";
import { userSignOut } from "../lib/firebase";

function feed(navigateTo) {
  const sectionFeed = document.createElement("section");
  sectionFeed.className = styles.contenedor_feed;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  logo.src = iconLogo;

  const buttonLogOut = document.createElement('button');
  buttonLogOut.textContent = 'Cerrar Sesión';
    buttonLogOut.addEventListener('click', async () => {
      try {
        await userSignOut();
        navigateTo('/');
      } catch (error) {
        console.log(error);
      }
    });

  console.log(userSession);

  sectionFeed.append(logo, buttonLogOut);

  return sectionFeed;

}

export default feed;
