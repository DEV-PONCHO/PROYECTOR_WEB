document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const emptyCartBtn = document.getElementById("empty-cart");

    // Función para actualizar contador de items en el encabezado
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        const cartCount = document.getElementById("cart-count");
        if(cartCount) cartCount.textContent = count;
    }

    // Guardar carrito en localStorage
    function saveCart(cart) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }

    // Renderizar carrito
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const div = document.createElement("div");
            div.className = "col-12 mb-3";
            div.innerHTML = `
                <div class="card shadow-sm p-3 d-flex flex-row align-items-center">
                    <img src="${item.img}" alt="${item.title}" 
                         class="img-thumbnail me-3" style="width:100px; height:100px; object-fit:cover;">
                    <div class="flex-fill">
                        <h5 class="mb-1">${item.title}</h5>
                        <p class="mb-2 text-success fw-bold">$${item.price} USD</p>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-outline-secondary btn-sm decrease">-</button>
                            <span class="px-2 border rounded quantity">${item.quantity}</span>
                            <button class="btn btn-outline-secondary btn-sm increase">+</button>
                            <button class="btn btn-danger btn-sm ms-3 remove">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;

            // Eventos de botones
            div.querySelector(".increase").addEventListener("click", () => {
                item.quantity += 1;
                saveCart(cart);
                renderCart();
            });

            div.querySelector(".decrease").addEventListener("click", () => {
                if(item.quantity > 1) {
                    item.quantity -= 1;
                    saveCart(cart);
                    renderCart();
                }
            });

            div.querySelector(".remove").addEventListener("click", () => {
                const index = cart.findIndex(p => p.id === item.id);
                if(index > -1) {
                    cart.splice(index, 1);
                    saveCart(cart);
                    renderCart();
                }
            });

            cartContainer.appendChild(div);
        });

        cartTotalEl.textContent = total.toFixed(2);
        updateCartCount();
    }

    // Vaciar carrito
    if(emptyCartBtn){
        emptyCartBtn.addEventListener("click", () => {
            if(confirm("¿Estás seguro que deseas vaciar todo el carrito?")){
                localStorage.removeItem("cartItems");
                renderCart();
            }
        });
    }

    // Botones "Agregar al carrito" (productos y compras)
    const cartButtons = document.querySelectorAll(".add-to-cart, #add-to-cart, .btn-cart");
    cartButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = {
                id: btn.dataset.id,
                title: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                img: btn.dataset.image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
            const existing = cart.find(p => p.id === product.id);
            if(existing){
                existing.quantity += 1;
            } else {
                cart.push(product);
            }
            saveCart(cart);
            renderCart();
        });
    });

    // Inicializar carrito
    renderCart();
    updateCartCount();
});
