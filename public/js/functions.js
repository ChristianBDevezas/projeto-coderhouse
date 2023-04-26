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

    console.log('getShopCartItems', cartItems, typeof cartItems === "string")
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

function getDataFromJson() {
  return fetch(`public/js/data/data.json`, {
    method:"GET",
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
      for(let item of PRODUCT_LIST_JSON) {
        const PRODUCT = Product.dataToModel(item);
        PRODUCT_LIST_ORDERED[PRODUCT.id] = PRODUCT;
      }

      return PRODUCT_LIST_ORDERED;
    });
}