// contador.js
function actualizarContador() {
    let visitas = parseInt(localStorage.getItem('contadorVisitas')) || 0;
    visitas++;
    localStorage.setItem('contadorVisitas', visitas);

    const contadorEl = document.getElementById('contador-visitas');
    if (contadorEl) {
        contadorEl.textContent = visitas;
    }
}

// Esperar a que el header se cargue
const headerEl = document.getElementById("header");
const observer = new MutationObserver(() => {
    const contadorEl = document.getElementById('contador-visitas');
    if (contadorEl) {
        actualizarContador();
        observer.disconnect(); // deja de observar después de actualizar
    }
});

// Observa cambios en el header
observer.observe(headerEl, { childList: true, subtree: true });
