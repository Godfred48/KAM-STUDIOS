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
      title: "Residential Interior Design",
      description: "Full-service design from concept through installation, including spatial planning, bespoke furnishings, and material specification."
    },
    {
      title: "Space Planning & Renovation",
      description: "Strategic layouts and architectural refinement that enhance flow, proportion, and long-term functionality."
    },
    {
      title: "Custom Furniture & Curation",
      description: "Bespoke furniture, curated lighting, textiles, and art selection tailored to each environment."
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
        <p class="eyebrow">What We Do</p>
        <h2>FULL-SERVICE DESIGN & CURATION</h2>
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
      image: "./images/interior design.webp",
      alt: "Luxury living room interior by KWBN Interiors"
    },
    {
      image: "./images/space planning.webp",
      alt: "Refined dining space with architectural lighting"
    },
    {
      image: "./images/renovation.webp",
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