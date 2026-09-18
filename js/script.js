document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mainNav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const backTop = document.querySelector("#backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 450);
    });
    backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
  }

  const revealItems = document.querySelectorAll(
    "main .eyebrow, main h1, main h2, main h3, main h4, main p, main .btn, main .text-link, main li, main figcaption, main label, main .category-card, main .product-card, main .service-card, main .service-detail, main .value-card, main .gallery-placeholder, main .image-card, main .quote-box, main .contact-item"
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(items => {
      items.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
          revealObserver.unobserve(item.target);
        }
      });
    }, {threshold: 0.12});

    revealItems.forEach((item, index) => {
      item.classList.add("reveal");
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
      revealObserver.observe(item);
    });
  }

  // Static product category filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      products.forEach(product => {
        product.classList.toggle(
          "hide",
          filter !== "all" && product.dataset.category !== filter
        );
      });
    });
  });

  // Static quote form: opens WhatsApp instead of sending data to a backend.
  const quoteForm = document.querySelector("#quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(quoteForm);
      const message = [
        "Hello શાશ્વત Build Mart,",
        "",
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Product / Material: ${data.get("product") || ""}`,
        `Quantity: ${data.get("quantity") || ""}`,
        `Location: ${data.get("location") || ""}`,
        `Message: ${data.get("message") || ""}`
      ].join("\n");

      const whatsappNumber = "918238847359";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener");
    });
  }
});
