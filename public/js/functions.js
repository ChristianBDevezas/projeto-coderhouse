const FLAG_CART_ITEMS = "cartItems";
const FLAG_PRODUCT_SELECTED = "lastProductSelected";

startShopCartItems();

function startShopCartItems() {
  console.log(localStorage.getItem(FLAG_CART_ITEMS), localStorage.getItem(FLAG_CART_ITEMS) === null);

  if(localStorage.getItem(FLAG_CART_ITEMS) === null) {
    localStorage.setItem(FLAG_CART_ITEMS, '{}');
  }
}

function getShopCartItems() {
  let cartItems = localStorage.getItem(FLAG_CART_ITEMS);

  console.log('getShopCartItems', cartItems, typeof cartItems === "string");

  if(typeof cartItems === "string" && cartItems !== null) {
    return JSON.parse(cartItems);
  }

  return {};
}

function setShopItemInCart(id, quantity) {
  let cartItems = getShopCartItems();
  console.log('cartItems', cartItems);
  cartItems[id] = quantity;

  localStorage.setItem(FLAG_CART_ITEMS, JSON.stringify(cartItems));
}

function clearCartItems() {
  localStorage.removeItem(FLAG_CART_ITEMS);
}

function setShopItemInProductListOrdered(id, quantity) {
  PRODUCT_LIST_ORDERED[id].quantity = quantity;
}

function setLastProductSelectedInStorage(id) {
  console.log("setLastProductSelectedInStorage id", id);
  localStorage.setItem(FLAG_PRODUCT_SELECTED, id);
}

function getLastProductSelectedFromStorage() {
  const ID = +localStorage.getItem(FLAG_PRODUCT_SELECTED);

  return (isNaN(ID) === false) ? ID : -1;
}

function getTotalValueFromCart(asText = false, productListOrdered) {
  let cartTotal = 0;

  const SHOP_CART_ITEMS = getShopCartItems();

  for(let PRODUCT_ID in SHOP_CART_ITEMS) {
    const PRODUCT = productListOrdered[PRODUCT_ID];
    const PRODUCT_QUANTITY = SHOP_CART_ITEMS[PRODUCT_ID];

    if (PRODUCT_QUANTITY < 1) continue;

    cartTotal += (PRODUCT_QUANTITY * PRODUCT.price);
  }

  if (asText) {
    return cartTotal.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  }

  return cartTotal;
}

function getDataFromJson() {
  return fetch(`public/js/data/data.json`, {
    method: "GET",
  })
    .then(resource => {
      console.log("resource", resource);

      return resource.json()
    })
    .then(json => {
      let productList = json.map(item => Product.dataToModel(item))

      return productList;
    })
    .catch(error => console.error(error));
}

function getDataOrderedFromJson() {
  return getDataFromJson()
    .then(productList => {
      const PRODUCT_LIST_ORDERED = {};

      for (let item of PRODUCT_LIST_JSON) {
        const PRODUCT = Product.dataToModel(item);
        PRODUCT_LIST_ORDERED[PRODUCT.id] = PRODUCT;
      }

      return PRODUCT_LIST_ORDERED;
    });
}

async function getShopTotalValue() {
  let total = 0;

  try {

    let productOrderedList = await getDataOrderedFromJson()
    let cartShopItems = getShopCartItems();

    for (let id in cartShopItems) {
      let quantity = cartShopItems[id];
      total += (quantity * productOrderedList[id].price);
    }

    return total;
  }
  catch(error) {
    // inserir esse no banco de dados: erros_da_loja_vinho
    // analisar se deve aparecer alguma mensagem para usuário: popup
    // 2 mensagens: uma para o usuário do programa, e outra para o desenvolvedor (código)
    console.error(error);
  }

  return 0;
}

async function getShopTotalValueBrazilianText() {
  let total = await getShopTotalValue()

  return total.toLocaleString('pt-br', {
    minimumFractionDigits: 2
  });
}


function configurePromotionButton(cssClass) {
  const promoBtn = document.getElementById(cssClass);

  if (promoBtn instanceof HTMLElement === false) {
    return;
  }

  promoBtn.addEventListener("click", () => {
    setTimeout(() => {
      Toastify({
        text: "A cada 4 unidades deste vinho, uma é grátis! Frete gratuito!",
        duration: 3200,
      }).showToast();
    }, 120);
  });
}

function getImageDirectoryPath(imagePath = null) {
  let newImagePath = "";

  if (typeof imagePath === 'string') {
    newImagePath += imagePath;
  }

  // return `${window.location.protocol}//${window.location.hostname}/projeto-coderhouse-main-2023-04-29_1/public/img/${newImagePath}`
  return `public/img/${newImagePath}`;
}


function deslogarDaLoja() {
  userSate = false;
  localStorage.setItem('UserState', userSate);
  checkState(userSate);

  let cartItems = getShopCartItems();
  localStorage.clear();
  console.log("cartItems", cartItems);

  for (let id in cartItems) {
    setShopItemInCart(id, cartItems[id]);
  }
}