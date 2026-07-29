/**
 * KWBN Interiors — Contact Form System
 */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("confirmation-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const confirmBtn = document.getElementById("confirm-btn");
  const toast = document.getElementById("toast-notification");
  const toastMessage = document.getElementById("toast-message");

  /* Stop and report the problem if required HTML is missing. */
  if (
    !form ||
    !modal ||
    !cancelBtn ||
    !confirmBtn ||
    !toast ||
    !toastMessage
  ) {
    console.error("Contact form initialization failed:", {
      form,
      modal,
      cancelBtn,
      confirmBtn,
      toast,
      toastMessage
    });

    return;
  }

  /* Initialize EmailJS. */
  emailjs.init({
    publicKey: "fn1btUB5v56_WpQpl"
  });

  let templateParams = null;
  let toastTimer = null;

  /* =========================
     FORM SUBMISSION
  ========================= */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    /*
     * Runs native HTML validation before opening the modal.
     * This checks required fields and the email format.
     */
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    templateParams = {
      full_name: String(formData.get("full_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      project_type: String(formData.get("project_type") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    toggleModal(true);
  });

  /* =========================
     MODAL CONTROLS
  ========================= */
  function toggleModal(shouldOpen) {
    modal.classList.toggle("active", shouldOpen);
    modal.setAttribute("aria-hidden", String(!shouldOpen));
    document.body.classList.toggle("no-scroll", shouldOpen);

    if (shouldOpen) {
      cancelBtn.focus();
    }
  }

  cancelBtn.addEventListener("click", function () {
    toggleModal(false);
    templateParams = null;
  });

  /* Close the modal when Escape is pressed. */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      toggleModal(false);
      templateParams = null;
    }
  });

  /* =========================
     EMAILJS SUBMISSION
  ========================= */
  confirmBtn.addEventListener("click", async function () {
    if (!templateParams || confirmBtn.disabled) {
      return;
    }

    setLoadingState(true);

    try {
      const response = await emailjs.send(
        "service_p8rwjsq",
        "template_ihb8r6p",
        templateParams
      );

      console.log("EmailJS success:", response);

      toggleModal(false);
      form.reset();
      showToast("Consultation details submitted successfully.");
    } catch (error) {
      console.error("EmailJS full error:", error);
      console.error("EmailJS status:", error?.status);
      console.error("EmailJS message:", error?.text);

      toggleModal(false);

      showToast(
        error?.text ||
          "Your request could not be sent. Please try again."
      );
    } finally {
      setLoadingState(false);
      templateParams = null;
    }
  });

  /* =========================
     TOAST NOTIFICATION
  ========================= */
  function showToast(message) {
    window.clearTimeout(toastTimer);

    toastMessage.textContent = message;
    toast.classList.add("active");

    toastTimer = window.setTimeout(function () {
      toast.classList.remove("active");
    }, 4000);
  }

  /* =========================
     LOADING STATE
  ========================= */
  function setLoadingState(isLoading) {
    confirmBtn.classList.toggle("sending", isLoading);
    confirmBtn.disabled = isLoading;
    cancelBtn.disabled = isLoading;
    confirmBtn.setAttribute("aria-busy", String(isLoading));
  }
});