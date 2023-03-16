window.addEventListener("load", () => {
  inputEmail.addEventListener('focus', () => console.log("funcionando campo1"));
  inputPassword.addEventListener('focus', () => console.log("funcionando campo2"));
});

const userName = document.getElementById("user-name");
const userExit = document.querySelector(".user__exit");
const form = document.querySelector(".login__form");
const inputEmail = document.getElementById('e-mail');
const inputPassword = document.getElementById('password');
let userSate;

userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
console.log(localStorage.getItem('Email') == null);

if(localStorage.getItem('Email') !== null && userSate !== false) {
  userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
}
else {
  userName.innerText = `Olá, usuário!`;
}

const getUserName = () => {
  let email = inputEmail.value.split('@')[0];
  let password = inputPassword.value;

  localStorage.setItem('Email', email);
  localStorage.setItem('Password', password);
}

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
      alert("Campo Senha precisa ter no mínimo 6 caracteres!");
    }
  }
  else {
    alert("Insira um E-mail válido!");
  }
});

userExit.addEventListener("click", () => {
  userSate = false;
  localStorage.setItem('UserState', userSate);
  checkState(userSate);
});