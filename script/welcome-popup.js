// KWBN Interiors – welcome popup (shows once per day)
// Load with: <script src="./script/welcome-popup.js" defer></script>

const popup = document.getElementById("welcome-popup");
const closeBtn = document.getElementById("welcome-close");
const skipBtn = document.getElementById("welcome-skip");

const STORAGE_KEY = "kwbnLastWelcome";

function openPopup() {
  popup.classList.add("is-open");
  popup.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closePopup() {
  popup.classList.remove("is-open");
  popup.setAttribute("aria-hidden", "true");
}

function checkFirstVisitToday() {
  const today = new Date().toDateString(); // e.g. "Mon Oct 05 2026"
  let lastVisit = null;

  try {
    lastVisit = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    // storage blocked (private mode etc.) – just show the popup
  }

  if (lastVisit !== today) {
    setTimeout(openPopup, 600); // let the page appear first

    try {
      localStorage.setItem(STORAGE_KEY, today);
    } catch (error) {}
  }
}

// Close button and "Continue browsing"
closeBtn.addEventListener("click", closePopup);
skipBtn.addEventListener("click", closePopup);

// Click on the dark area outside the box
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

// Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.classList.contains("is-open")) closePopup();
});

checkFirstVisitToday();
