/* =========================================================
   PORTFOLIO DATA – edit text and image links here only.
   portfolio.js reads this and builds the tabs + project pages.

   IMAGES: every "src" below is a placeholder using pictures that
   already exist on your site. Replace each one with the real photo.
   Add or remove items in `gallery` freely (keep `layout` in mind).

   layout:
     "trio"  → 1 large image + 2 stacked   (best with 3 images)
     "hero"  → 1 dominant image + 2 smaller (best with 3 images)
     "duo"   → 2 images side by side        (best with 2 images)
========================================================= */

const PORTFOLIO_PROJECTS = [

  /* ---------------- PROJECT 01 ---------------- */
  {
    id: "modern-luxury-residence",
    number: "01",
    title: "Modern Luxury Residence",

    meta: [
      { label: "Location", value: "Accra, Ghana" },
      { label: "Project Type", value: "Residential" },
      { label: "Style", value: "Modern Luxury / Minimalist" }
    ],

    concept: [
      "A contemporary residential environment designed around warmth, simplicity and sophistication.",
      "The space combines neutral tones, architectural wall treatments, layered lighting and carefully selected furnishings to create an interior that feels luxurious without becoming excessive."
    ],

    focus: [
      "Living room",
      "TV wall",
      "Dining area",
      "Lighting",
      "Custom architectural details",
      "Furniture styling"
    ],

    layout: "trio",
    gallery: [
      { src: "./images/New pictures/im5.webp",alt: "Living room of the Modern Luxury Residence",        caption: "Living room" },
      { src: "./images/New pictures/im6.webp", alt: "TV wall with architectural panelling and lighting", caption: "TV wall" },
      { src: "./images/New pictures/im7.webp", alt: "Dining area with layered lighting",                 caption: "Couch" }
    ],

    /* PAGE 08 – close-up details (optional: delete this block if a project has none) */
    details: {
      heading: "Designed in the Details",
      image: { src: "./images/New pictures/im13.webp", alt: "Close-up of materials and lighting in the Modern Luxury Residence", caption: "Close-up" },
      paletteTitle: "Material Palette",
      palette: [
        { name: "Natural wood",             color: "#8a6a49" },
        { name: "Warm beige",               color: "#cdb99a" },
        { name: "Stone",                    color: "#9b958c" },
        { name: "Black accents",            color: "#141414" },
        { name: "Brushed metallic details", color: "#b8a478" },
        { name: "Soft textiles",            color: "#e7ddcd" }
      ],
      notes: [
        { title: "Lighting",
          text: "Layered ambient lighting creates depth while highlighting architectural features." },
        { title: "Furniture",
          text: "Clean silhouettes were selected to maintain the minimalist character of the space while introducing comfort and sophistication." },
        { title: "Architectural Elements",
          text: "Wall panels, ceiling details and integrated lighting create visual structure and personality." }
      ]
    }
  },

  /* ---------------- PROJECT 02 ---------------- */
  {
    id: "contemporary-apartment",
    number: "02",
    title: "Contemporary Apartment",

    meta: [
      { label: "Location", value: "Aburi" },
      { label: "Project Type", value: "Residential" },
      { label: "Style", value: "Contemporary Minimalism" }
    ],

    concept: [
      "Designed for modern living, this apartment balances functionality with a refined aesthetic.",
      "The design focuses on maximizing available space while using carefully selected textures, furniture and lighting to create an environment that feels open, elegant and comfortable."
    ],

    focus: [
      "Space optimization",
      "Living area",
      "Bedroom",
      "TV feature wall",
      "Storage",
      "Ambient lighting"
    ],

    layout: "hero",
    gallery: [
      { src: "./images/New pictures/im1.webp", alt: "Open living area of the Contemporary Apartment", caption: "Living area" },
      { src: "./images/New pictures/im10.webp",      alt: "Bedroom with ambient lighting",                 caption: "Bedroom" },
      { src: "./images/New pictures/im9.webp",      alt: "TV feature wall and storage",                   caption: "TV feature wall" }
    ]
  },

  /* ---------------- PROJECT 03 ---------------- */
  {
    id: "executive-commercial-space",
    number: "03",
    title: "Executive Commercial Space",

    meta: [
      { label: "Project Type", value: "Commercial" },
      { label: "Style", value: "Contemporary / Luxury" }
    ],

    concept: [
      "An elevated commercial environment designed to communicate professionalism, confidence and sophistication.",
      "The interior combines clean architectural forms with a restrained material palette, creating a space that feels premium while remaining functional for everyday use."
    ],

    focus: [
      "Reception",
      "Waiting area",
      "Workspaces",
      "Lighting",
      "Branding integration",
      "Furniture selection"
    ],

    layout: "duo",
    gallery: [
      { src: "./images/New pictures/im11.webp", alt: "Reception of the Executive Commercial Space", caption: "Reception" },
      { src: "./images/New pictures/im12.webp",     alt: "Waiting area and workspaces",                 caption: "Workspace" }
    ]
  }

];
