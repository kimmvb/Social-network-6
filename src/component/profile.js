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
          <div class="drop_down">
            <i class="fa-solid fa-ellipsis-vertical fa-2xl" style="color: #35285a;" id="drop_btn"></i>
            <div id="myDropdown" class="drop_down_content">
              <a href="" class ="delete_post" id="deleteButton-${index}">Borrar</a>
              <a href="" class="edit_post">Editar</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container_text">
        <h3>${post.name}</h3>
        <h4>${post.creationDate.toDate().toLocaleDateString('es-CL', options)}</h4>
        <p>${post.content}</p>
      </div>
    </div>`;

    HTMLPosts += postElement.innerHTML;
  });

  const userName = getUserName();
  const userPhoto = getUserPhoto();
  const photoUrl = userPhoto || '../asset/icons/user-circle.png';

  const divProfile = `
    <div class="container_profile">
      <nav class="nav_profile">
       <i class="fa-solid fa-arrow-left fa-xl" style="color: #35285a; cursor: pointer;" id="go_back"></i>
      </nav>
      <div class="edit_profile">
       <div>
         <img src="${photoUrl}" alt="random image" id="profile_photo_change" style="border-radius: 50px; width: 100px;">
       </div>
        <p id="current_user_name" >${userName}</p>
      </div>
  </div>


  </div>

    </div>
  <main id="main_feed">${HTMLPosts}</main>
</div>
  <i class="fa-solid fa-circle-plus fa-4x" id="add_post" style="color: #f1b33c;"></i>
<footer></footer>`;

  sectionProfile.innerHTML = divProfile;

  sectionProfile.querySelector('#go_back').addEventListener('click', () => {
    navigateTo('/feed');
  });

  sectionProfile.querySelector('#add_post').addEventListener('click', () => {
    navigateTo('/create_post');
  });

  sectionProfile.querySelector('#main_feed').addEventListener('click', async (event) => {
    const target = event.target;
    const closestPost = target.closest('.div_post');

    // Comprueba si el clic se hizo dentro de un elemento .div_post
    if (closestPost) {
      const dropdown = closestPost.querySelector('.drop_down_content');

      if (target.id === 'drop_btn') {
        if (dropdown) {
          dropdown.classList.toggle('show');
        }
      } else {
        dropdown.classList.remove('show');
      }
    }
  });

  sectionProfile.querySelector('#main_feed').addEventListener('click', async (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('delete_post')) {
      const index = target.id.split('-')[1];
      // eslint-disable-next-line no-undef
      swal({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este post',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            deletePost(currentUserPosts[index].id, currentUserPosts[index].userId)
              .then(() => {
                console.log(`Éxito: El post ${currentUserPosts[index].id} se ha eliminado correctamente.`);
                // eslint-disable-next-line no-undef
                swal('!Poof! !Tu post fue eliminado', {
                  icon: 'success',
                })
                  .then(() => {
                    window.location.reload();
                  });
              })
              .catch((error) => {
                console.error(`Error al eliminar el post ${currentUserPosts[index].id}:`, error);
              });
          } else {
            // eslint-disable-next-line no-undef
            swal('!Tu post está guardado!');
          }
        });
    }
  });

  return sectionProfile;
};
