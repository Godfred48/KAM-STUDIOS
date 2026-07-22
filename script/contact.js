/**
 * KWBN Interiors — Contact Form System Implementation
 * 
 * DESIGN CONCEPTS USED:
 * - Event Interception: Hijacking submit to show the confirmation step.
 * - State Handlers: Toggling classes instead of writing style overrides directly in JS.
 * - Double-Submission Guard: Toggling pointer events during networks requests.
 */

document.addEventListener("DOMContentLoaded", function () {

  // Initialize EmailJS with your Public Key
  // REPLACE "YOUR_PUBLIC_KEY" with the exact string from your EmailJS account dashboard.
  emailjs.init("YOUR_PUBLIC_KEY");

  // DOM Node Selectors
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("confirmation-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const confirmBtn = document.getElementById("confirm-btn");
  const toast = document.getElementById("toast-notification");
  const toastMessage = document.getElementById("toast-message");

  // Global scope placeholder to reference captured form input values
  let templateParams = null;

  /* ==========================================================================
     FORM INTERCEPTION PIPELINE
     ========================================================================== */
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop standard browser submission/refresh

    // Map form inputs to dynamic template keys
    templateParams = {
      full_name: form.querySelector('input[name="full_name"]').value,
      email: form.querySelector('input[name="email"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      project_type: form.querySelector('select[name="project_type"]').value,
      location: form.querySelector('input[name="location"]').value,
      message: form.querySelector('textarea[name="message"]').value
    };

    // Open confirmation overlay
    toggleModal(true);
  });

  /* ==========================================================================
     UI MODAL CONTROL CONTROLLER
     ========================================================================== */
  function toggleModal(shouldOpen) {
    if (shouldOpen) {
      modal.classList.add("active");
      document.body.classList.add("no-scroll"); // Lock scrolling to keep context focused
    } else {
      modal.classList.remove("active");
      document.body.classList.remove("no-scroll"); // Release scrolling restriction
    }
  }

  // Cancel Action
  cancelBtn.addEventListener("click", function () {
    toggleModal(false);
    templateParams = null; // Clean out staging state memory
  });

  /* ==========================================================================
     TRANSMISSION PIPELINE (EmailJS Integration)
     ========================================================================== */
  confirmBtn.addEventListener("click", function () {
    if (!templateParams) return;

    // Set layout into sending state
    setLoadingState(true);

    // REPLACE "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your real EmailJS values.
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
      .then(function (response) {
        // Success Handler
        toggleModal(false);
        form.reset(); // Clear all inputs
        showToast("Consultation details submitted successfully.", true);
      })
      .catch(function (error) {
        // Error Handler
        console.error("Transmission Error:", error);
        toggleModal(false);
        showToast("Transmission failed. Please check network connection.", false);
      })
      .finally(function () {
        // Always reset loading UI states
        setLoadingState(false);
        templateParams = null; // Flush data state
      });
  });

  /* ==========================================================================
     PREMIUM TOAST TO REPLACE PRIMITIVE BROWSER ALERTS
     ========================================================================== */
  function showToast(message, isSuccess) {
    toastMessage.textContent = message;
    
    // Style adjustments depending on status
    if (isSuccess) {
      toast.style.borderLeftColor = "var(--gold)";
    } else {
      toast.style.borderLeftColor = "#902e2e"; // Muted Red for failure warning
    }

    toast.classList.add("active");

    // Display for exactly 4 seconds, then slide away
    setTimeout(function () {
      toast.classList.remove("active");
    }, 4000);
  }

  /* ==========================================================================
     SUBMIT MULTIPLY DEFENSE MECHANISM
     ========================================================================== */
  function setLoadingState(isLoading) {
    if (isLoading) {
      confirmBtn.classList.add("sending");
      confirmBtn.disabled = true;
      cancelBtn.disabled = true;
    } else {
      confirmBtn.classList.remove("sending");
      confirmBtn.disabled = false;
      cancelBtn.disabled = false;
    }
  }

});