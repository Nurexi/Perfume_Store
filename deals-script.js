// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentTheme = localStorage.getItem("theme") || "light";
const countdownTimers = [];
const viewerCounts = {};

// Enhanced Product Data with proper image mapping
const products = {
  "chanel-chance": {
    id: "chanel-chance",
    name: "Chanel Chance Eau Tendre",
    price: 54,
    originalPrice: 135,
    image:
      "Демонстрация Вашего парфюма на фоне мха и леса _ создано в нейрофото.jpg",
    description: "Fresh floral with notes of grapefruit, quince, and jasmine",
    rating: 4.8,
    category: "women",
  },
  "dior-sauvage": {
    id: "dior-sauvage",
    name: "Dior Sauvage",
    price: 70,
    originalPrice: 128,
    image: "opim.jpg",
    description: "Fresh spicy with bergamot, ambroxan, and pepper",
    rating: 4.9,
    category: "men",
  },
  "tom-ford-orchid": {
    id: "tom-ford-orchid",
    name: "Tom Ford Black Orchid",
    price: 107,
    originalPrice: 165,
    image: "духи_парфюм_идея инфографики_карточка товара(1).jpg",
    description:
      "Sensual blend of black truffle, ylang-ylang, and dark vanilla",
    rating: 5.0,
    category: "luxury",
  },
  "mfk-baccarat": {
    id: "mfk-baccarat",
    name: "MFK Baccarat Rouge 540",
    price: 146,
    originalPrice: 325,
    image: "perfume.jpg",
    description: "Amber floral with jasmine, saffron, and ambergris",
    rating: 5.0,
    category: "luxury",
  },
};

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const dealAlert = document.getElementById("deal-alert");
const alertClose = document.getElementById("alert-close");
const floatingDeal = document.getElementById("floating-deal");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  // Hide loading screen
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 600);
  }, 2000);

  // Set initial theme
  setTheme(currentTheme);

  // Initialize components
  initializeNavigation();
  initializeParticles();
  initializeScrollAnimations();
  initializeCountdowns();
  initializeFilters();
  initializeCart();
  initializeCoupons();
  initializeViewerCounts();
  initializeFloatingButton();
  initializeDealAlert();

  // Update cart display
  updateCartDisplay();

  // Initialize parallax effect for hero section
  initializeParallax();
  // Initialize hover animations
  initializeHoverEffects();
}

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      if (currentTheme === "dark") {
        header.style.background = "rgba(15, 15, 15, 0.98)";
      }
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      if (currentTheme === "dark") {
        header.style.background = "rgba(15, 15, 15, 0.95)";
      }
    }
  });
}

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = themeToggle?.querySelector("i");
  if (icon) {
    if (theme === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }
}

// Particles Animation
function initializeParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  if (particlesContainer) {
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 4 + 4;
  const delay = Math.random() * 3;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.opacity = Math.random() * 0.3 + 0.1;

  container.appendChild(particle);
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Add scroll animation class to elements
  const animateElements = document.querySelectorAll(
    ".flash-deal-card, .bundle-card, .seasonal-card, .scratch-coupon, .hover-coupon, .click-coupon"
  );
  animateElements.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
}

// Countdown Timers
function initializeCountdowns() {
  const countdowns = document.querySelectorAll(".countdown");
  const headerCountdown = document.getElementById("header-countdown");
  const dailyCountdown = document.getElementById("daily-countdown");

  // Initialize flash deal countdowns
  countdowns.forEach((countdown) => {
    const endTime = countdown.getAttribute("data-end-time");
    if (endTime) {
      startCountdown(countdown, new Date(endTime));
    } else {
      // Default to 24 hours from now
      const defaultEndTime = new Date();
      defaultEndTime.setHours(defaultEndTime.getHours() + 24);
      startCountdown(countdown, defaultEndTime);
    }
  });

  // Initialize header countdown
  if (headerCountdown) {
    const headerEndTime = new Date();
    headerEndTime.setHours(
      headerEndTime.getHours() + 4,
      headerEndTime.getMinutes() + 32,
      headerEndTime.getSeconds() + 19
    );
    startMiniCountdown(headerCountdown, headerEndTime);
  }

  // Initialize daily deal countdown
  if (dailyCountdown) {
    const dailyEndTime = new Date();
    dailyEndTime.setHours(
      dailyEndTime.getHours() + 14,
      dailyEndTime.getMinutes() + 32,
      dailyEndTime.getSeconds() + 19
    );
    startMainCountdown(dailyCountdown, dailyEndTime);
  }
}

