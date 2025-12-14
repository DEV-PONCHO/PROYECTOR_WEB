document.addEventListener("DOMContentLoaded", () => {

  // HEADER
  fetch("assets/partials/header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("header");
      if (header) header.innerHTML = html;
    });

  // FOOTER
  fetch("assets/partials/footer.html")
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = html;
    });

});
