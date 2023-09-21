import { getPosts, deletePost } from '../lib/firebase';

export const profile = async (navigateTo, getUserPhoto, getUserId, getUserName) => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile_section');
  let HTMLPosts = '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const userId = getUserId();
  const posts = await getPosts();
  const currentUserPosts = posts.filter((post) => post.userId === userId);

  currentUserPosts.forEach((post, index) => {
    const photoUrl = post.photo || '../asset/icons/user-circle.png';
    const postElement = document.createElement('div');
    postElement.innerHTML = `
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
      <button class="eliminate_post" id="deleteButton-${index}">Borrar</button>
      <a href="/feed/update_post/${post.id}">Editar</a>
    </div>`;

    HTMLPosts += postElement.innerHTML;
    console.log(post.userId);
    console.log(post.id);
  });
  const userName = getUserName();
  const userPhoto = getUserPhoto();
  const photoUrl = userPhoto || '../asset/icons/user-circle.png';

  const divProfile = `
    <div class="container_profile">
      <nav class="nav_profile">
       <i class="fa-solid fa-arrow-left fa-xl" style="color: #35285a; cursor: pointer;"></i>
      </nav>
      <div class="edit_profile">
       <div>
         <img src="${photoUrl}" alt="random image" id="profile_photo_change" style="border-radius: 50px; width: 100px;">
       </div>
        <p id="current_user_name" >${userName}</p>
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

  console.log(sectionProfile.querySelector('#main_feed'));
  sectionProfile.querySelector('#main_feed').addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('eliminate_post')) {
      const index = target.id.split('-')[1];
      await deletePost(currentUserPosts[index].id, currentUserPosts[index].userId)
        .then(() => {
          console.log(`Éxito: El post ${currentUserPosts[index].id} se ha eliminado correctamente.`);
          window.location.reload();
        })
        .catch((error) => {
          console.error(`Error al eliminar el post ${currentUserPosts[index].id}:`, error);
        });
    }
  });

  return sectionProfile;
};
