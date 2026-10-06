document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ESCAPE HELPER
  ========================= */
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (match) {
      const escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return escape[match];
    });
  }

  /* =========================
     SERVICES DATA
  ========================= */
  const services = [
    {
      title: "FUNCTION",
      description: "Every element should have a purpose. We design modern spaces that are luxurious while remaining functional and comfortable."
    },
    {
      title: "CHARACTER",
      description: "A space should feel personal. We translate our client’s personality, lifestyle and aspirations into the design."
    },
    {
      title: "SIMPLICITY",
      description: "The smallest details often make the biggest difference—from lighting and textures to furniture placement and material combinations.",
    },
    {
      title: "DETAIL",
      description: "The smallest details often make the biggest difference—from lighting and textures to furniture placement and material combinations.",

    }
  ];

  function buildServiceHtml(item) {
    return `
      <div class="service-card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    `;
  }

  function renderServices() {
    const root = document.getElementById("services-root");
    if (!root) return;

    root.innerHTML = `
      <div class="section-inner">
        <p class="eyebrow">OUR PHILOSOPHY</p>
        <h2>DESIGNING BERYOND APPEARANCE</h2>
        <div class="services-grid">
          ${services.map(buildServiceHtml).join("")}
        </div>
      </div>
    `;
  }

  /* =========================
     PORTFOLIO DATA
  ========================= */
  const portfolio = [
    {
      image: "../images/portfolio/bed2.webp",
      alt: "Luxury living room interior by KWBN Interiors"
    },
    {
      image: "../images/portfolio/bed5.webp",
      alt: "Refined dining space with architectural lighting"
    },
    {
      image: "../images/portfolio/bed7.webp",
      alt: "Modern residential renovation project"
    }
  ];

  function buildPortfolioHtml(item) {
    return `
      <div class="portfolio-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}">
      </div>
    `;
  }

  function renderPortfolio() {
    const root = document.getElementById("portfolio-root");
    if (!root) return;

    root.innerHTML = `
      <div class="section-inner">
        <p class="eyebrow">Selected Work</p>
        <h2>SPACES THAT SPEAK WITHOUT RAISING THEIR VOICE</h2>
        <div class="portfolio-grid">
          ${portfolio.map(buildPortfolioHtml).join("")}
        </div>
      </div>
    `;
  }

  renderServices();
  renderPortfolio();
});


/* =========================
   SCROLL REVEAL LOGIC
========================= */
function handleScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
handleScrollReveal();