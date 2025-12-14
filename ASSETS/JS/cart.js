document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let visitas = parseInt(localStorage.getItem("contadorVisitas")) || 0;

    visitas++;
    localStorage.setItem("contadorVisitas", visitas);

    // Observador para esperar a que los elementos aparezcan en el DOM
    const observer = new MutationObserver(() => {
        const visitasBadge = document.getElementById("contador-visitas");
        const cartBadge = document.getElementById("cart-count-badge");

        if (visitasBadge && cartBadge) {
            visitasBadge.textContent = visitas;
            cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
            observer.disconnect(); // deja de observar
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // --- FUNCIONES DEL CARRITO ---
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        const cartTotalEl = document.getElementById("cart-total");
        if (!cartContainer) return;

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

            div.querySelector(".increase").addEventListener("click", () => {
                item.quantity += 1;
                saveCart();
                renderCart();
            });

            div.querySelector(".decrease").addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    saveCart();
                    renderCart();
                }
            });

            div.querySelector(".remove").addEventListener("click", () => {
                cart = cart.filter(p => p.id !== item.id);
                saveCart();
                renderCart();
            });

            cartContainer.appendChild(div);
        });

        if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);

        // Actualizar badge carrito si ya está en DOM
        const cartBadge = document.getElementById("cart-count-badge");
        if (cartBadge) cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Vaciar carrito
    const emptyCartBtn = document.getElementById("empty-cart");
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro que deseas vaciar todo el carrito?")) {
                cart = [];
                saveCart();
                renderCart();
            }
        });
    }

    // Botones agregar productos
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

            const existing = cart.find(p => p.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            saveCart();
            renderCart();
        });
    });

    // Inicializar carrito
    renderCart();
});
