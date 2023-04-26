class Product {
  id;
  name;
  price;
  type;
  year;
  alcohol;
  quantity;

  // get priceText() { return `${this.price}`.replace(".",","); }
  get priceText() { return 'R$ '+this.price.toLocaleString("pt-br", { minimumFractionDigits: 2});}
  // get alcoholText() { return (""+this.alcohol).replace(".",","); }
  get alcoholText() { return this.alcohol.toLocaleString("pt-br", { minimumFractionDigits: 2}) + '%';}  
  
  static dataToModel(data) {
    const MODEL = new Product();
    MODEL.id = data.id || -1;
    MODEL.name = data.name || "Produto sem nome";
    MODEL.price = data.price || 0.00;
    MODEL.type = data.type || "Sem tipo";
    MODEL.year = data.year || new Date().getFullYear();
    MODEL.alcohol = data.alcohol || 0.00;
    MODEL.image = data.image || "";
    MODEL.quantity = data.quantity || 0;
    
    return MODEL;
  }
}