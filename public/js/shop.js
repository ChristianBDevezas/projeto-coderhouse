const SHOP_RESUME_TAG = document.querySelector("section.cart .cart__resume");
const PRODUCT_LIST_TAG = document.querySelector("section.cart .cart_product_list");

// recebe o valor total de compras atualizado para controlar a mensagem final
// let totalShopAmount = `${getTotalValueFromCart(true)}`;
let totalShopAmount;
console.log(totalShopAmount);

// insere os botões "Voltar para Produto" e "Finalizar a compra" dinamicamente na página
if(SHOP_RESUME_TAG instanceof HTMLElement) {
    const BUTTON_BACK = document.createElement("a");
    SHOP_RESUME_TAG.insertAdjacentElement("beforeend", BUTTON_BACK);
    BUTTON_BACK.setAttribute("href", "product-selected.html");
    // BUTTON_BACK.classList.add("cart__resume__back");
    BUTTON_BACK.innerHTML = '<button class="cart__resume__back">Voltar para o produto</button>';

    const BUTTON_END_SHOP = document.createElement("a");
    SHOP_RESUME_TAG.insertAdjacentElement("beforeend", BUTTON_END_SHOP);
    // BUTTON_END_SHOP.setAttribute("href", "index.html");
    BUTTON_END_SHOP.classList.add("cart__resume__final");
    BUTTON_END_SHOP.innerHTML = '<button class="cart__resume__final">Finalizar a compra</button>';

    const CART_MODAL = document.querySelector(".cart__modal");

    BUTTON_BACK.addEventListener("click", (event) => {
        event.preventDefault();

        const PRODUCT_SELECTED_ID = getLastProductSelectedFromStorage();
        if(PRODUCT_SELECTED_ID > 0) {
            window.location = `product-selected.html?id=${PRODUCT_SELECTED_ID}`;
        }
        else {
            window.location = `products.html`;
        }
    });
    
    BUTTON_END_SHOP.addEventListener("click", () => {
        // compara o total de itens selecionados para mostrar a mensagem final
        let cartItems = getShopCartItems();        
        let totalItems = 0;

        for(let id in cartItems) {
            let product = cartItems[id]; // 1: 10
            
            totalItems += product;

            if(totalItems > 0) break;
        }
        
        if(totalItems > 0) {
            CART_MODAL.classList.add("show-modal");

            setTimeout(() => {
                CART_MODAL.classList.remove("show-modal");
            }, 3500);

            clearCartItems();
            
            setTimeout(() => {
                BUTTON_END_SHOP.setAttribute("href", "index.html");
                window.location = `index.html`;
            }, 3700);
        }
        else {
            swal({
                title: 'Quantidade',
                text: 'Precisa adicionar ao menos 1 unidade!',
                icon: 'warning',
                button: 'OK'
              });
        }
    });
}

const CART_TOTAL_VALUE_TAG = document.createElement("div");

// recebe os dados do arquivo JSON
if(SHOP_RESUME_TAG instanceof HTMLElement) {
    getDataOrderedFromJson()
        .then(productList => {
            CART_TOTAL_VALUE_TAG.innerHTML = getTotalValueFromCart(true, productList);
            SHOP_RESUME_TAG.insertAdjacentElement('afterbegin', CART_TOTAL_VALUE_TAG);
        });
}

shopMakeListFromCart(PRODUCT_LIST_TAG, CART_TOTAL_VALUE_TAG);

