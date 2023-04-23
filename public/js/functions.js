const FLAG_CART_ITEMS = "cartItems";
const FLAG_PRODUCT_SELECTED = "lastProductSelected";
function getShopCartItems() {
    let cartItems = localStorage.getItem(FLAG_CART_ITEMS);

    if(typeof cartItems === "string") {
        return JSON.parse(cartItems);
    }

    return {};
}

function setShopItemInCart(id, quantity) {
    let cartItems = getShopCartItems();
    cartItems[id] = quantity;

    localStorage.setItem(FLAG_CART_ITEMS, JSON.stringify(cartItems));
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



function getTotalValueFromCart(asText = false) {
  let cartTotal = 0;

  const SHOP_CART_ITEMS = getShopCartItems();

  for(let PRODUCT_ID in SHOP_CART_ITEMS) {
      const PRODUCT = PRODUCT_LIST_ORDERED[PRODUCT_ID];
      const PRODUCT_QUANTITY = SHOP_CART_ITEMS[PRODUCT_ID];

      if(PRODUCT_QUANTITY < 1) continue;

      
      cartTotal += (PRODUCT_QUANTITY * PRODUCT.price);
  }

  if(asText) {
    return cartTotal.toLocaleString("pt-br", {minimumFractionDigits: 2});
  }

  return cartTotal;
}

// function getTotalValueFromCartAsText() {
//   return getTotalValueFromCart().toLocaleString("pt-br", {minimumFractionDigits: 2});
// }