function startCountdown(element, endTime) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime.getTime() - now;

    if (distance < 0) {
      clearInterval(timer);
      element.innerHTML = "<div class='expired'>Deal Expired</div>";
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const hoursEl = element.querySelector(".hours");
    const minutesEl = element.querySelector(".minutes");
    const secondsEl = element.querySelector(".seconds");

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }, 1000);

  countdownTimers.push(timer);
}

function startMiniCountdown(element, endTime) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime.getTime() - now;

    if (distance < 0) {
      clearInterval(timer);
      element.innerHTML = "<span>Deal Expired</span>";
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeUnits = element.querySelectorAll(".time-unit");
    if (timeUnits[0]) timeUnits[0].textContent = String(hours).padStart(2, "0");
    if (timeUnits[1])
      timeUnits[1].textContent = String(minutes).padStart(2, "0");
    if (timeUnits[2])
      timeUnits[2].textContent = String(seconds).padStart(2, "0");
  }, 1000);

  countdownTimers.push(timer);
}

function startMainCountdown(element, endTime) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime.getTime() - now;

    if (distance < 0) {
      clearInterval(timer);
      element.innerHTML = "<div class='expired'>Deal Expired</div>";
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const hoursEl = element.querySelector(".hours");
    const minutesEl = element.querySelector(".minutes");
    const secondsEl = element.querySelector(".seconds");

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }, 1000);

  countdownTimers.push(timer);
}

// Filter Functionality
function initializeFilters() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const dealCards = document.querySelectorAll("[data-category]");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      filterTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Get filter value
      const filter = tab.getAttribute("data-filter");

      // Filter cards
      dealCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.opacity = "0";
          card.style.transform = "translateY(30px)";

          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Enhanced Cart Functionality
function initializeCart() {
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      // Redirect to cart.html instead of opening sidebar
      window.location.href = "cart.html";
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  // Add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = btn.getAttribute("data-product");
      if (productId) {
        addToCart(productId);
        showAddToCartAnimation(btn);
      }
    });
  });

  // Bundle buttons
  document.querySelectorAll(".add-bundle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      showNotification("Bundle added to cart!", "success");
      showAddToCartAnimation(btn);
    });
  });

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("Your cart is empty!", "warning");
        return;
      }
      showNotification("Redirecting to checkout...", "success");
    });
  }
}

function openCart() {
  if (cartSidebar) cartSidebar.classList.add("active");
  if (cartOverlay) cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function addToCart(productId) {
  const product = products[productId];
  if (!product) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Ensure the image is properly included when adding to cart
    cart.push({
      ...product,
      quantity: 1,
      // Explicitly ensure image is included
      image: product.image,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  showNotification(`${product.name} added to cart!`, "success");
}

function removeFromCart(productId) {
  const product = products[productId];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  if (product) {
    showNotification(`${product.name} removed from cart!`, "success");
  }
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

// Enhanced updateCartDisplay function with proper image handling
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = totalPrice.toFixed(2);

  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart
        .map((item) => {
          // Ensure we have a valid image path
          const imageSrc = item.image || "/placeholder.svg?height=80&width=80";

          return `
            <div class="cart-item">
              <img src="${imageSrc}" alt="${
            item.name
          }" onerror="this.src='/placeholder.svg?height=80&width=80'">
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                  <button class="decrease" onclick="updateCartQuantity('${
                    item.id
                  }', ${item.quantity - 1})">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase" onclick="updateCartQuantity('${
                    item.id
                  }', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${
                  item.id
                }')">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
          `;
        })
        .join("");
    }
  }
}

// Coupon Functionality
function initializeCoupons() {
  // Scratch coupon
  const scratchArea = document.querySelector(".scratch-area");
  if (scratchArea) {
    scratchArea.addEventListener("click", () => {
      const overlay = scratchArea.querySelector(".scratch-overlay");
      const content = scratchArea.querySelector(".coupon-content");
      const copyBtn = scratchArea
        .closest(".scratch-coupon")
        .querySelector(".copy-code");

      overlay.style.opacity = "0";
      content.classList.add("revealed");
      copyBtn.classList.add("active");
    });
  }

  // Click reveal coupon
  const giftBox = document.getElementById("gift-box");
  if (giftBox) {
    giftBox.addEventListener("click", () => {
      const content = giftBox.nextElementSibling;
      const copyBtn = giftBox
        .closest(".click-coupon")
        .querySelector(".copy-code");

      giftBox.style.opacity = "0";
      content.classList.add("revealed");
      copyBtn.classList.add("active");
    });
  }

  // Copy code buttons
  document.querySelectorAll(".copy-code").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => {
        showNotification(`Coupon code ${code} copied!`, "success");
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
        }, 2000);
      });
    });
  });
}

