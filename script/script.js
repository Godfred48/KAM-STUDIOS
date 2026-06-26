const heroContent = [
  {
    title: "Timeless Luxury, Designed for Living",
    subtitle: "Transforming spaces into masterpieces of elegance and comfort."
  },
  {
    title: "Where Sophistication Meets Craftsmanship",
    subtitle: "Creating bespoke interiors that reflect your unique lifestyle."
  },
  {
    title: "Elevating Interiors Beyond Expectations",
    subtitle: "Experience refined design tailored to inspire and impress."
  }
];

const title = document.getElementById("hero-title");
const subtitle = document.getElementById("hero-subtitle");

let current = 0;

// initial pop-in
function popIn() {
  title.classList.add("pop-in");
  subtitle.classList.add("pop-in");
}

// pop-out
function popOut() {
  title.classList.remove("pop-in");
  subtitle.classList.remove("pop-in");

  title.classList.add("pop-out");
  subtitle.classList.add("pop-out");
}

// reset for next entry
function resetAndChangeText() {
  current = (current + 1) % heroContent.length;

  title.textContent = heroContent[current].title;
  subtitle.textContent = heroContent[current].subtitle;

  title.classList.remove("pop-out");
  subtitle.classList.remove("pop-out");

  void title.offsetWidth; // force refresh

  popIn();
}

// initial state
title.textContent = heroContent[0].title;
subtitle.textContent = heroContent[0].subtitle;
popIn();

// cycle
setInterval(() => {

  popOut();

  setTimeout(() => {
    resetAndChangeText();
  }, 100); // match popOut duration

}, 4000);


// Js codde that observers the screen to see if 
// the service component shows to trigger the css meant for it


