document.addEventListener("DOMContentLoaded", () => {

  const products = document.querySelectorAll(".product-card");
  const categoryLinks = document.querySelectorAll("#category-filter a");

  function filterProducts(category) {
    products.forEach(product => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  // 👉 CLICK en categorías (sidebar)
  categoryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const category = link.dataset.filter;
      filterProducts(category);
    });
  });

  // 👉 FILTRO DESDE URL (footer)
  const params = new URLSearchParams(window.location.search);
  const categoryFromUrl = params.get("category");

  if (categoryFromUrl) {
    filterProducts(categoryFromUrl);
  }

});