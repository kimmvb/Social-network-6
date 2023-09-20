import { getPosts } from '../lib/firebase';

// eslint-disable-next-line no-unused-vars
export const profile = async (navigateTo, getUserPhoto) => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile_section');
  let HTMLPosts = '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const posts = await getPosts();
  posts.forEach((post) => {
    const photoUrl = post.photo || '../asset/icons/user-circle.png';
    HTMLPosts += `
    <div class="div_post">
      <div class="icon_perfil"'
        <div class="perfil_post">
          <img src="${photoUrl}" alt="random image">
        </div>
      <div class="container_text">
        <h3>${post.name}</h3>
        <h4>${post.creationDate.toDate().toLocaleDateString('es-CL', options)}</h4>
        <p>${post.content}</p>
      </div>
      <a href="/feed/update_post/${post.id}">Editar</a>
    </div>`;
  });
  const userPhoto = getUserPhoto();
  const photoUrl = userPhoto || '../asset/icons/user-circle.png';

  const divProfile = `
    <div class="container_profile">
      <nav class="nav_profile">
       <i class="fa-solid fa-arrow-left fa-xl" style="color: #35285a; cursor: pointer;"></i>
      </nav>
      <div class="edit_profile">
       <div>
         <img src="${photoUrl}" alt="random image" id="profile_photo">
       </div>
        <p>Current User</p>
      </div>
      <main id="main_feed">${HTMLPosts}</main>
    </div>
      <i class="fa-solid fa-circle-plus fa-4x" id="add_post" style="color: #f1b33c;"></i>
    <footer></footer>`;

  sectionProfile.innerHTML = divProfile;

  sectionProfile.querySelectorAll('i')[0].addEventListener('click', () => {
    navigateTo('/feed');
  });

  sectionProfile.querySelectorAll('i')[1].addEventListener('click', () => {
    navigateTo('/create_post');
  });

  return sectionProfile;
};