// mostra as características do produto selecionado
function shopMakeListFromCart(container, cartTotalValueTag) {
    const SHOP_CART_ITEMS = getShopCartItems();
    
    getDataOrderedFromJson()
        .then(productList => {
            cartTotalValueTag.innerHTML = ``;
            
            if(container instanceof HTMLElement) {
                for(let PRODUCT_ID in SHOP_CART_ITEMS) {
                    const PRODUCT = productList[PRODUCT_ID];
                    const PRODUCT_QUANTITY = SHOP_CART_ITEMS[PRODUCT_ID];
            
                    // if(PRODUCT_QUANTITY <= 0) continue;
                    if(PRODUCT_QUANTITY < 1) continue;    
            
                    console.log("PRODUCT", PRODUCT);
                    const ARTICLE_PRODUCT_TAG = document.createElement("article");
                    container.insertAdjacentElement("beforebegin", ARTICLE_PRODUCT_TAG);
            
                    ARTICLE_PRODUCT_TAG.classList.add("cart__description");
                    ARTICLE_PRODUCT_TAG.innerHTML = `
                        <figure class="cart__description__image">
                            <img src="${getImageDirectoryPath(PRODUCT.image)}" alt="${PRODUCT.type}">
                        </figure>`;
                    
                    const DIV_PRODUCT_DETAILS_TAG = document.createElement("div");
                    ARTICLE_PRODUCT_TAG.appendChild(DIV_PRODUCT_DETAILS_TAG); 
            
                    DIV_PRODUCT_DETAILS_TAG.classList.add("cart__description__text");
                    DIV_PRODUCT_DETAILS_TAG.innerHTML = `
                        <h2 class="cart__subtitle">${PRODUCT.name}</h2>

                        <h2 class="cart__price">Preço: 
                            <span class="product__price__item">${PRODUCT.priceText}</span>
                        </h2>

                        <h2 class="cart__delivery">Entrega:
                            <span class="cart__delivery__days">3 a 5 dias úteis</span>
                        </h2>

                        <h2 class="cart__delivery">Valor do frete:
                            <span class="cart__delivery__value">Grátis</span>
                        </h2>`;                
                    
                    const PRODUCT_TOTAL_PRICE_TAG = document.createElement("h2");
                    DIV_PRODUCT_DETAILS_TAG.appendChild(PRODUCT_TOTAL_PRICE_TAG);
            
                    PRODUCT_TOTAL_PRICE_TAG.classList.add("cart__price");
                    // PRODUCT_TOTAL_PRICE_TAG.innerHTML = `Valor unitário: <span class="cart__price_total">${(PRODUCT.price * PRODUCT_QUANTITY).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>`;
                    
                    updateProductTotalPriceTag(PRODUCT_TOTAL_PRICE_TAG, PRODUCT.price * PRODUCT_QUANTITY);
                    
                    const PRODUCT_BUTTONS_TAG = document.createElement("div");
                    PRODUCT_BUTTONS_TAG.classList.add("buttons-cart2");
                    // ARTICLE_PRODUCT_TAG.appendChild(PRODUCT_BUTTONS_TAG);
                    ARTICLE_PRODUCT_TAG.insertAdjacentElement("afterend", PRODUCT_BUTTONS_TAG);
            
                    console.log('PRODUCT_QUANTITY', PRODUCT_ID, PRODUCT_QUANTITY);
                    const SPAN_QUANTITY_TAG = productSelectedMakeSpanQuantity(PRODUCT_QUANTITY);

                    totalShopAmount = getTotalValueFromCart(true, productList);

                    PRODUCT_BUTTONS_TAG.appendChild(productSelectedMakeSubtractButton(SPAN_QUANTITY_TAG, PRODUCT_ID, cartTotalValueTag, totalShopAmount, PRODUCT_TOTAL_PRICE_TAG));
            
                    PRODUCT_BUTTONS_TAG.appendChild(SPAN_QUANTITY_TAG);
            
                    PRODUCT_BUTTONS_TAG.appendChild(productSelectedMakeAdditionButton(SPAN_QUANTITY_TAG, PRODUCT_ID, cartTotalValueTag, totalShopAmount, PRODUCT_TOTAL_PRICE_TAG));
                }
            }
        });
}

// atualiza o valor unitário
function updateProductTotalPriceTag(tag, value) {
    tag.innerHTML = `Valor unitário: <span class="cart__price_total">${(value).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>`;
}

// atualiza o valor total
function updateShopTotalValueTag(tag, list) {
    let total = 0;
    let cartShopItems = getShopCartItems();

    for(let id in cartShopItems) {
        let quantity = cartShopItems[id];
        console.log('total tag id', id, quantity, list[id]);
        total += (quantity * list[id].price);
    }

    console.log('total tag', tag, total, list, cartShopItems);
    tag.innerHTML = `Valor total da compra: R$ ${total.toLocaleString('pt-br', { minimumFractionDigits: 2})}`;
}

