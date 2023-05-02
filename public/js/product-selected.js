configurePromotionButton("promo-btn");

const PRODUCT_SELECTED_IMAGE = document.querySelector("figure.product__image");

// mostra a imagem do produto selecionado
if(PRODUCT_SELECTED_IMAGE instanceof HTMLElement) {
    getDataOrderedFromJson()
        .then(productList => {
        
            const MY_URL = new URL(window.location.href);

            const ID = MY_URL.searchParams.get("id");

            if(typeof ID === 'string') {
                const PRODUCT = productList[ID];
                PRODUCT_SELECTED_IMAGE.innerHTML = `<img src="${getImageDirectoryPath(PRODUCT.image)}" alt="Vinho">`;
            }

            setLastProductSelectedInStorage(ID);        
        });
}

const PRODUCT_SELECTED_TAG = document.querySelector("article.product__description");

// mostra os botões de Voltar para produtos e Adicionar ao carrinho
const BUTTON_BACK_TO_PREVIOUS_PAGE = makeButtonBackToPreviousPage();
const BUTTON_ADD_TO_CART = makeButtonAddToCart();
const CART_TOTAL_VALUE_CONTAINER = document.createElement('div');
CART_TOTAL_VALUE_CONTAINER.classList.add('cart_total');

if(PRODUCT_SELECTED_TAG instanceof HTMLElement) {
    PRODUCT_SELECTED_TAG.insertAdjacentElement("afterend", BUTTON_ADD_TO_CART);
    PRODUCT_SELECTED_TAG.insertAdjacentElement("afterend", BUTTON_BACK_TO_PREVIOUS_PAGE);  
    
    BUTTON_BACK_TO_PREVIOUS_PAGE.insertAdjacentElement('beforebegin', CART_TOTAL_VALUE_CONTAINER);

    const MY_URL = new URL(window.location.href);

    const PRODUCT_ID = MY_URL.searchParams.get("id");

    // mostra as demais caraterísticas do produto selecionado
    if(typeof PRODUCT_ID === 'string') {
        getDataOrderedFromJson()
        .then(productList => {
            const PRODUCT = productList[PRODUCT_ID];
            
            console.log('PRODUCT', PRODUCT, PRODUCT.price);
            updateProductTotalValue(CART_TOTAL_VALUE_CONTAINER, PRODUCT.price);

            PRODUCT_SELECTED_TAG.innerHTML = `
                <h2 class="product__title">
                    <span class="product__title__value">${PRODUCT.name}</span>
                </h2>

                <h2 class="product__price">Preço:
                    <span class="product__price__value">${PRODUCT.priceText}</span>
                </h2>

                <h2 class="product__type">Tipo de Vinho:
                    <span class="product__type__value">${PRODUCT.type}</span>
                </h2>
                    
                <h2 class="product__vintage">Ano Safra:
                    <span class="product__vintage__value">${PRODUCT.year}</span>
                </h2>

                <h2 class="product__alcohol">Percentual Alcoólico:
                    <span class="product__alcohol__value">${PRODUCT.alcoholText}</span>
                </h2>`;

            const ARTICLE_CART_BUTTONS = document.createElement('article');
            ARTICLE_CART_BUTTONS.classList.add("cart__buttons");

            // beforebegin    afterbegin      beforeend     afterend
            //            <h1>                         </h1>
            // PRODUCT_SELECTED_TAG.insertAdjacentElement("afterend", ARTICLE_CART_BUTTONS);
            PRODUCT_SELECTED_TAG.insertAdjacentElement("beforeend", ARTICLE_CART_BUTTONS);
            
            const SPAN_QUANTITY_TAG = productSelectedMakeSpanQuantity();

            ARTICLE_CART_BUTTONS.appendChild(productSelectedMakeSubtractButton(SPAN_QUANTITY_TAG, CART_TOTAL_VALUE_CONTAINER, PRODUCT.price));

            ARTICLE_CART_BUTTONS.appendChild(SPAN_QUANTITY_TAG);

            ARTICLE_CART_BUTTONS.appendChild(productSelectedMakeAdditionButton(SPAN_QUANTITY_TAG, CART_TOTAL_VALUE_CONTAINER, PRODUCT.price));

            BUTTON_ADD_TO_CART.addEventListener("click", function(event) {
                event.preventDefault();

                if(SPAN_QUANTITY_TAG.quantity == 0) {
                    swal({
                    title: 'Quantidade',
                    text: 'Precisa adicionar ao menos 1 unidade!',
                    icon: 'warning',
                    // confirmButtonText: 'OK'
                    //switched to "button" because "confirmButtonText" has been deprecated
                    button: 'OK'
                    });
                }
                else {
                    let productQuantity = SPAN_QUANTITY_TAG.quantity;
                
                    if(isNaN(productQuantity) === false) {
                        setShopItemInCart(PRODUCT_ID, productQuantity);
                    }

                    window.location = `cart.html`;
                }

                // let productQuantity = SPAN_QUANTITY_TAG.quantity;
                
                // if(isNaN(productQuantity) === false) {
                //     setShopItemInCart(PRODUCT_ID, productQuantity);
                // }

                // window.location = `cart.html`;
            });    
        });    
    }
}

