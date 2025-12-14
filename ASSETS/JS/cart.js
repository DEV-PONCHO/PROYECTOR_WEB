// cart.js
document.addEventListener("DOMContentLoaded", () => {

    // Función para actualizar el contador de items en el carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        const cartCount = document.getElementById("cart-count");
        if(cartCount) cartCount.textContent = count;
    }

    updateCartCount(); // Actualizar al cargar la página

    // Capturar todos los botones "Agregar al carrito"
    const cartButtons = document.querySelectorAll(".btn-cart, .add-to-cart, #add-to-cart");

    cartButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Buscar la tarjeta del producto
            const productCard = btn.closest(".product-card") || btn.closest(".product-detail"); 

            // Si no hay tarjeta, intentar usar atributos del botón
            const product = {
                id: btn.dataset.id || productCard?.dataset.id || 'unknown',
                title: btn.dataset.name || productCard?.querySelector(".card-title")?.textContent || document.getElementById("product-title")?.textContent || 'Sin nombre',
                price: parseFloat(btn.dataset.price || productCard?.querySelector(".text-success")?.textContent.replace(/[^\d.]/g, '')) || 0,
                img: btn.dataset.image || productCard?.querySelector("img")?.src || document.getElementById("product-image")?.src || '',
                quantity: 1
            };

            // Obtener carrito actual
            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

            // Verificar si ya existe el producto
            const existing = cart.find(item => item.id === product.id);
            if(existing){
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            // Guardar carrito
            localStorage.setItem("cartItems", JSON.stringify(cart));
            updateCartCount();
        });
    });
});
