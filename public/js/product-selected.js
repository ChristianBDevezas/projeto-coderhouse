const promoBtn = document.getElementById("promo-btn");
promoBtn.addEventListener("click", () => {   
    Toastify({
        text:"A cada 4 unidades deste vinho, uma é grátis! Frete gratuito!",
        duration: 3500,
    }).showToast();
});