
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
   SERVICES EDITORIAL DATA
========================= */

const servicesEditorial = [
  {
    title: "Residential Interior Design",
    description:
      "A complete design journey from concept development to final installation. We shape environments through spatial discipline, curated materials, bespoke furnishings, and architectural refinement.",
    image: "./images/interior design.webp",
    alt: "Luxury residential interior designed by KWBN Interiors"
  },
  {
    title: "Space Planning",
    description:
      "Intelligent layouts that enhance flow, proportion, and functionality. Every square meter is considered with intention and clarity.",
    image: "./images/space planning.webp",
    alt: "Architectural space planning layout"
  },
  {
    title: "Custom Furniture & Curation",
    description:
      "Bespoke joinery, tailored upholstery, curated art, refined lighting, and layered textiles — every detail composed to complete the environment.",
    image: "./images/custome decor.webp",
    alt: "Custom luxury furniture and decor elements"
  },
  {
    title: "Interior Renovation",
    description:
      "Transformative renovation services that preserve architectural integrity while elevating materiality and spatial experience.",
    image: "./images/renovation.webp",
    alt: "Modern interior renovation project"
  }
];

/* =========================
   BUILD FUNCTION
========================= */

function buildServiceRow(item, index) {
  const reverseClass = index % 2 !== 0 ? "reverse" : "";

  return `
    <div class="service-row ${reverseClass} reveal">
      <div class="service-image">
        <img src="${escapeHtml(item.image)}"
             alt="${escapeHtml(item.alt)}">
      </div>
      <div class="service-text">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </div>
  `;
}

/* =========================
   RENDER FUNCTION
========================= */

function renderServicesEditorial() {
  const root = document.getElementById("services-editorial-root");
  if (!root) return;

  root.innerHTML = `
    <div class="services-editorial">
      ${servicesEditorial.map(buildServiceRow).join("")}
    </div>
  `;
}

/* =========================
   INIT
========================= */

renderServicesEditorial();