import { reseatEmail } from "../lib/firebase";

function forgetPass(navigateTo){
    const section = document.createElement('section');
    const title = document.createElement('h1');
    const changePass = document.createElement('p');
    const formEmail = document.createElement('form');
    
    const email = document.createElement('input');
    email.setAttribute('id','email');

    const buttonSendEmail = document.createElement('button');
    const backHome = document.createElement('button');
     
    title.textContent = 'Cambia tu contraseña';
    changePass.textContent = 'Escribe tu correo y te haremos llegar un email para que puedas cambiar tu cuenta';
    
    email.setAttribute('placeholder', 'Tu email...')
    backHome.textContent = 'Volver a inicio';
    backHome.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("/");
      });

    buttonSendEmail.textContent = "Enviar";
    formEmail.addEventListener('submit', async(e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const finalEmail = emailInput.value;
        reseatEmail(finalEmail)
        .then(() => {
            console.log('Email enviado exitosamente a:', finalEmail)
        })
        .catch((error) => {
            console.error('Error al enviar el correo de restablecimiento de contraseña:',error);
        })
    })

    formEmail.append(email, buttonSendEmail);
    section.append(title, changePass, formEmail, backHome); 
    
    return section;
}

export default forgetPass