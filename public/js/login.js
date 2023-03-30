const userName = document.getElementById("user-name");
const userExit = document.querySelector(".user__exit");
const form = document.querySelector(".login__form");
const inputEmail = document.getElementById('e-mail');
const inputPassword = document.getElementById('password');
let userSate;

// Verifica se nome do usuário está no LocalStorage
userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
console.log(localStorage.getItem('Email') == null);

if(localStorage.getItem('Email') !== null && userSate !== false) {
  userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
  userExit.style.display = 'block';
}
else {
  userName.innerText = `Olá, usuário!`;
  userExit.style.display = 'none';
}

// Guarda o nome do suário no LocalStorage
const getUserName = () => {
  let email = inputEmail.value.split('@')[0];
  let password = inputPassword.value;

  localStorage.setItem('Email', email);
  localStorage.setItem('Password', password);
}

// Verifica status de ussuário
const checkState = (userSate) => {
  if(userSate == true) {
    userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
    userExit.style.display = 'block';
  }
  else {
    userName.style.display = 'none';
    userExit.style.display = 'none';
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Confere se o e-mail é válido e se o campo de senha possui o mínimo de 6 caracteres
  if(regExp.test(inputEmail.value.trim())) {    
    if(inputPassword.value.length > 5) {
      getUserName();
      inputEmail.value = '';
      inputPassword.value = '';
  
      userSate = true;
      localStorage.setItem('UserState', userSate);
      checkState(userSate);
    }    
    else {
      // alert("Campo Senha precisa ter no mínimo 6 caracteres!");

      //Biblioteca Sweet Alert
      swal({
        title: 'Senha',
        text: 'Campo Senha precisa ter no mínimo 6 caracteres!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  else {
    // alert("Insira um E-mail válido!");

    //Biblioteca Sweet Alert
    swal({
      title: 'E-mail',
      text: 'Insira um E-mail válido!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
});

userExit.addEventListener("click", () => {
  userSate = false;
  localStorage.setItem('UserState', userSate);
  checkState(userSate);
  localStorage.clear();
});