import { newPost } from '../lib/firebase';

function createPost(navigateTo, getUserId) {
  const sectionPost = document.createElement('section');
  sectionPost.classList.add('post_section');

  const divPost = `
  <div class="post_big_container">
  <nav class="nav_post">
   <i class="fa-solid fa-arrow-left fa-xl" style="color: #35285a;"></i>
  </nav>
   <div class="post_small_container">
    <div class="icon_post"'
     <div class="profile_new_post">
      <img src="../asset/icons/user-circle.png" alt="random image">
    </div>
    <form id="post_form">
     <textarea id="post_content" placeholder="¿Dónde viajaste hoy? 💫" rows="6" cols="29" required></textarea>
     <input type="submit" value="Postear" id="post_button">
    </form>
   </div>
  </div>
  `;

  sectionPost.innerHTML = divPost;

  sectionPost.querySelector('i').addEventListener('click', () => {
    navigateTo('/feed');
  });

  sectionPost.querySelector('#post_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = sectionPost.querySelector('#post_content').value;
    const userId = getUserId();
    console.log(userId);

    if (content.trim() !== '') {
      await newPost(userId, content);
      navigateTo('/feed');
    } else {
      console.error('No content');
    }
  });

  return sectionPost;
}

export default createPost;
