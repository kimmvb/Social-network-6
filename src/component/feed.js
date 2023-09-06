import styles from "./../css/feed.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import { userSession } from "./../lib/index";

function feed(navigateTo) {
  const sectionFeed = document.createElement("section");
  sectionFeed.className = styles.contenedor_feed;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  logo.src = iconLogo;

  console.log(userSession);



  sectionFeed.append(logo);

  return sectionFeed;

}

export default feed;
