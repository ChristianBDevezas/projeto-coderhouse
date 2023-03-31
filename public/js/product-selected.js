const promoBtn = document.getElementById("promo-btn");
promoBtn.addEventListener("click", () => {
    setTimeout(() => {
        Toastify({
            text:"A cada 4 unidades deste vinho, uma é grátis! Frete gratuito!",
            duration: 3200,
        }).showToast();
    }, 120);
});