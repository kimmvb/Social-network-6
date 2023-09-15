import { userSignOut } from '../lib/firebase';

function feed(navigateTo) {
  document.body.classList.add('no-bg');
  const sectionFeed = document.createElement('section');
  sectionFeed.classList.add('feed_section');

  const divFeed = `
    <div class="container_feed">
      <header id="header_feed">
        <div class="perfil">
          <label class="custom-file-upload">
            <input type="file" 
                id="myfile">
          </label>
        </div>
        <div class="logo">
          <img src="../asset/icons/Logo.feed.png" alt=" image">
        </div>
      </header>
    <nav class="nav_container_up">
        <div class="logout">
          <button class="btn_logout"> Cerrar Sesion</button>
        </div>
      <div class="buscador">
          <input id="input_busqueda" type="search" placeholder= "Buscar">
      </div>
    </nav>
      <main id="main_feed">
        <div class="div_post">
          <div class="icon_perfil"'
            <div class="perfil_post">
              <img src="../asset/icons/user-circle.png" alt="random image">
            </div>
          <div class="container_text">
            <h3>Sr. Fox</h3> 
            <h4>12 January 2019</h4>
            <p>The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).</p>
          </div>
        </div>
        <div class="div_post">
          <div class="icon_perfil"'
            <div class="perfil_post">
              <img src="../asset/icons/user-circle.png" alt="random image">
            </div>
          <div class="container_text">
            <h3>Sr. Fox</h3> 
            <h4>12 January 2019</h4>
            <p>The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).</p>
          </div>
        </div>
      </main>
    </div>
    <footer>
      
    </footer>`;

  sectionFeed.innerHTML = divFeed;
  /* elementbyclass responde un arreglo por eso pongo el [0] */

  sectionFeed.getElementsByClassName('btn_logout')[0].addEventListener('click', () => {
    try {
      userSignOut();
      navigateTo('/');
    } catch (error) {
      throw new Error(error);
    }
  });

  return sectionFeed;
}

export default feed;
