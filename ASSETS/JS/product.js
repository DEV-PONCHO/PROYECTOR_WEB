// product.js
document.addEventListener('DOMContentLoaded', () => {
    // Array con información de productos
    const products = [
        {
            id: 'starter',
            name: 'Paquete Starter Digital',
            description: 'Campaña digital básica perfecta para comenzar tu presencia online. Incluye gestión de redes sociales y anuncios en una plataforma.',
            price: 599,
            image: 'ASSETS/PICTURES/IMG_2.jfif',
            features: ['Gestión de redes sociales', 'Campaña en una plataforma', 'Reportes mensuales']
        },
        {
            id: 'pro',
            name: 'Paquete Pro Digital',
            description: 'Solución completa de marketing digital con campañas en múltiples plataformas, analítica avanzada y optimización.',
            price: 1299,
            image: 'ASSETS/PICTURES/IMG_6.jfif',
            features: ['Múltiples plataformas', 'Analítica avanzada', 'Optimización de campañas']
        },
        {
            id: 'fisica',
            name: 'Campaña Publicitaria Física',
            description: 'Publicidad exterior estratégica en ubicaciones premium. Incluye diseño, producción e instalación de vallas publicitarias.',
            price: 2499,
            image: 'ASSETS/PICTURES/IMG_3.jpg',
            features: ['Diseño de vallas', 'Producción', 'Instalación']
        },
        {
            id: 'creativa',
            name: 'Estrategia Creativa Premium',
            description: 'Desarrollo completo de identidad de marca, conceptos creativos y material publicitario para todos los canales.',
            price: 1899,
            image: 'ASSETS/PICTURES/IMG_1.jfif',
            features: ['Identidad de marca', 'Conceptos creativos', 'Material publicitario']
        },
        {
            id: 'growth',
            name: 'Growth Marketing Integral',
            description: 'Plan de crecimiento escalable con estrategias de adquisición, retención y optimización de conversión.',
            price: 1799,
            image: 'ASSETS/PICTURES/IMG_5.jfif',
            features: ['Adquisición', 'Retención', 'Optimización de conversión']
        },
        {
            id: 'analitica',
            name: 'Analítica y Dashboard Personalizado',
            description: 'Sistema de seguimiento y análisis de datos con dashboard personalizado para tomar decisiones informadas.',
            price: 899,
            image: 'ASSETS/PICTURES/IMG_9_ANALISIS.jpg',
            features: ['Seguimiento de datos', 'Dashboard personalizado', 'Decisiones informadas']
        },
        {
            id: 'segmentacion',
            name: 'Segmentación y Targeting Avanzado',
            description: 'Investigación de audiencia y configuración de segmentación precisa para maximizar el ROI de tus campañas.',
            price: 699,
            image: 'ASSETS/PICTURES/IMG_8.jpg',
            features: ['Investigación de audiencia', 'Configuración precisa', 'Maximizar ROI']
        },
        {
            id: 'enterprise',
            name: 'Paquete Enterprise',
            description: 'Solución completa 360° que integra todos nuestros servicios para marcas que buscan máximo impacto y resultados.',
            price: 4999,
            image: 'ASSETS/PICTURES/IMG_7.jpg',
            features: ['Todos los servicios', 'Máximo impacto', 'Resultados garantizados']
        }
    ];

    // Obtener ID de producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Buscar producto
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.querySelector('.container').innerHTML = '<h2 class="text-center text-danger">Producto no encontrado</h2>';
        return;
    }

    // Insertar datos en la página
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `$${product.price} USD`;

    const featuresList = document.getElementById('product-features');
    product.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featuresList.appendChild(li);
    });

    // Configurar botón agregar al carrito
    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.dataset.id = product.id;
    addToCartButton.dataset.name = product.name;
    addToCartButton.dataset.price = product.price;
    addToCartButton.dataset.image = product.image;

    // Escuchar click para agregar al carrito
    addToCartButton.addEventListener('click', () => {
        if (typeof addToCart === 'function') {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        } else {
            console.error('La función addToCart no está definida. Revisa cart.js.');
        }
    });
});