function makeButtonAddToCart() {
    const BUTTON_ADD_TO_CART = document.createElement("a");
    BUTTON_ADD_TO_CART.classList.add("product__btn", "cart");
    BUTTON_ADD_TO_CART.innerHTML = "Adicionar ao carrinho";
    BUTTON_ADD_TO_CART.setAttribute("href", "cart.html");
    return BUTTON_ADD_TO_CART;
}

function makeButtonBackToPreviousPage() {
    const BUTTON_BACK_TO_PREVIOUS_PAGE = document.createElement("a");
    BUTTON_BACK_TO_PREVIOUS_PAGE.classList.add("product__btn", "back");
    BUTTON_BACK_TO_PREVIOUS_PAGE.innerHTML = "Voltar para produtos";
    BUTTON_BACK_TO_PREVIOUS_PAGE.setAttribute("href", "products.html");
    return BUTTON_BACK_TO_PREVIOUS_PAGE;
}

// adiciona a classe aos botões
function productSelectedMakeSpanQuantity() {
    const SPAN = document.createElement("span");
    SPAN.classList.add("cart__buttons__quantity");
    SPAN.quantity = 1;
    SPAN.innerHTML = SPAN.quantity;
    return SPAN;
}

// adiciona a classe aos ícones
function productSelectedMakeCartButton(buttonClass = "", iconClass = "", buttonClickEvent = (e) => {}) {
    // buttonClass = buttonClass || '';
    
    const BUTTON = document.createElement("button");
    BUTTON.classList.add(buttonClass);
    BUTTON.innerHTML = `<i class="${iconClass}"></i>`;
    BUTTON.addEventListener("click", (event) => {
        buttonClickEvent(event);
    });

    return BUTTON;
}

// mostra a quantidade de produtos após clicar no botão de menos
function productSelectedMakeSubtractButton(span, totalContainerTag, productPrice) {
    if(span instanceof HTMLElement === false) {
        throw new Error("É necessário uma tag html");
    }

    return productSelectedMakeCartButton("cart__buttons__subtract", "fa-solid fa-minus fa-2x", (event) => {
        console.log("subtract");
        span.quantity--;
        span.quantity = span.quantity < 0 ? 0 : span.quantity;
        span.innerHTML = span.quantity;
        
        updateProductTotalValue(totalContainerTag, span.quantity * productPrice);        
    });
}

// mostra a quantidade de produtos após clicar no botão de mais
function productSelectedMakeAdditionButton(span, totalContainerTag, productPrice) {
    if(span instanceof HTMLElement === false) {
        throw new Error("É necessário uma tag html");
    }

    return productSelectedMakeCartButton("cart__buttons__add", "fa-solid fa-plus fa-2x", (event) => {
        console.log("adition");
        // span.quantity++;
        span.innerHTML = ++span.quantity;

        updateProductTotalValue(totalContainerTag, span.quantity * productPrice);
    });
}

function updateProductTotalValue(tag, value) {
    total = value.toLocaleString("pt-br", {minimumFractionDigits: 2})
    tag.innerHTML = `<strong>Valor total:</strong><span>R$ ${total}</span>`;
}