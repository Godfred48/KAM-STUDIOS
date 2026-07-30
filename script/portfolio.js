/* ==========================================================
   KAM STUDIOS — Portfolio data + renderer
   Add a new project by adding one object to the `works` array.
   category must be one of: "bedroom", "kitchen", "washroom", "hall"
   ========================================================== */

const works = [
  {
  id: "w01",
  title: "Minimalist",
  category: "bedroom",
  image: "./images/portfolio/bed1.webp",
},
{
  id: "w02",
  title: "Modern Luxury",
  category: "kitchen",
  image: "./images/portfolio/kit1.webp",
},
{
  id: "w03",
  title: "Contemporary",
  category: "hall",
  image: "./images/portfolio/hall1.webp",
},
{
  id: "w04",
  title: "Modern Luxury",
  category: "washroom",
  image: "./images/portfolio/wash1.webp",
},
{
  id: "w05",
  title: "Minimalist",
  category: "bedroom",
  image: "./images/portfolio/bed2.webp",
},
{
  id: "w06",
  title: "Modern Luxury",
  category: "kitchen",
  image: "./images/portfolio/bed5.webp",
},
{
  id: "w07",
  title: "Contemporary",
  category: "hall",
  image: "./images/portfolio/hall2.webp",
},
{
  id: "w11",
  title: "Contemporary",
  category: "hall",
  image: "./images/contemporary/con1.webp",
},
{
  id: "w12",
  title: "Contemporary",
  category: "hall",
  image: "./images/contemporary/con3.webp",
},
{
  id: "w13",
  title: "Modern Luxury",
  category: "hall",
  image: "./images/industry/in4.webp",
},
{
  id: "w14",
  title: "Modern Luxury",
  category: "restaurant",
  image: "./images/industry/in1.webp",
},
{
  id: "w15",
  title: "Modern Luxury",
  category: "kitchen",
  image: "./images/industry/in2.webp",
},
{
  id: "w16",
  title: "Modern Luxury",
  category: "restaurant",
  image: "./images/industry/in3.webp",
},
{
  id: "w17",
  title: "Japandi",
  category: "hall",
  image: "./images/maxi/max1.webp",
},
{
  id: "w18",
  title: "Japandi",
  category: "hall",
  image: "./images/maxi/max2.webp",
},
{
  id: "w19",
  title: "Minimalist",
  category: "hall",
  image: "./images/mini/min1.webp",
},
{
  id: "w20",
  title: "Minimalist",
  category: "hall",
  image: "./images/mini/min2.webp",
},
{
  id: "w21",
  title: "Scandinavian",
  category: "bedroom",
  image: "./images/scandi/scan2.webp",
},
{
  id: "w22",
  title: "Scandinavian",
  category: "kitchen",
  image: "./images/scandi/scan1.webp",
},
];         

/* ---------- helpers ---------- */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatLabel(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategories(items) {
  return [...new Set(items.map((item) => item.category))];
}

/* ---------- HTML builders (this is the "HTML embedded in JS" part) ---------- */

function buildHeroHtml() {
  return `
    <section class="portfolio-hero">
      <p class="eyebrow">Our Work</p>
      <h2>Interiors crafted room by room</h2>
      <p>A look through KAM STUDIOS bedroom, kitchen, hall, and washroom projects — each one designed around how the space is actually lived in.</p>
    </section>
  `;
}

function buildFilterBarHtml(categories) {
  const allBtn = `<button class="filter-btn active" data-filter="all">All</button>`;

  const categoryBtns = categories
    .map(
      (cat) =>
        `<button class="filter-btn" data-filter="${escapeHtml(cat)}">${escapeHtml(
          formatLabel(cat)
        )}</button>`
    )
    .join("");

  return `<div class="filter-bar">${allBtn}${categoryBtns}</div>`;
}

function buildCardHtml(item) {
  return `
    <div class="portfolio-card" data-category="${escapeHtml(item.category)}">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="card-overlay">
        <span class="tag">${escapeHtml(formatLabel(item.category))}</span>
        <h3>${escapeHtml(item.title)}</h3>
      </div>
    </div>
  `;
}

function buildGridHtml(items) {
  if (items.length === 0) {
    return `<div class="portfolio-grid"><p class="portfolio-empty">No projects in this category yet.</p></div>`;
  }
  return `<div class="portfolio-grid">${items.map(buildCardHtml).join("")}</div>`;
}

/* ---------- render + filter logic ---------- */

function renderPortfolio(root, items) {
  const categories = getCategories(items);

  root.innerHTML = buildHeroHtml() + buildFilterBarHtml(categories) + buildGridHtml(items);

  attachFilterHandlers(root, items);
}

function attachFilterHandlers(root, items) {
  const filterBar = root.querySelector(".filter-bar");

  filterBar.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    filterBar
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const filtered =
      filter === "all" ? items : items.filter((item) => item.category === filter);

    const gridWrapper = root.querySelector(".portfolio-grid");
    gridWrapper.outerHTML = buildGridHtml(filtered);
  });
}

/* ---------- boot ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("portfolio-root");
  if (root) renderPortfolio(root, works);
});
