const PRODUCT_LIST_JSON = [
    {"id": 1, "quantity": 0, "name": "Barone Montalto", "price": 77.80, "type": "tinto", "year": "2021", "alcohol": 12.50, "image": "bottles/1-barone-montalto.png"},

    {"id": 2, "quantity": 0, "name": "Matetic Corralillo", "price": 75.50, "type": "tinto", "year": "2021", "alcohol": 13.00, "image": "bottles/2-corralillo.png"},

    {"id": 3, "quantity": 0, "name": "Vistamar Brisa", "price": 85.80, "type": "branco", "year": "2016", "alcohol": 13.00, "image": "bottles/3-vistamar-brisa.png"},

    {"id": 4, "quantity": 0, "name": "Rio Flor Douro", "price": 80.50, "type": "branco", "year": "2018", "alcohol": 12.50, "image": "bottles/4-rio-flor.png"},

    {"id": 5, "quantity": 0, "name": "Estandon Heritage", "price": 92.80, "type": "rose", "year": "2021", "alcohol": 8.0, "image": "bottles/5-estandon.png"},

    {"id": 6, "quantity": 0, "name": "Tramari", "price": 95.50, "type": "rose", "year": "2022", "alcohol": 10.00, "image": "bottles/6-tramari.png"},

    {"id": 7, "quantity": 0, "name": "Victoria Geisse", "price": 75.00, "type": "espumante", "year": "2020", "alcohol": 10.00, "image": "bottles/7-victoria-geisse.png"},

    {"id": 8, "quantity": 0, "name": "Gramona Cuvee", "price": 75.80, "type": "espumante", "year": "2017", "alcohol": 12.00, "image": "bottles/8-gramona-cuvee.png"},

    {"id": 9, "quantity": 0, "name": "Patrick Clerget", "price": 80.50, "type": "tinto", "year": "2022", "alcohol": 13.00, "image": "bottles/9-patrick-clerget.png"},

    {"id": 10, "quantity": 0, "name": "Barone Montalto", "price": 95.00, "type": "tinto", "year": "2023", "alcohol": 8.0, "image": "bottles/10-barone-montalto.png"},

    {"id": 11, "quantity": 0, "name": "Vallado Douro", "price": 82.50, "type": "branco", "year": "2018", "alcohol": 12.00, "image": "bottles/11-valladodouro.png"},

    {"id": 12, "quantity": 0, "name": "Leyda Chardonnay", "price": 95.00, "type": "branco", "year": "2020", "alcohol": 10.00, "image": "bottles/12-leyda-reserva.png"},

    {"id": 13, "quantity": 0, "name": "Henri Leblanc", "price": 77.00, "type": "espumante", "year": "2020", "alcohol": 10.00, "image": "bottles/13-henri-leblanc.png"},

    {"id": 14, "quantity": 0, "name": "Gramona Imperial", "price": 93.50, "type": "espumante", "year": "2021", "alcohol": 13.00, "image": "bottles/14-gramona-imperial.png"},

    {"id": 15, "quantity": 0, "name": "Stardust", "price": 85.50, "type": "rose", "year": "2020", "alcohol": 8.0, "image":"bottles/15-stardust.png"},
    
    {"id": 16, "quantity": 0, "name": "Lumière", "price": 88.00, "type": "rose", "year": "2023", "alcohol": 12.00, "image": "bottles/16-lumière.png"}
];

const PRODUCT_LIST = [];
for(let item of PRODUCT_LIST_JSON) {
  PRODUCT_LIST.push(Product.dataToModel(item));
}
// console.log(PRODUCT_LIST);

const PRODUCT_LIST_ORDERED = {};
for(let item of PRODUCT_LIST_JSON) {
  const PRODUCT = Product.dataToModel(item);
  PRODUCT_LIST_ORDERED[PRODUCT.id] = PRODUCT;
}