/* =========================================================
   PORTFOLIO – builds the tabs and project pages from
   PORTFOLIO_PROJECTS (portfolio-data.js must load first).
========================================================= */
(function () {
  const projects = PORTFOLIO_PROJECTS;
  const tabsEl = document.getElementById("pf-tabs");
  const panel = document.getElementById("pf-panel");
  const stage = document.getElementById("pf-stage");
  const lightbox = document.getElementById("pf-lightbox");
  if (!projects || !tabsEl || !panel) return;

  let activeId = null;

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");

  function splitTitle(title) {
    const words = title.trim().split(/\s+/);
    const last = words.pop();
    return [words.join(" "), last];
  }

  /* ---------- HTML builders ---------- */
  function shotHtml(img, index, extraClass) {
    return `
      <figure class="pf-shot pf-r ${extraClass || ""}" style="--i:${index}"
              data-full="${esc(img.src)}" data-alt="${esc(img.alt || "")}">
        <img src="${esc(img.src)}" alt="${esc(img.alt || "")}" loading="lazy">
        <figcaption><span>${pad(index + 1)}</span>${esc(img.caption || "View")}</figcaption>
      </figure>`;
  }

  function headHtml(p) {
    const [line1, line2] = splitTitle(p.title);
    return `
      <section class="pf-head">
        <div class="pf-wrap">
          <span class="pf-ghost" aria-hidden="true">${esc(p.number)}</span>
          <p class="eyebrow pf-r">Project ${esc(p.number)}</p>
          <h2 class="pf-title">
            <span class="ln"><span style="--d:.1s">${esc(line1)}</span></span>
            <span class="ln gold"><span style="--d:.3s">${esc(line2)}</span></span>
          </h2>
          <dl class="pf-meta">
            ${p.meta.map((m, k) => `
              <div class="pf-r" style="--i:${k + 1}"><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("")}
          </dl>
        </div>
      </section>`;
  }

  function conceptHtml(p) {
    return `
      <section class="pf-concept">
        <div class="pf-wrap pf-concept-grid">
          <div class="pf-concept-text pf-r">
            <p class="eyebrow">The Concept</p>
            <div class="gold-divider pf-rule"></div>
            ${p.concept.map((t) => `<p>${esc(t)}</p>`).join("")}
          </div>
          <div class="pf-focus pf-r" style="--i:1">
            <p class="eyebrow">Design Focus</p>
            <ul>
              ${p.focus.map((f, k) => `<li style="--k:${k}"><span>${pad(k + 1)}</span>${esc(f)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>`;
  }

  function galleryHtml(p) {
    return `
      <section class="pf-gallery-section">
        <div class="pf-wrap">
          <div class="pf-gallery layout-${esc(p.layout || "trio")}">
            ${p.gallery.map((g, k) => shotHtml(g, k)).join("")}
          </div>
        </div>
      </section>`;
  }

  function detailsHtml(p) {
    const d = p.details;
    if (!d) return "";
    return `
      <section class="pf-details">
        <div class="pf-wrap">
          <header class="pf-details-head pf-r">
            <p class="eyebrow">Project ${esc(p.number)} — Details</p>
            <h3>${esc(d.heading)}</h3>
            <div class="gold-divider pf-rule"></div>
          </header>
          <div class="pf-details-grid">
            ${shotHtml(d.image, 0, "pf-detail-img")}
            <div class="pf-detail-body">
              <h4 class="pf-sub pf-r">${esc(d.paletteTitle || "Material Palette")}</h4>
              <ul class="pf-palette pf-r">
                ${d.palette.map((c, k) => `
                  <li style="--k:${k}"><span class="sw" style="--c:${esc(c.color)}"></span>${esc(c.name)}</li>`).join("")}
              </ul>
              <div class="pf-notes">
                ${d.notes.map((n, k) => `
                  <article class="pf-note pf-r" style="--i:${k}">
                    <h4>${esc(n.title)}</h4>
                    <p>${esc(n.text)}</p>
                  </article>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  function nextHtml(index) {
    const isLast = index === projects.length - 1;
    const next = projects[isLast ? 0 : index + 1];
    return `
      <section class="pf-next">
        <div class="pf-wrap pf-r">
          <button class="pf-next-btn" type="button" data-id="${esc(next.id)}">
            <span class="pf-next-text">
              <span class="pf-next-label">${isLast ? "Back to the Beginning" : "Next Project"} — ${esc(next.number)}</span>
              <span class="pf-next-title">${esc(next.title)}</span>
            </span>
            <span class="pf-next-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>`;
  }

  function panelHtml(p, index) {
    return headHtml(p) + conceptHtml(p) + galleryHtml(p) + detailsHtml(p) + nextHtml(index);
  }

  /* ---------- tabs ---------- */
  function buildTabs() {
    tabsEl.innerHTML =
      projects.map((p) => `
        <button class="pf-tab" role="tab" type="button" id="tab-${esc(p.id)}"
                aria-selected="false" aria-controls="pf-panel" tabindex="-1" data-id="${esc(p.id)}">
          <span class="pf-tab-no">${esc(p.number)}</span>
          <span class="pf-tab-name">${esc(p.title)}</span>
        </button>`).join("") +
      '<span class="pf-indicator" aria-hidden="true"></span>';
  }

  function updateTabs(index) {
    const tabs = tabsEl.querySelectorAll(".pf-tab");
    const indicator = tabsEl.querySelector(".pf-indicator");
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    const tab = tabs[index];
    indicator.style.width = tab.offsetWidth + "px";
    indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
    tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  /* ---------- scroll-in reveals ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  function afterRender() {
    panel.querySelectorAll(".pf-r").forEach((el) => io.observe(el));
    panel.querySelectorAll(".pf-shot img").forEach((img) => {
      const miss = () => img.closest(".pf-shot").classList.add("is-missing");
      img.addEventListener("error", miss);
      if (img.complete && img.naturalWidth === 0) miss();
    });
  }

  /* ---------- switch project ---------- */
  function show(id, opts) {
    const o = Object.assign({ push: true, scroll: true }, opts);
    const index = projects.findIndex((p) => p.id === id);
    if (index < 0 || id === activeId) return;

    const first = activeId === null;
    activeId = id;
    updateTabs(index);
    panel.setAttribute("aria-labelledby", "tab-" + id);
    if (o.push) history.replaceState(null, "", "#" + id);

    const swap = () => {
      panel.innerHTML = panelHtml(projects[index], index);
      panel.classList.remove("is-leaving");
      afterRender();
    };

    if (first) { swap(); return; }

    panel.classList.add("is-leaving");
    if (o.scroll) {
      const top = stage.getBoundingClientRect().top + window.scrollY - 170;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    }
    setTimeout(swap, 380);
  }

  /* ---------- events ---------- */
  tabsEl.addEventListener("click", (e) => {
    const tab = e.target.closest(".pf-tab");
    if (tab) show(tab.dataset.id);
  });

  tabsEl.addEventListener("keydown", (e) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = projects.findIndex((p) => p.id === activeId);
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % projects.length;
    if (e.key === "ArrowLeft") n = (i - 1 + projects.length) % projects.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = projects.length - 1;
    show(projects[n].id, { scroll: false });
    tabsEl.querySelectorAll(".pf-tab")[n].focus();
  });

  panel.addEventListener("click", (e) => {
    const next = e.target.closest(".pf-next-btn");
    if (next) { show(next.dataset.id); return; }

    const shot = e.target.closest(".pf-shot");
    if (shot && !shot.classList.contains("is-missing")) openLightbox(shot);
  });

  window.addEventListener("hashchange", () => show(location.hash.slice(1), { push: false }));
  window.addEventListener("resize", () => {
    const i = projects.findIndex((p) => p.id === activeId);
    if (i >= 0) updateTabs(i);
  });

  /* ---------- lightbox ---------- */
  function openLightbox(shot) {
    if (!lightbox) return;
    lightbox.querySelector("img").src = shot.dataset.full;
    lightbox.querySelector("img").alt = shot.dataset.alt;
    lightbox.querySelector(".pf-lb-cap").textContent = shot.dataset.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".pf-lb-close")) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- start ---------- */
  buildTabs();
  const wanted = projects.some((p) => p.id === location.hash.slice(1)) ? location.hash.slice(1) : projects[0].id;
  show(wanted, { push: false, scroll: false });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const i = projects.findIndex((p) => p.id === activeId);
      if (i >= 0) updateTabs(i);
    });
  }
})();
