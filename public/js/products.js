const galleryFilter = document.querySelector(".products__categories__links");
const galleryLinks = document.querySelectorAll(".products__categories__link a");
const galleryImages = document.querySelectorAll(".products__item");

galleryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        galleryFilter.querySelector(".active").classList.remove("active");
        link.classList.add("active");

        const filter = link.getAttribute("data-filter");

        // galleryImages.forEach((image) => {
        //     if(filter === "all"  || image.classList.contains(filter)) {
        //         image.style.display = "block";
        //     }
        //     else {
        //         image.style.display = "none";
        //     }
        // });

        // exemplo usando operador ternário
        galleryImages.forEach((image) => {
            filter === "all" || image.classList.contains(filter) ? image.style.display = "block" : image.style.display = "none";
        });
    });    
});

//*************************************************************************************************************//
// Criando Objeto wine1 com método construtor a partir de uma classe
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
        console.log(`Preço do vinho ${this.name} é ${this.price}`);
    }
}

const wine1 = new product("Barone Montalto", "77,80", "tinto", 2021, "12,50");

// Acessando propriedades e armazenando em variáveis por meio da desestruturação 
const {name, price, type, year, alcohol} = wine1;
console.log(name, price, type, year, alcohol);

console.log("\n");

//*************************************************************************************************************//
// Criando mais objetos e utilizando operador SPREAD para replicar os objetos
const wine2 = new product("Matetic Corralillo", "76,50", "tinto", 2021, "13,00");
const wine3 = new product("Vistamar Brisa", "85,80", "seco", 2016, "13,00");
const wine4 = new product("Rio Flor Douro", "80,50", "seco", 2018, "12,50");

// cópia do objeto wine2, sem alterar as propriedades do objeto original
const wine2Copy = {...wine2};
console.log(wine2);
console.log(wine2Copy);

console.log("\n");

// cópia do objeto wine3, alterando o valor da propriedade price, e mantendo inalteradas as propriedades do objeto original
const wine3Copy = {
    ...wine3,
    price: "88,80"
}
console.log(wine3);
console.log(wine3Copy);

console.log("\n");

// cópia do objeto wine4, alterando o valor das propriedades price e year, e sem alterar as propriedades do objeto original
const wine4Copy = {
    ...wine4,
    price: "82,00",
    year: "2023"
}
console.log(wine4);
console.log(wine4Copy);

console.log("\n");

//*************************************************************************************************************//
// Array dos 4 produtos(vinhos)
const productsArray = [wine1, wine2, wine3, wine4,];

// converte o tipo da propriedade price para realizar soma de valores
for(const item of productsArray) {
    item.convertType();
}

// exemplo de soma de valores(preço dos itens) com o REST parameters
function somaValues(...prices) {
	let sum = 0;
	for(let price of prices) {
        sum += price;
    }

	return `O valor total dos vinhos é ${sum.toFixed(2)}`;
}
console.log(somaValues(wine1.price, wine2.price, wine3.price, wine4.price));