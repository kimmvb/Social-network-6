import styles from "./../css/feed.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import { userSession } from "./../lib/index";

function feed() {
  const sectionFeed = document.createElement("section");
  sectionFeed.className = styles.contenedor_feed;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  logo.src = iconLogo;

  console.log(userSession);

  const p = document.createElement('p');
  p.innerHTML = 'Bienvenido ' + userSession.name;

  sectionFeed.append(logo, p);

  return sectionFeed;

}

export default feed;
