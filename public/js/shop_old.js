const DIRECTORY_PATH = `${window.location.protocol}//${window.location.hostname}/projeto-coderhouse-main-2023-04-12_3/public/img/`;
const DIRECTORY_IMAGE_PATH = `public/img/`;


const SHOP_RESUME_TAG = document.querySelector("section.cart .cart__resume");
const SHOP_CART_ITEMS = getShopCartItems();


for(let PRODUCT_ID in SHOP_CART_ITEMS) {
    const PRODUCT = PRODUCT_LIST_ORDERED[PRODUCT_ID];
    const PRODUCT_QUANTITY = SHOP_CART_ITEMS[PRODUCT_ID];

    console.log("PRODUCT",PRODUCT);
    const ARTICLE_PRODUCT_TAG = document.createElement("article");

    ARTICLE_PRODUCT_TAG.classList.add("cart__description");
    ARTICLE_PRODUCT_TAG.innerHTML = `
        <figure class="cart__description__image">
            <img src="${DIRECTORY_IMAGE_PATH}${PRODUCT.image}" alt="${PRODUCT.type}">
        </figure>`;
    
    const DIV_PRODUCT_DETAILS_TAG = document.createElement("div");
    DIV_PRODUCT_DETAILS_TAG.classList.add("cart__description__text");
    DIV_PRODUCT_DETAILS_TAG.innerHTML = `
        <h2 class="cart__subtitle">${PRODUCT.name}</h2>
        <h2 class="cart__price">Preço: 
            <span class="product__price__item">${PRODUCT.priceText}</span>
        </h2>
        <h2 class="cart__delivery">Entrega:
            <span class="cart__delivery__days">5 a 7 dias úteis</span>
        </h2>
        <h2 class="cart__delivery">Valor do frete:
            <span class="cart__delivery__value">Grátis</span>
        </h2>`;

        ARTICLE_PRODUCT_TAG.appendChild(DIV_PRODUCT_DETAILS_TAG); 
    
    const PRODUCT_TOTAL_PRICE_TAG = document.createElement("h2");
    PRODUCT_TOTAL_PRICE_TAG.classList.add("cart__price");
    PRODUCT_TOTAL_PRICE_TAG.innerHTML = `Valor total: <span class="cart__price_total">${(PRODUCT.price * PRODUCT_QUANTITY).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>`;

    DIV_PRODUCT_DETAILS_TAG.appendChild(PRODUCT_TOTAL_PRICE_TAG);
    

    SHOP_RESUME_TAG.insertAdjacentElement("beforebegin", ARTICLE_PRODUCT_TAG);
}





// const itemValue = document.querySelector(".product__price__item");
const itemValue = document.querySelector(".product__price__item").innerText;
const itemQuantity = document.querySelector(".cart__buttons__quantity");
const totalValue = document.querySelector(".cart__price_total");
const subtractBtn = document.querySelector(".cart__buttons__subtract");
const addBtn = document.querySelector(".cart__buttons__add");
const removeBtn = document.querySelector(".cart__buttons__remove");
const container = document.querySelector(".cart__description");

let counter = 1;
let removedContainer = false;
let change = Number(itemValue.replace(',', '.'));

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

// {1:10, 2:2, }
// 1,2



let buttonAddToCard = document.querySelector("a[cart-button]");
if(buttonAddToCard instanceof HTMLElement) {
    buttonAddToCard.addEventListener("click", (event) => {
        const MY_URL = new URL(window.location.href);

        const ID = MY_URL.searchParams.get("id");

        let currentCartItems = localStorage.getItem(FLAG_CART_ITEMS);
        currentCartItems = typeof currentCartItems !== 'string' ? "" : currentCartItems;


        if(currentCartItems.length == 0) {
            localStorage.setItem(FLAG_CART_ITEMS, ID);
        } else {
            localStorage.setItem(FLAG_CART_ITEMS, currentCartItems + "," + ID);
        }

        console.log(`localStorage.getItem(FLAG_CART_ITEMS)`, localStorage.getItem(FLAG_CART_ITEMS));
        
    });
}