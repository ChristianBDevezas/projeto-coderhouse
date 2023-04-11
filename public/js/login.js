const userName = document.getElementById("user-name");
const userExit = document.querySelector(".user__exit");
const form = document.querySelector(".login__form");
const inputEmail = document.getElementById('e-mail');
const inputPassword = document.getElementById('password');
let userState;

userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
console.log(localStorage.getItem('Email') == null);

// Confere se nome do usuário está no LocalStorage
if(localStorage.getItem('Email') !== null && userState !== false) {
  userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
  userExit.style.display = 'block';
}
else {
  userName.innerText = `Seja bem-vindo!`;
  userExit.style.display = 'none';
}

// Guarda o nome do usuário no LocalStorage
const getUserName = () => {
  let email = inputEmail.value.split('@')[0];
  let emailCapitalize = email.charAt(0).toUpperCase() + email.slice(1);
  let password = inputPassword.value;
  
  // localStorage.setItem('Email', email);
  localStorage.setItem('Email', emailCapitalize);
  localStorage.setItem('Password', password);
}

// Verifica status de usuário
const checkState = (userState) => {  
  if(userState == true) {
    userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
    userExit.style.display = 'block';
  }
  else {
    userName.style.display = 'none';
    userExit.style.display = 'none';
  }
}

// Verifica se o usuário já está logado
const checkIfLogged = () => {
  if(localStorage.getItem('Email') !== null) {
    return true;
  }
  else {
    return false;
  }
}

const redirectIfLogged = () => {
  if(checkIfLogged()) {  
    // window.location.href="http://localhost/projeto-coderhouse-main/";
    const location = window.location;
    const folderDirectory = 'projeto-coderhouse';
    // const fileDirectory = '/projeto-coderhouse-main/products.html';
    // const destinationPage = `${location.protocol}/${location.hostname}/${folderDirectory}/products.html`;
    // window.location.href = destinationPage;
    window.location.href = 'products.html';
  }
}
redirectIfLogged();
console.log(window.location);
const clearInputFields = () => {
  inputEmail.value = '';
  inputPassword.value = '';
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  redirectIfLogged();

  // Informa que usuário já está logado
  if(checkIfLogged()) {
    //Biblioteca Sweet Alert
    swal({
      title: 'Logoff',
      text: 'Precisa fazer logoff primeiro!',
      icon: 'error',
      // confirmButtonText: 'OK'
      //switched to "button" because "confirmButtonText" has been deprecated
      button: 'OK'
    });

    clearInputFields();
  }
  else {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Confere se o e-mail é válido e se o campo de senha possui o mínimo de 6 caracteres
    if(regExp.test(inputEmail.value.trim())) {    
      if(inputPassword.value.length > 5) {
        userState = true;
        localStorage.setItem('UserState', userState);
        
        getUserName();
        clearInputFields();
        checkState(userState);

        // garante que o nome de usuário e botão "sair" sejam mostrados após o usuário fazer novo login
        userName.style.display = 'block';
        userExit.style.display = 'block';

        redirectIfLogged();
      }    
      else {
        swal({
          title: 'Senha',
          text: 'Campo Senha precisa ter no mínimo 6 caracteres!',
          icon: 'error',
          // confirmButtonText: 'OK'
          //switched to "button" because "confirmButtonText" has been deprecated
          button: 'OK'
        });
      }
    }
    else {
      swal({
        title: 'E-mail',
        text: 'Insira um E-mail válido!',
        icon: 'error',
        // confirmButtonText: 'OK'
        button: 'OK'
      });
    }
  }
});

userExit.addEventListener("click", () => {
  userState = false;
  // localStorage.setItem('UserState', userState);
  checkState(userState);
  localStorage.clear();
});