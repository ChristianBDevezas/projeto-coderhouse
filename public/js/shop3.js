//******************************************LocalStorage e JSON******************************************//
const wine1 = {
    name: "Barone Montalto",
    price: "77,80",
    image: "public/img/bottles/1-barone-montalto.png"
}

localStorage.setItem('wine1', JSON.stringify(wine1));
const wine1String = localStorage.getItem('wine1');
const wine1Obj = JSON.parse(wine1String);
console.log(wine1Obj);

console.log(wine1Obj.name);
console.log(wine1Obj.price);

const itemImage = document.querySelector(".cart__description__image img");
const itemTitle = document.querySelector(".cart__subtitle");
const itemValue = document.querySelector(".product__price__item");
// let itemValue = document.querySelector(".product__price__item").innerText;
const itemQuantity = document.querySelector(".cart__buttons__quantity");
const totalValue = document.querySelector(".cart__price_total");
const subtractBtn = document.querySelector(".cart__buttons__subtract");
const addBtn = document.querySelector(".cart__buttons__add");
const removeBtn = document.querySelector(".cart__buttons__remove");
const container = document.querySelector(".cart__description");

itemTitle.innerText = wine1Obj.name;
itemValue.innerText = wine1Obj.price;
itemImage.src = wine1Obj.image;

//***************************************Cálculo do valor total***************************************//
let counter = 1;
let removedContainer = false;
// let change = Number(itemValue.replace(',', '.'));
let change = Number(itemValue.innerText.replace(',', '.'));

const calculate = () => {
    itemQuantity.textContent = counter;
    // let total = itemValue.textContent * itemQuantity.textContent;
    // total = Number(total);
    // totalValue.textContent = total.toFixed(2);

    // let mult = change * itemQuantity.textContent;
    let mult = change * counter;
    let totalField = mult.toFixed(2).toString().replace('.', ',');
    totalValue.textContent = totalField;
}

subtractBtn.addEventListener("click", () => {
    if(counter < 1) counter = 0;
    if(counter > 0) counter --;    
    calculate();
});

addBtn.addEventListener("click", () => {
    if(removedContainer == false) counter ++;
    if(removedContainer == true) counter = 0;
    calculate();
});

removeBtn.addEventListener("click", () => {
    container.remove();
    removedContainer = true;
    counter = 0;
    itemQuantity.textContent = 0;
});