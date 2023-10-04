import { userSignOut, getPosts, likePost, getLikes } from '../lib/firebase';

export const feed = async (navigateTo, getUserPhoto) => {
  document.body.classList.add('no-bg');
  const sectionFeed = document.createElement('section');
  sectionFeed.classList.add('feed_section');
  let HTMLPosts = '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const posts = await getPosts();
  const likes = await getLikes();
  posts.forEach((post) => {
    const photoUrl = post.photo || '../asset/icons/user-circle.png';
    const hasLike = likes.find((like) => like.postId === post.id);
    let starFilledClass = 'fa-regular';
    let idLikeFirebase = '';
    if (hasLike !== undefined) {
      starFilledClass = 'fa-solid star-filled';
      idLikeFirebase = hasLike.id;
    }
    HTMLPosts += `
    <div class="div_post">
      <div class="icon_perfil">
        <div class="perfil_post">
          <img src="${photoUrl}" alt="random image">
        </div>
      </div>
      <div class="container_text">
        <h3>${post.name}</h3>
        <h4>${post.creationDate.toDate().toLocaleDateString('es-CL', options)}</h4>
        <p>${post.content}</p>
      </div>
      <i class="fa-star fa-md like_star ${starFilledClass}"
      style="color: #2f3032;cursor:pointer;" data-idpost="${post.id}" data-idfirebase="${idLikeFirebase}"></i>
  </div>`;
  });

  const userPhoto = getUserPhoto();
  const photoUrl = userPhoto || '../asset/icons/user-circle.png';

  const divFeed = `
    <div class="container_feed">
      <header id="header_feed">
        <div class="perfil">
         <img src="${photoUrl}" alt="random image" id="profile_photo">
        </div>
        <div class="logo">
          <img src="../asset/icons/Logo.feed.png" alt=" image">
        </div>
      </header>
    <nav class="nav_container_up">
      <div id="logout">
        <button class="btn_logout"> Cerrar Sesion</button>
      </div>
      <div class="buscador">
          <input id="input_busqueda" type="search" placeholder= "Buscar">
      </div>
    </nav>
      <main id="main_feed">${HTMLPosts}</main>
    </div>

    <i class="fa-solid fa-circle-plus fa-4x" id="add_post" style="color: #f1b33c;"></i>

    <footer>
    </footer>`;

  sectionFeed.innerHTML = divFeed;

  sectionFeed.querySelector('#profile_photo').addEventListener('click', () => {
    navigateTo('/profile');
  });

  sectionFeed.getElementsByClassName('btn_logout')[0].addEventListener('click', async () => {
    try {
      await userSignOut();
      navigateTo('/');
    } catch (error) {
      // throw new Error(error);
      alert('No se ha podido cerrar sesión');
    }
  });

  sectionFeed.querySelector('i.fa-circle-plus').addEventListener('click', () => {
    navigateTo('/create_post');
  });

  sectionFeed.querySelectorAll('i.like_star').forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('star-filled');
      element.classList.toggle('fa-regular');
      element.classList.toggle('fa-solid');
      likePost(
        element.getAttribute('data-idpost'),
        sessionStorage.getItem('userId'),
        element.getAttribute('data-idfirebase'),
      );
    });
  });

  return sectionFeed;
};
