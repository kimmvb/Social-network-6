function error(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('error_container');

  const logo = document.createElement('img');
  logo.classList.add('img_logo');
  logo.src = '../asset/icons/Logo.tripify.svg';

  const title = document.createElement('h2');
  title.classList.add('error_title');

  const backHome = document.createElement('button');
  backHome.classList.add('error_button');

  title.textContent = 'Error 404: página no encontrada';

  backHome.textContent = 'Volver a inicio';
  backHome.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  section.append(logo, title, backHome);
  return section;
}

export default error;
