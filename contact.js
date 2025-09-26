// Updated form handler to match your HTML form fields
document.addEventListener("DOMContentLoaded", function () {
  const form =
    document.querySelector("form") ||
    document.querySelector("form[action='#']");

  if (!form) return;
  if (form.hasAttribute("data-handler-attached")) return;
  form.setAttribute("data-handler-attached", "true");

  const responseMessage = document.createElement("div");
  responseMessage.className = "form-response mt-4";
  form.appendChild(responseMessage);

  let isSubmitting = false;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isSubmitting) return;

    const submitButton = form.querySelector('button[type="submit"]');

    isSubmitting = true;
    responseMessage.textContent = "";
    responseMessage.className = "form-response mt-4";

    if (submitButton) {
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      `;
      submitButton.disabled = true;
    }

    // Get form data matching your HTML form structure
    const formData = new FormData(form);
    const data = {
      // Map your form fields to the data structure
      company: formData.get("company") || "",
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      request: formData.get("request") || "", // tour or info
      lease: formData.get("lease") || "", // furnished/unfurnished/undecided
      area: formData.get("area") || "", // Dehradun/Delhi/Other
      newsletter: formData.get("newsletter") === "on",
      privacy: formData.get("privacy") === "on",

      // Add metadata
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || "Direct",
      formType: "inquiry_form",
    };

    try {
      const webAppUrl =
        "https://all-websiteformsdata.offbeatpixels.workers.dev/";

      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();

      if (response.ok && text.includes("success")) {
        form.reset();
        responseMessage.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong> Your inquiry has been submitted successfully. We'll contact you soon.
          </div>
        `;

        // Scroll to message
        responseMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error!</strong> There was a problem submitting your inquiry. Please try again.
        </div>
      `;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Make an Inquiry";
      }
      isSubmitting = false;
    }
  });

  // Enhanced validation for your specific fields
  const validateForm = () => {
    let isValid = true;

    // Required fields validation
    const requiredFields = [
      { name: "company", label: "Company Name" },
      { name: "name", label: "Your Name" },
      { name: "phone", label: "Phone Number" },
      { name: "email", label: "Email Address" },
      { name: "privacy", label: "Privacy Agreement", type: "checkbox" },
    ];

    requiredFields.forEach((field) => {
      const input = form.querySelector(`[name="${field.name}"]`);
      if (!input) return;

      let hasError = false;

      if (field.type === "checkbox") {
        hasError = !input.checked;
      } else {
        hasError = !input.value.trim();
      }

      if (hasError) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }
    });

    // Email validation
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && emailInput.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("border-red-500");
        isValid = false;
      }
    }

    // Phone validation
    const phoneInput = form.querySelector('[name="phone"]');
    if (phoneInput && phoneInput.value) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.classList.add("border-red-500");
        isValid = false;
      }
    }

    return isValid;
  };

  // Real-time validation
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("blur", validateForm);
    input.addEventListener("input", function () {
      if (this.classList.contains("border-red-500")) {
        validateForm();
      }
    });
  });

  // Validate on submit
  form.addEventListener("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault();
      responseMessage.innerHTML = `
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please fill in all required fields correctly.
        </div>
      `;
      responseMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});
