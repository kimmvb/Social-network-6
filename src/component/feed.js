import { userSignOut, getPosts } from '../lib/firebase';

export const feed = async (navigateTo) => {
  document.body.classList.add('no-bg');
  const sectionFeed = document.createElement('section');
  sectionFeed.classList.add('feed_section');
  let HTMLPosts = '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const posts = await getPosts();
  posts.forEach((post) => {
    HTMLPosts += `
    <div class="div_post">
      <div class="icon_perfil"'
        <div class="perfil_post">
          <img src="../asset/icons/user-circle.png" alt="random image">
        </div>
      <div class="container_text">
        <h3>Sr. Fox</h3>
        <h4>${post.creationDate.toDate().toLocaleDateString('es-CL', options)}</h4>
        <p>${post.content}</p>
      </div>
      <a href="/feed/update_post/${post.id}">Editar</a>
    </div>`;
  });

  const divFeed = `
    <div class="container_feed">
      <header id="header_feed">
        <div class="perfil">
          <label class="custom-file-upload">
            <input type="file" id="myfile">
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
      <main id="main_feed">${HTMLPosts}</main>
    </div>
    <i class="fa-solid fa-circle-plus fa-4x" id="add-post" style="color: #f1b33c;"></i>
    <footer>
    </footer>`;

  sectionFeed.innerHTML = divFeed;
  sectionFeed.getElementsByClassName('btn_logout')[0].addEventListener('click', () => {
    try {
      userSignOut();
      navigateTo('/');
    } catch (error) {
      throw new Error(error);
    }
  });

  sectionFeed.querySelector('i').addEventListener('click', () => {
    navigateTo('/create_post');
  });

  return sectionFeed;
};
