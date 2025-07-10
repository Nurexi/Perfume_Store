// Contact Page Specific JavaScript

// Initialize contact page functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeContactPage();
});

function initializeContactPage() {
  initializeContactForm();
  initializeAnimations();
  initializeTooltips();
  initializeParticles();
  initializeScrollAnimations();
}

// Contact Form Functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = contactForm.querySelector(".submit-btn");
  const formSuccess = document.getElementById("form-success");

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate form
    if (!validateForm(data)) {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      return;
    }

    try {
      // Simulate API call (replace with actual endpoint)
      await simulateFormSubmission(data);

      // Show success state
      showFormSuccess();
      contactForm.reset();

      // Show notification toast
      showNotificationToast("Message sent successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      showNotificationToast(
        "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  // Input focus animations
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });

    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add("focused");
    }
  });
}

// Form validation
function validateForm(data) {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push("Please enter a valid full name");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("Please enter a subject");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Please enter a message (at least 10 characters)");
  }

  if (errors.length > 0) {
    showNotificationToast(errors[0], "error");
    return false;
  }

  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Simulate form submission (replace with actual API call)
async function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        resolve({ success: true, message: "Message sent successfully" });
      } else {
        reject(new Error("Network error"));
      }
    }, 2000);
  });
}

// Show form success state
function showFormSuccess() {
  const formSuccess = document.getElementById("form-success");
  const contactForm = document.getElementById("contact-form");

  formSuccess.classList.add("show");
  contactForm.style.display = "none";

  // Hide success message after 5 seconds and show form again
  setTimeout(() => {
    formSuccess.classList.remove("show");
    contactForm.style.display = "block";
  }, 5000);
}

// Show notification toast
function showNotificationToast(message, type = "success") {
  const toast = document.getElementById("notification-toast");
  const icon = toast.querySelector("i");
  const text = toast.querySelector("span");

  // Set message and icon
  text.textContent = message;

  if (type === "error") {
    toast.style.background = "#e74c3c";
    icon.className = "fas fa-exclamation-circle";
  } else {
    toast.style.background = "var(--primary-color)";
    icon.className = "fas fa-check-circle";
  }

  // Show toast
  toast.classList.add("show");

  // Hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Initialize animations
function initializeAnimations() {
  // GSAP animations for enhanced effects
  if (typeof gsap !== "undefined") {
    // Hero section animation
    gsap
      .timeline()
      .from(".contact-hero-content .section-badge", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      })
      .from(
        ".contact-hero-title",
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".contact-hero-description",
        {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Form animation
    gsap.from(".form-container", {
      duration: 1,
      x: -50,
      opacity: 0,
      ease: "power2.out",
      delay: 0.3,
    });

    // Contact info cards animation
    gsap.from(".contact-info-section > *", {
      duration: 0.8,
      x: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.5,
    });
  }

  // Social icons hover animation
  const socialIcons = document.querySelectorAll(".social-icon");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.1) rotate(5deg)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1) rotate(0deg)";
    });
  });

  // Contact items hover animation
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".contact-icon");
      icon.style.transform = "scale(1.1) rotate(5deg)";
    });

    item.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".contact-icon");
      icon.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

// Enhanced hover effects for contact items
function enhanceContactItems() {
  const contactItems = document.querySelectorAll(".contact-item");

  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector(".contact-icon");
      if (typeof gsap !== "undefined" && icon) {
        gsap.to(icon, {
          duration: 0.5,
          scale: 1.1,
          y: -5,
          ease: "back.out(1.7)",
        });
      }
      // Add floating particles
      if (!item.dataset.enhanced) {
        item.dataset.enhanced = "true";
        for (let i = 0; i < 5; i++) {
          createHoverParticle(item);
        }
      }
    });
    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector(".contact-icon");
      if (typeof gsap !== "undefined" && icon) {
        gsap.to(icon, {
          duration: 0.5,
          scale: 1,
          y: 0,
          ease: "back.out(1.7)",
        });
      }
    });
  });
}

function createHoverParticle(parent) {
  const particle = document.createElement("div");
  particle.className = "hover-particle";
  parent.appendChild(particle);
  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  // Random animation
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  if (typeof gsap !== "undefined") {
    gsap.set(particle, {
      left: `${x}%`,
      top: `${y}%`,
      opacity: 0,
    });
    gsap.to(particle, {
      duration: duration,
      delay: delay,
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
      opacity: 1,
      onComplete: () => {
        particle.remove();
        if (parent.matches(":hover")) {
          createHoverParticle(parent);
        }
      },
    });
  }
}

// Enhanced click effects for call and email links
function enhanceClickEffects() {
  const callLinks = document.querySelectorAll(".call-link");
  const emailLinks = document.querySelectorAll(".email-link");

  callLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      createRippleEffect(e.target, "#4CAF50");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    });
  });

  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      createRippleEffect(e.target, "#2196F3");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    });
  });
}