// Viewer Counts Animation
function initializeViewerCounts() {
  const viewerElements = document.querySelectorAll(".viewer-number");

  viewerElements.forEach((element) => {
    const baseCount = Number.parseInt(element.textContent);
    viewerCounts[element] = baseCount;

    // Animate viewer count changes
    setInterval(() => {
      const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
      const newCount = Math.max(1, viewerCounts[element] + change);
      viewerCounts[element] = newCount;

      element.style.transform = "scale(1.2)";
      element.style.color = "var(--primary-color)";

      setTimeout(() => {
        element.textContent = newCount;
        element.style.transform = "scale(1)";
        element.style.color = "";
      }, 200);
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds
  });
}

// Floating Button
function initializeFloatingButton() {
  if (floatingDeal) {
    floatingDeal.addEventListener("click", () => {
      document.getElementById("daily-deal").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    // Hide/show based on scroll position
    window.addEventListener("scroll", () => {
      const dailyDealSection = document.getElementById("daily-deal");
      if (dailyDealSection) {
        const rect = dailyDealSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          floatingDeal.style.opacity = "0";
          floatingDeal.style.pointerEvents = "none";
        } else {
          floatingDeal.style.opacity = "1";
          floatingDeal.style.pointerEvents = "auto";
        }
      }
    });
  }
}

// Deal Alert Banner
function initializeDealAlert() {
  if (alertClose) {
    alertClose.addEventListener("click", () => {
      dealAlert.style.transform = "translateY(-100%)";
      setTimeout(() => {
        dealAlert.style.display = "none";
      }, 300);
    });
  }

  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (dealAlert && dealAlert.style.display !== "none") {
      dealAlert.style.transform = "translateY(-100%)";
      setTimeout(() => {
        dealAlert.style.display = "none";
      }, 300);
    }
  }, 10000);
}

// --- Search Bar Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");
  const dealCards = document.querySelectorAll("[data-category]");

  function filterDeals() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;
    dealCards.forEach((card) => {
      const name = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      const desc =
        card
          .querySelector(".deal-info p, .seasonal-content p")
          ?.textContent?.toLowerCase() || "";
      const category = card.getAttribute("data-category")?.toLowerCase() || "";
      if (
        name.includes(query) ||
        desc.includes(query) ||
        category.includes(query) ||
        query === ""
      ) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });
    // Optionally show a message if nothing matches
    // (not implemented here for brevity)
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterDeals);
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") filterDeals();
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener("click", filterDeals);
  }
});

// Animation Functions
function showAddToCartAnimation(button) {
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Added!';
  button.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "";
  }, 2000);
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${
      type === "success"
        ? "check-circle"
        : type === "error"
        ? "exclamation-circle"
        : "exclamation-triangle"
    }"></i>
    <span>${message}</span>
  `;

  // Add notification styles if not already present
  if (!document.querySelector("style[data-notification-styles]")) {
    const style = document.createElement("style");
    style.setAttribute("data-notification-styles", "true");
    style.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-md);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid var(--primary-color);
        max-width: 350px;
      }
      
      .notification.success {
        border-left-color: #27ae60;
      }
      
      .notification.error {
        border-left-color: #e74c3c;
      }
      
      .notification.warning {
        border-left-color: #f39c12;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification i {
        font-size: 1.2rem;
      }
      
      .notification.success i {
        color: #27ae60;
      }
      
      .notification.error i {
        color: #e74c3c;
      }
      
      .notification.warning i {
        color: #f39c12;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Hide notification
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Stock Bar Animations
function animateStockBars() {
  const stockFills = document.querySelectorAll(".stock-fill, .progress-fill");

  stockFills.forEach((fill) => {
    const width = fill.style.width;
    fill.style.width = "0%";

    setTimeout(() => {
      fill.style.width = width;
    }, 500);
  });
}

// Initialize stock bar animations when elements come into view
const stockObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStockBars();
        stockObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stock-indicator, .stock-progress").forEach((el) => {
  stockObserver.observe(el);
});

// Expose functions to global scope for onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  countdownTimers.forEach((timer) => clearInterval(timer));
});

// Add parallax effect
function initializeParallax() {
  const heroBg = document.querySelector(".hero-bg-image");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }
}

// Enhanced hover effects
function initializeHoverEffects() {
  const cards = document.querySelectorAll(".flash-deal-card, .seasonal-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}
