const galleryFilter = document.querySelector(".products__categories__links");
const galleryLinks = document.querySelectorAll(".products__categories__link a");

galleryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        galleryFilter.querySelector(".active").classList.remove("active");
        link.classList.add("active");
    });
});


const DIV_GALLERY = document.querySelector("div.products__gallery");

const PRODUCTS_FILTERED = {};

// carrega os produtos dinamicamente na página
if(DIV_GALLERY instanceof HTMLElement) {
    // DIV_GALLERY.insertAdjacentHTML("beforeend", "<hr/><hr/>");
    
    getDataFromJson()
        .then(productList => {
            for(let product of productList) {
                if(PRODUCTS_FILTERED[product.type] instanceof Array === false) {
                    PRODUCTS_FILTERED[product.type] = [];
                }
                
                const IMAGE_PATH = `${getImageDirectoryPath(product.image)}`;
                
                let tagArticle = document.createElement("article");
                tagArticle.classList.add("products__item");
                tagArticle.setAttribute("data-filter", product.type);
        
                tagArticle.innerHTML = `
                    <header>
                        <figure class="products__item__image">
                            <img src="${IMAGE_PATH}" alt="Vinho ${product.type}">
                        </figure>
        
                        <a href="product-selected.html?id=${product.id}">
                            <button class="products__item__buy">Comprar</button>
                        </a>
                    </header>
        
                    <footer>
                            <span class="products__item__name">${product.name}</span>
                            <span class="products__item__size">${product.priceText}</span>
                    </footer>`;
        
                    
                PRODUCTS_FILTERED[product.type].push(tagArticle);
        
                // DIV_GALLERY.insertAdjacentHTML("afterbegin", html);
                DIV_GALLERY.insertAdjacentElement("beforeend", tagArticle);
            }
        })
        // .catch(console.error);
        .catch(error => console.error(error));    
}

const LINKS_SIDEBAR = document.querySelectorAll("aside.products__categories ul.products__categories__links a[data-filter]");

// filtra os produtos a serem apresentados por meio do menu de Categorias
LINKS_SIDEBAR.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const FILTER_VALUE = link.getAttribute("data-filter");

        for(let iFilter in PRODUCTS_FILTERED) {
            let sublist = PRODUCTS_FILTERED[iFilter];

            for(let iSublist in sublist) {
                let item = sublist[iSublist];
                console.log("item", item); 

                const PRODUCT_FILTER_VALUE = item.getAttribute("data-filter");

                if(FILTER_VALUE !== PRODUCT_FILTER_VALUE && FILTER_VALUE !== 'all') {
                    item.classList.add("hidden");
                }
                else {
                    item.classList.remove("hidden");
                }
            }
        }
    });
});