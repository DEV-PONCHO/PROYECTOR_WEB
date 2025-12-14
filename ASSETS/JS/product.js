// 1️⃣ Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// 2️⃣ Base de datos de productos
const products = {
    starter: {
        title: "Paquete Starter Digital",
        price: "599 USD / mes",
        image: "ASSETS/PICTURES/IMG_2.jfif",
        description: "Campaña digital básica perfecta para comenzar tu presencia online.",
        features: [
            "Gestión básica de redes sociales",
            "Publicidad en una plataforma",
            "Reporte mensual",
            "Soporte estándar"
        ]
    },

    pro: {
        title: "Paquete Pro Digital",
        price: "1299 USD",
        image: "ASSETS/PICTURES/IMG_6.jfif",
        description: "Solución completa de marketing digital con campañas avanzadas.",
        features: [
            "Campañas multicanal",
            "Analítica avanzada",
            "Optimización continua",
            "Soporte prioritario"
        ]
    },

    fisica: {
        title: "Campaña Publicitaria Física",
        price: "2499 USD",
        image: "ASSETS/PICTURES/IMG_3.jpg",
        description: "Publicidad exterior estratégica en ubicaciones premium.",
        features: [
            "Diseño creativo",
            "Producción de material",
            "Instalación incluida",
            "Cobertura local"
        ]
    },

    creativa: {
        title: "Estrategia Creativa Premium",
        price: "1899 USD",
        image: "ASSETS/PICTURES/IMG_1.jfif",
        description: "Desarrollo completo de identidad y concepto de marca.",
        features: [
            "Branding",
            "Concepto creativo",
            "Material publicitario",
            "Guía de marca"
        ]
    },

    growth: {
        title: "Growth Marketing Integral",
        price: "1799 USD",
        image: "ASSETS/PICTURES/IMG_5.jfif",
        description: "Plan de crecimiento escalable y orientado a resultados.",
        features: [
            "Adquisición de usuarios",
            "Optimización de conversiones",
            "Retención",
            "Estrategia de crecimiento"
        ]
    },

    analitica: {
        title: "Analítica y Dashboard Personalizado",
        price: "899 USD",
        image: "ASSETS/PICTURES/IMG_9_ANALISIS.jpg",
        description: "Seguimiento de métricas con dashboards personalizados.",
        features: [
            "KPIs personalizados",
            "Dashboard en tiempo real",
            "Reportes automáticos",
            "Soporte técnico"
        ]
    },

    segmentacion: {
        title: "Segmentación y Targeting Avanzado",
        price: "699 USD",
        image: "ASSETS/PICTURES/IMG_8.jpg",
        description: "Segmentación precisa para maximizar el ROI.",
        features: [
            "Investigación de audiencia",
            "Definición de buyer persona",
            "Optimización de anuncios",
            "Mejora del ROI"
        ]
    },

    enterprise: {
        title: "Paquete Enterprise",
        price: "4999 USD",
        image: "ASSETS/PICTURES/IMG_7.jpg",
        description: "Solución 360° para marcas que buscan máximo impacto.",
        features: [
            "Todos los servicios incluidos",
            "Equipo dedicado",
            "Estrategia personalizada",
            "Soporte premium"
        ]
    }
};

// 3️⃣ Cargar producto
const product = products[productId];

if (product) {
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;

    const featuresList = document.getElementById("product-features");
    featuresList.innerHTML = "";

    product.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });

} else {
    // Producto no encontrado
    document.querySelector(".container").innerHTML = `
        <div class="text-center py-5">
            <h2>Producto no encontrado</h2>
            <a href="compras.html" class="btn btn-success mt-3">Volver a compras</a>
        </div>
    `;
}
