import { userSignOut } from '../lib/firebase';

function feed(navigateTo) {
  document.body.classList.remove('section_home');
  const sectionFeed = document.createElement('section');
  sectionFeed.classList.add('feed_section');

  const divFeed = `
    <div class="container_feed">
      <header id="header_feed">
        <div class="perfil"></div>
        <div class="logo">
          <img src="../asset/icons/Logo.feed.png" alt=" image">
        </div>
      </header>
      <div class="buscador">
        <input id="input_busqueda" type="search" placeholder= "Buscar">
      </div>
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

  const buttonLogOut = document.createElement('button');
  buttonLogOut.textContent = 'Cerrar Sesión';
  buttonLogOut.addEventListener('click', async () => {
    try {
      await userSignOut();
      navigateTo('/');
    } catch (error) {
      throw new Error(error);
    }
  });

  sectionFeed.innerHTML = divFeed;

  return sectionFeed;
}

export default feed;
