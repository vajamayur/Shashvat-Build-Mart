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

  const brandSlider = document.querySelector("[data-brand-slider]");
  if (brandSlider) {
    const track = brandSlider.querySelector(".brand-slider-track");
    const slides = [...brandSlider.querySelectorAll(".brand-slide")];
    const dotsContainer = brandSlider.querySelector("[data-slider-dots]");
    const previousButton = brandSlider.querySelector("[data-slider-prev]");
    const nextButton = brandSlider.querySelector("[data-slider-next]");
    let currentIndex = 0;
    let autoplay;

    const visibleSlides = () => {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 760) return 2;
      if (window.innerWidth <= 950) return 3;
      return 4;
    };

    const maxIndex = () => Math.max(0, slides.length - visibleSlides());

    const renderDots = () => {
      dotsContainer.innerHTML = "";
      for (let index = 0; index <= maxIndex(); index += 1) {
        const dot = document.createElement("button");
        dot.className = "slider-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Show brand slide ${index + 1}`);
        dot.addEventListener("click", () => {
          currentIndex = index;
          updateSlider();
          restartAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const updateSlider = () => {
      currentIndex = Math.min(currentIndex, maxIndex());
      const slideWidth = slides[0].getBoundingClientRect().width;
      const slideGap = parseFloat(getComputedStyle(slides[0]).marginRight) * 2;
      track.style.transform = `translateX(-${currentIndex * (slideWidth + slideGap)}px)`;
      [...dotsContainer.children].forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
        dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
      });
    };

    const restartAutoplay = () => {
      window.clearInterval(autoplay);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        autoplay = window.setInterval(() => {
          currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
          updateSlider();
        }, 3500);
      }
    };

    previousButton.addEventListener("click", () => {
      currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
      updateSlider();
      restartAutoplay();
    });
    nextButton.addEventListener("click", () => {
      currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
      updateSlider();
      restartAutoplay();
    });
    brandSlider.addEventListener("mouseenter", () => window.clearInterval(autoplay));
    brandSlider.addEventListener("mouseleave", restartAutoplay);
    brandSlider.addEventListener("focusin", () => window.clearInterval(autoplay));
    brandSlider.addEventListener("focusout", event => {
      if (!brandSlider.contains(event.relatedTarget)) restartAutoplay();
    });
    window.addEventListener("resize", () => {
      renderDots();
      updateSlider();
    });

    renderDots();
    updateSlider();
    restartAutoplay();
  }

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

  const jobForm = document.querySelector("#jobForm");
  if (jobForm) {
    jobForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(jobForm);
      const message = [
        "Hello Shashvat Build Mart,",
        "",
        "Job Application",
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Applying as: ${data.get("applicantType") || ""}`,
        `Job / Work Type: ${data.get("workType") || ""}`,
        `Experience: ${data.get("experience") || ""}`,
        `Current Location: ${data.get("location") || ""}`,
        `Message: ${data.get("message") || ""}`
      ].join("\n");

      const whatsappNumber = "918238847359";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener");
    });
  }
});
