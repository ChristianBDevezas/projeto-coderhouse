const userName = document.getElementById("user-name");
const userExit = document.querySelector(".user__exit");
let userSate;

userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
console.log(localStorage.getItem('Email') == null);

// Verifica se nome do usuário está no LocalStorage
if(localStorage.getItem('Email') !== null && userSate !== false) {
  userName.innerText = `Olá, ${localStorage.getItem('Email')}!`;
  userExit.style.display = 'block';
}
else {
  userName.innerText = `Seja bem-vindo!`;
  userExit.style.display = 'none';
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

userExit.addEventListener("click", () => {
  userSate = false;
  localStorage.setItem('UserState', userSate);
  checkState(userSate);
  localStorage.clear();
});