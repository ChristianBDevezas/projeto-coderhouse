const galleryFilter = document.querySelector(".products__categories__links");
const galleryLinks = document.querySelectorAll(".products__categories__link a");
const galleryImages = document.querySelectorAll(".products__item");

const displayItems = (e, link) => {
    e.preventDefault();

    galleryFilter.querySelector(".active").classList.remove("active");
    link.classList.add("active");

    const filter = link.getAttribute("data-filter");

    galleryImages.forEach((image) => {
        if(filter === "all"  || image.classList.contains(filter)) {
            image.style.display = "block";
        }
        else {
            image.style.display = "none";
        }
    });
}

galleryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        displayItems(e, link);
    });
});

//*************************************************************************************************************//
// Criando Objetos com método construtor a partir de uma classe
class product {
    constructor(name, price, type, year, alcohol) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.year = year;
        this.alcohol = alcohol;
    }

    convertType() {
        let change = this.price.replace(',', '.');
        this.price = Number(change);
        console.log(`Preço do vinho: ${this.price} | Tipo: ${typeof(this.price)}`);
    }
}

const wine1 = new product("Barone Montalto", "77,80", "tinto", 2021, "12,50");
const wine2 = new product("Matetic Corralillo", "75,50", "tinto", 2021, "13,00");
const wine3 = new product("Vistamar Brisa", "85,80", "seco", 2016, "13,00");
const wine4 = new product("Rio Flor Douro", "80,50", "seco", 2018, "12,50");
const wine5 = new product("Estandon Heritage", "92,80", "rose", 2021, "8,00");
const wine6 = new product("Tramari", "95,50", "rose", 2022, "10,00");
const wine7 = new product("Victoria Geisse", "75,00", "espumante", 2020, "10,00");
const wine8 = new product("Gramona Cuvee", "75,80", "espumante", 2017, "12,00");
const wine9 = new product("Patrick Clerget", "80,50", "tinto", 2022, "13,00");
const wine10 = new product("Barone Montalto", "95,00", "tinto", 2023, "8,00");
const wine11 = new product("Vallado Douro", "82,50", "seco", 2018, "12,00");
const wine12 = new product("Leyda Chardonnay", "95,00", "seco", 2020, "10,00");
const wine13 = new product("Henri Leblanc", "77,00", "espumante", 2020, "10,00");
const wine14 = new product("Gramona Imperial", "93,50", "espumante", 2021, "13,00");
const wine15 = new product("Stardust", "85,50", "rose", 2020, "8,00");
const wine16 = new product("Lumière", "88,00", "rose", 2023, "12,00");

//*************************************************************************************************************//
// Array de produtos
const productsArray = [
    wine1, 
    wine2, 
    wine3, 
    wine4, 
    wine5, 
    wine6, 
    wine7, 
    wine8, 
    wine9, 
    wine10, 
    wine11, 
    wine12, 
    wine13, 
    wine14, 
    wine15, 
    wine16
];

for(const item of productsArray) {
    console.log(item);
    item.convertType();
}

//*************************************************************************************************************//
console.log("\n");

// Métodos de busca e filtragem sobre o Array
// Exemplo para mostrar o nome dos produtos
const filterName = productsArray.map((item) => item.name);
console.log(filterName);

// Exemplo para buscar os produtos do tipo "tinto"
const filterType = productsArray.filter((item) => item.type === "tinto");
console.log(filterType);

// Exemplo para buscar os produtos com preço superior a R$ 90
const filterPrice = productsArray.filter((item) => item.price > 90);
console.log(filterPrice);

// Exemplo para mostrar o valor total dos produtos
const totalPrice = productsArray.reduce((accumulator, item) => accumulator + item.price, 0);
console.log(`Valor total dos produtos: R$ ${totalPrice}`);