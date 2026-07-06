const testimonials = [
  {
    name: "Amara Osei",
    role: "Homeowner, Accra",
    text: "KAM Studios completely transformed our living space. Every detail was intentional, every material chosen with care. The result was beyond what we imagined.",
    image: "./images/testimonials/amara.webp"
  },
  {
    name: "James Mensah",
    role: "CEO, Mensah Properties",
    text: "Professional, precise, and truly luxurious. They understood our brand and translated it into a workspace that impresses every client who walks through the door.",
    image: "./images/testimonials/james.webp"
  },
  {
    name: "Serwa Boateng",
    role: "Interior Enthusiast, London",
    text: "From concept to completion the experience was seamless. KAM Studios doesn't just design rooms — they craft experiences you live inside every day.",
    image: "./images/testimonials/serwa.webp"
  },
  {
    name: "Kofi Agyeman",
    role: "Restaurant Owner, Kumasi",
    text: "Our restaurant went from ordinary to extraordinary. Guests constantly compliment the atmosphere. KAM Studios gave our brand a soul.",
    image: "./images/testimonials/kofi.webp"
  }
];

function renderTestimonials() {
  const section = document.getElementById('testimonials');

  // Build the heading
  const heading = `
    <div class="testimonial-heading">
      <p class="testimonial-eyebrow">Client Words</p>
      <h2>What Our Clients <em>Say</em></h2>
      <div class="testimonial-rule"></div>
    </div>
  `;

  const cards = testimonials.map(t => `
  <div class="testimonial-card">
    <div class="quote-mark">&ldquo;</div>
    <p class="testimonial-text">${t.text}</p>
    <div class="testimonial-author">

      <div class="author-avatar">
        <img src="${t.image}" alt="${t.name}" loading="lazy">
      </div>

      <div class="author-info">
        <span class="author-name">${t.name}</span>
        <span class="author-role">${t.role}</span>
      </div>
    </div>
  </div>
`).join('');


// Inject everything into the section
  section.innerHTML = `
    ${heading}
    <div class="testimonial-grid">
      ${cards}
    </div>
  `;
}


// Run when the page is ready
document.addEventListener('DOMContentLoaded', renderTestimonials);