// retorna a quantidade de produtos
function productSelectedMakeSpanQuantity(quantity = 0) {
    const SPAN = document.createElement("span");
    SPAN.classList.add("cart__buttons__quantity");
    SPAN.quantity = quantity;
    SPAN.innerHTML = SPAN.quantity;    

    return SPAN;
}

// adiciona a classe e gera o evento dos botões
function productSelectedMakeCartButton(buttonClass = "", iconClass = "", buttonClickEvent = (e) => {}) {
    // buttonClass = buttonClass || '';
    
    const BUTTON = document.createElement("button");
    BUTTON.classList.add(buttonClass, "buttons-cart");
    BUTTON.innerHTML = `<i class="${iconClass}"></i>`;
    BUTTON.addEventListener("click", (event) => {
        buttonClickEvent(event);
    });
    
    return BUTTON;
}

// controla a quantidade de produtos subtraídos
function productSelectedMakeSubtractButton(span, ID, cartTotalValueTag, totalShop, productTotalTag) {
    if(span instanceof HTMLElement === false) {
        throw new Error("É necessário uma tag html");
    }

    cartTotalValueTag.classList.add("total-value");

    getDataOrderedFromJson()
        .then(productList => {
            updateShopTotalValueTag(cartTotalValueTag, productList);
        });

    return productSelectedMakeCartButton("cart__buttons__subtract", "fa-solid fa-minus fa-2x", () => {
        console.log("subtract");
        span.quantity--;
        span.quantity = span.quantity < 0 ? 0 : span.quantity;
        span.innerHTML = span.quantity;

        setShopItemInCart(ID, span.quantity);
        
        getDataOrderedFromJson()
            .then(productList => {
                cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${getTotalValueFromCart(true, productList)}`;
                
                // armazena o valor total de compras atualizado para controlar a mensagem final
                updateProductTotalPriceTag(productTotalTag, span.quantity * productList[ID].price);

                updateShopTotalValueTag(cartTotalValueTag, productList);
            })
            .catch(error => console.error(error));

        // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${getTotalValueFromCart(true)}`;
        // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${totalShop}`;

        // armazena o valor total de compras atualizado para controlar a mensagem final
        // totalShopAmount = `${getTotalValueFromCart(true)}`;
        // totalShopAmount = `${totalShop}`;
        console.log(totalShopAmount);
    });
}

// controla a quantidade de produtos adicionados
function productSelectedMakeAdditionButton(span, ID, cartTotalValueTag, totalShop, productTotalTag) {
    if(span instanceof HTMLElement === false) {
        throw new Error("É necessário uma tag html");
    }

    cartTotalValueTag.classList.add("total-value");
    // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${getTotalValueFromCart(true)}`;
    // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${totalShop}`;
    getDataOrderedFromJson()
        .then(productList => {
            updateShopTotalValueTag(cartTotalValueTag, productList);
        });

    return productSelectedMakeCartButton("cart__buttons__subtract", "fa-solid fa-plus fa-2x", () => {
        console.log("addition");        
        span.innerHTML = ++span.quantity;

        setShopItemInCart(ID, span.quantity);
        
        getDataOrderedFromJson()
            .then(productList => {
                cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${getTotalValueFromCart(true, productList)}`;
                
                // armazena o valor total de compras atualizado para controlar a mensagem final
                updateProductTotalPriceTag(productTotalTag, span.quantity * productList[ID].price);

                updateShopTotalValueTag(cartTotalValueTag, productList);
            })
            .catch(error => console.error(error));

        // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${getTotalValueFromCart(true)}`;
        // cartTotalValueTag.innerHTML = `Valor total da compra: R$ ${totalShop}`;

        // armazena o valor total de compras atualizado para controlar a mensagem final
        // totalShopAmount = `${getTotalValueFromCart(true)}`;
        // totalShopAmount = `${totalShop}`;
        console.log(totalShopAmount);
    });
}