function createRippleEffect(element, color) {
  const ripple = document.createElement("div");
  ripple.className = "ripple-effect";
  element.appendChild(ripple);
  if (typeof gsap !== "undefined") {
    gsap.set(ripple, {
      position: "absolute",
      background: color,
      borderRadius: "50%",
      transform: "scale(0)",
      opacity: 0.6,
      zIndex: 0,
    });
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    gsap.to(ripple, {
      duration: 0.8,
      width: size,
      height: size,
      x: -size / 2,
      y: -size / 2,
      opacity: 0,
      scale: 1,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  }
}

// Initialize all enhancements
document.addEventListener("DOMContentLoaded", () => {
  enhanceContactItems();
  enhanceClickEffects();
  // Add floating perfume bottles if not already in HTML
  if (!document.querySelector(".floating-perfume")) {
    const floatingContainer = document.querySelector(
      ".contact-hero-bg .floating-elements"
    );
    if (floatingContainer) {
      for (let i = 1; i <= 3; i++) {
        const perfume = document.createElement("div");
        perfume.className = `floating-perfume floating-perfume-${i}`;
        floatingContainer.appendChild(perfume);
      }
    }
  }
});

// Initialize tooltips
function initializeTooltips() {
  const socialIcons = document.querySelectorAll(".social-icon[data-tooltip]");

  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      const tooltip = this.getAttribute("data-tooltip");
      if (tooltip) {
        this.setAttribute("title", tooltip);
      }
    });
  });
}

// Initialize particles for contact page
function initializeParticles() {
  const particlesContainer = document.getElementById("contact-particles");
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createContactParticle(particlesContainer);
  }
}

function createContactParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 6 + 4;
  const delay = Math.random() * 4;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.opacity = Math.random() * 0.4 + 0.1;
  particle.style.background = "var(--primary-color)";

  container.appendChild(particle);
}

// Initialize scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Special animation for contact items
        if (entry.target.classList.contains("contact-item")) {
          const delay =
            Array.from(entry.target.parentElement.children).indexOf(
              entry.target
            ) * 100;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, delay);
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    ".contact-info-card, .social-media-card, .quick-support-card, .contact-item, .map-container"
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Success modal functions
function closeSuccessModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("show");
}

// Phone number click handler for mobile
document.addEventListener("DOMContentLoaded", function () {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });
});

// Email links click handler
document.addEventListener("DOMContentLoaded", function () {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });
});

// WhatsApp link with pre-filled message
function initializeWhatsAppLink() {
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn");
  whatsappBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const message = encodeURIComponent(
        "Hello Odore Perla, I need help with..."
      );
      const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  });
}

// Initialize WhatsApp functionality
document.addEventListener("DOMContentLoaded", initializeWhatsAppLink);

// Form field character counter (optional enhancement)
function addCharacterCounter() {
  const messageField = document.getElementById("message");
  if (!messageField) return;

  const counter = document.createElement("div");
  counter.className = "character-counter";
  counter.style.cssText = `
        text-align: right;
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 0.5rem;
    `;

  messageField.parentElement.appendChild(counter);

  function updateCounter() {
    const length = messageField.value.length;
    const maxLength = 500;
    counter.textContent = `${length}/${maxLength}`;

    if (length > maxLength * 0.9) {
      counter.style.color = "#e74c3c";
    } else {
      counter.style.color = "var(--text-secondary)";
    }
  }

  messageField.addEventListener("input", updateCounter);
  updateCounter();
}

// Initialize character counter
document.addEventListener("DOMContentLoaded", addCharacterCounter);

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Enhanced form validation with real-time feedback
function initializeRealTimeValidation() {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      // Clear error state on input
      this.classList.remove("error");
      const errorMsg = this.parentElement.querySelector(".error-message");
      if (errorMsg) {
        errorMsg.remove();
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  switch (field.type) {
    case "email":
      if (!isValidEmail(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;
    case "text":
      if (field.name === "fullName" && value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters";
      } else if (field.name === "subject" && value.length < 3) {
        isValid = false;
        errorMessage = "Subject must be at least 3 characters";
      }
      break;
    case "textarea":
      if (value.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters";
      }
      break;
  }

  if (!isValid) {
    field.classList.add("error");
    showFieldError(field, errorMessage);
  } else {
    field.classList.remove("error");
    removeFieldError(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  removeFieldError(field); // Remove existing error first

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    `;

  field.parentElement.appendChild(errorDiv);
}

function removeFieldError(field) {
  const errorMsg = field.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

// Initialize real-time validation
document.addEventListener("DOMContentLoaded", initializeRealTimeValidation);

// Add CSS for error states
const errorStyles = `
    .input-container input.error,
    .input-container textarea.error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    }
`;

// Inject error styles
const styleSheet = document.createElement("style");
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Accessibility improvements
function initializeAccessibility() {
  // Add ARIA labels and descriptions
  const form = document.getElementById("contact-form");
  form.setAttribute("aria-label", "Contact form");

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    const label = input.parentElement.querySelector(".floating-label");
    if (label) {
      const labelText = label.textContent.trim();
      input.setAttribute("aria-label", labelText);
    }
  });

  // Add keyboard navigation for social icons
  const socialIcons = document.querySelectorAll(".social-icon");
  socialIcons.forEach((icon) => {
    icon.setAttribute("tabindex", "0");
    icon.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initializeAccessibility);

// Performance optimization - Lazy load map
function initializeLazyMap() {
  const mapContainer = document.querySelector(".map-wrapper");
  if (!mapContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target.querySelector("iframe");
          if (iframe && !iframe.src.includes("maps")) {
            // Map is already loaded, just add loading animation
            iframe.style.opacity = "0";
            iframe.style.transition = "opacity 0.5s ease";
            setTimeout(() => {
              iframe.style.opacity = "1";
            }, 100);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(mapContainer);
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", initializeLazyMap);
