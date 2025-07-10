// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let currentTheme = localStorage.getItem("theme") || "dark";
let currentReviewSlide = 0;

// Enhanced Product Data for Featured Collection
const products = {
  "Sauvage Dior": {
    id: "Sauvage Dior",
    name: "Sauvage Dior",
    description: "Ethereal floral with notes of jasmine, peony, and white musk",
    price: 250,
    rating: 4.9,
    image: "Product design _Sauvage Dior_.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "noir-elixir": {
    id: "noir-elixir",
    name: "Noir Elixir",
    description:
      "Dark mysterious blend of black orchid, patchouli, and vanilla",
    price: 299,
    rating: 4.8,
    image:
      "Демонстрация Вашего парфюма на фоне мха и леса _ создано в нейрофото.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "mystic-dawn": {
    id: "mystic-dawn",
    name: "Mystic Dawn",
    description: "Fresh aquatic with sea salt, bergamot, and driftwood",
    price: 175,
    rating: 4.7,
    image: "духи_парфюм_идея инфографики_карточка товара(1).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "golden-amber": {
    id: "golden-amber",
    name: "Golden Amber",
    description: "Warm oriental with amber, vanilla, and sandalwood",
    price: 225,
    rating: 4.6,
    image: "mm.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "velvet-rose": {
    id: "velvet-rose",
    name: "Velvet Rose",
    description: "Luxurious rose with peony, musk, and honey",
    price: 275,
    rating: 4.9,
    image: "mers.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Fresh marine with sea spray, citrus, and mineral notes",
    price: 195,
    rating: 4.3,
    image: "opim.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "midnight-oud": {
    id: "midnight-oud",
    name: "Midnight Oud",
    description: "Exotic woody with oud, saffron, and leather",
    price: 350,
    rating: 4.8,
    image: "bb.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "citrus-zest": {
    id: "citrus-zest",
    name: "Citrus Zest",
    description: "Vibrant citrus with bergamot, mandarin, and vetiver",
    price: 165,
    rating: 4.5,
    image: "jpg(21).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "vanilla-dream": {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    description: "Sweet gourmand with vanilla, tonka bean, and caramel",
    price: 185,
    rating: 4.4,
    image: "jpg(22).jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
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
const newsletterForm = document.getElementById("newsletter-form");
const videoModal = document.getElementById("video-modal");
const videoClose = document.getElementById("video-close");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  // Hide loading screen
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 600);
    }
  }, 2000);

  // Set initial theme
  setTheme(currentTheme);

  // Initialize components
  initializeNavigation();
  initializeEnhancedParticles();
  initializeScrollAnimations();
  initializeProductCards();
  initializeReviewSlider();
  initializeCart();
  initializeNewsletterForm();
  initializeCounterAnimation();
  initializeEnhancedHeroEffects();
  initializeAboutEnhancements();
  initializeVideoModal();
  initializeQuickView();
  initializeFAQ();
  initializeHowItWorks();

  // Update cart display
  updateCartDisplay();
  updateWishlistButtons();

  // Add Quick View Modal to DOM if it doesn't exist
  addQuickViewModal();
}

// FAQ Functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        toggleFAQ(item);
      });

      // Keyboard accessibility
      question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFAQ(item);
        }
      });
    }
  });
}

function toggleFAQ(item) {
  const isActive = item.classList.contains("active");
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove("active");
      const otherQuestion = otherItem.querySelector(".faq-question");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
      if (otherAnswer) otherAnswer.setAttribute("aria-hidden", "true");
    }
  });

  // Toggle current item
  if (isActive) {
    item.classList.remove("active");
    if (question) question.setAttribute("aria-expanded", "false");
    if (answer) answer.setAttribute("aria-hidden", "true");
  } else {
    item.classList.add("active");
    if (question) question.setAttribute("aria-expanded", "true");
    if (answer) answer.setAttribute("aria-hidden", "false");
  }
}

// How It Works Animation
function initializeHowItWorks() {
  const stepItems = document.querySelectorAll(".step-item");

  if (stepItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 200);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    stepItems.forEach((item) => {
      observer.observe(item);
    });
  }
}

// Theme Toggle
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.className = navMenu.classList.contains("active")
          ? "fas fa-times"
          : "fas fa-bars";
      }
    });
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }

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
    if (header) {
      if (window.scrollY > 100) {
        header.style.background =
          currentTheme === "dark"
            ? "rgba(15, 15, 15, 0.98)"
            : "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background =
          currentTheme === "dark"
            ? "rgba(15, 15, 15, 0.95)"
            : "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
      }
    }
  });
}

// Enhanced Particles
function initializeEnhancedParticles() {
  const particlesContainer = document.getElementById("particles");
  const aboutParticlesContainer = document.getElementById("about-particles");

  function createParticles(container, count = 50) {
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.width = Math.random() * 4 + 2 + "px";
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.animationDuration = Math.random() * 4 + 4 + "s";
      container.appendChild(particle);
    }
  }

  createParticles(particlesContainer, 30);
  createParticles(aboutParticlesContainer, 20);
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

  // Observe elements for scroll animations
  document
    .querySelectorAll(
      ".scroll-animate, .feature-item, .value-card, .faq-item, .step-item"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Product Cards
function initializeProductCards() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productId = card.getAttribute("data-product");
    const addToCartBtn = card.querySelector(".add-to-cart");
    const wishlistBtn = card.querySelector(".wishlist-btn");
    const quickViewBtn = card.querySelector(".quick-view-btn");

    // Add to cart
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addToCart(productId);
      });
    }

    // Wishlist toggle
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleWishlist(productId);
      });
    }

    // Quick view
    if (quickViewBtn) {
      quickViewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openQuickView(productId);
      });
    }
  });
}

// Cart Management
function initializeCart() {
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "cart.html";
    });
  }
}

function addToCart(productId) {
  const product = products[productId];
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  showNotification(`${product.name} added to cart!`, "success");
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  if (!cartCount || !cartItems || !cartTotal) return;

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="quantity-controls">
            <button onclick="updateQuantity('${item.id}', ${
          item.quantity - 1
        })">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${
          item.quantity + 1
        })">+</button>
          </div>
        </div>
        <div class="cart-item-price">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="remove-item" onclick="removeFromCart('${item.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
      )
      .join("");
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.toggle("active");
    cartOverlay.classList.toggle("active");
    document.body.style.overflow = cartSidebar.classList.contains("active")
      ? "hidden"
      : "";
  }
}

function closeCart() {
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Wishlist Management
function toggleWishlist(productId) {
  const product = products[productId];
  if (!product) return;

  const existingIndex = wishlist.findIndex((item) => item.id === productId);

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1);
    showNotification(`${product.name} removed from wishlist`, "info");
  } else {
    wishlist.push(product);
    showNotification(`${product.name} added to wishlist!`, "success");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistButtons();
}

function updateWishlistButtons() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const card = btn.closest(".product-card");
    const productId = card?.getAttribute("data-product");
    const isInWishlist = wishlist.some((item) => item.id === productId);

    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = isInWishlist ? "fas fa-heart" : "far fa-heart";
    }
    btn.style.color = isInWishlist ? "#e91e63" : "";
  });
}

// Quick View Modal
function addQuickViewModal() {
  if (!document.getElementById("quick-view-modal")) {
    const modalHTML = `
      <div class="quick-view-modal" id="quick-view-modal" style="display: none;">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <button class="modal-close" id="modal-close">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-body">
            <div class="modal-image">
              <img src="/placeholder.svg" alt="Product" id="modal-product-image">
            </div>
            <div class="modal-info">
              <h2 id="modal-product-name">Product Name</h2>
              <p id="modal-product-description">Product description</p>
              <div class="modal-rating">
                <div class="stars" id="modal-product-rating"></div>
                <span id="modal-rating-text">(4.9)</span>
              </div>
              <div class="modal-price">
                <span class="current-price" id="modal-product-price">$185</span>
              </div>
              <div class="modal-features">
                <h4>Features:</h4>
                <ul id="modal-product-features"></ul>
              </div>
              <div class="modal-actions">
                <button class="btn btn-primary" id="modal-add-to-cart">
                  <i class="fas fa-shopping-bag"></i>
                  <span>Add to Cart</span>
                </button>
                <button class="btn btn-secondary" id="modal-add-to-wishlist">
                  <i class="far fa-heart"></i>
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add modal styles
    const modalStyles = `
      <style>
        .quick-view-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .quick-view-modal.active {
          opacity: 1;
          visibility: visible;
        }
        .quick-view-modal .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        .quick-view-modal .modal-content {
          position: relative;
          background-color: var(--background);
          padding: 2rem;
          border-radius: var(--border-radius-lg);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 2001;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }
        .quick-view-modal.active .modal-content {
          transform: scale(1);
        }
        .quick-view-modal .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--surface);
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 2002;
        }
        .quick-view-modal .modal-close:hover {
          background: var(--primary-color);
          color: white;
        }
        .quick-view-modal .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1rem;
        }
        .quick-view-modal .modal-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: var(--border-radius-md);
        }
        .quick-view-modal .modal-info h2 {
          font-family: var(--font-primary);
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }
        .quick-view-modal .modal-info p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .quick-view-modal .modal-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .quick-view-modal .modal-rating .stars {
          color: #ffd700;
          display: flex;
          gap: 2px;
        }
        .quick-view-modal .modal-price {
          margin-bottom: 1.5rem;
        }
        .quick-view-modal .modal-price .current-price {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-color);
        }
        .quick-view-modal .modal-features {
          margin-bottom: 2rem;
        }
        .quick-view-modal .modal-features h4 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .quick-view-modal .modal-features ul {
          list-style: none;
          padding: 0;
        }
        .quick-view-modal .modal-features ul li {
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
          padding-left: 1rem;
          position: relative;
        }
        .quick-view-modal .modal-features ul li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }
        .quick-view-modal .modal-actions {
          display: flex;
          gap: 1rem;
        }
        .quick-view-modal .modal-actions button {
          flex: 1;
        }
        @media (max-width: 768px) {
          .quick-view-modal .modal-body {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .quick-view-modal .modal-content {
            padding: 1.5rem;
            margin: 1rem;
          }
          .quick-view-modal .modal-actions {
            flex-direction: column;
          }
        }
      </style>
    `;
    document.head.insertAdjacentHTML("beforeend", modalStyles);
  }
}

function initializeQuickView() {
  // Initialize modal close functionality
  document.addEventListener("click", (e) => {
    if (e.target.id === "modal-close" || e.target.closest("#modal-close")) {
      closeQuickView();
    }
    if (e.target.classList.contains("modal-overlay")) {
      closeQuickView();
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeQuickView();
    }
  });
}

function openQuickView(productId) {
  const product = products[productId];
  if (!product) return;

  const modal = document.getElementById("quick-view-modal");
  if (!modal) return;

  // Populate modal content
  const modalImage = document.getElementById("modal-product-image");
  const modalName = document.getElementById("modal-product-name");
  const modalDescription = document.getElementById("modal-product-description");
  const modalRating = document.getElementById("modal-product-rating");
  const modalRatingText = document.getElementById("modal-rating-text");
  const modalPrice = document.getElementById("modal-product-price");
  const modalFeatures = document.getElementById("modal-product-features");
  const modalAddToCart = document.getElementById("modal-add-to-cart");
  const modalAddToWishlist = document.getElementById("modal-add-to-wishlist");

  if (modalImage) modalImage.src = product.image;
  if (modalName) modalName.textContent = product.name;
  if (modalDescription) modalDescription.textContent = product.description;
  if (modalPrice) modalPrice.textContent = `$${product.price}`;
  if (modalRatingText) modalRatingText.textContent = `(${product.rating})`;

  // Update rating stars
  if (modalRating) {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    let starsHTML = "";

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }
    modalRating.innerHTML = starsHTML;
  }

  // Update features
  if (modalFeatures && product.features) {
    modalFeatures.innerHTML = product.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
  }

  // Update button handlers
  if (modalAddToCart) {
    modalAddToCart.onclick = () => {
      addToCart(productId);
      closeQuickView();
    };
  }

  if (modalAddToWishlist) {
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const icon = modalAddToWishlist.querySelector("i");
    const text = modalAddToWishlist.querySelector("span");

    if (icon) icon.className = isInWishlist ? "fas fa-heart" : "far fa-heart";
    if (text)
      text.textContent = isInWishlist
        ? "Remove from Wishlist"
        : "Add to Wishlist";

    modalAddToWishlist.onclick = () => {
      toggleWishlist(productId);
      // Update button after toggle
      setTimeout(() => {
        const newIsInWishlist = wishlist.some((item) => item.id === productId);
        if (icon)
          icon.className = newIsInWishlist ? "fas fa-heart" : "far fa-heart";
        if (text)
          text.textContent = newIsInWishlist
            ? "Remove from Wishlist"
            : "Add to Wishlist";
      }, 100);
    };
  }

  // Show modal
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);

  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
    document.body.style.overflow = "";
  }
}

// Newsletter Form
function initializeNewsletterForm() {
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;

      if (email) {
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
        newsletterForm.reset();
      }
    });
  }
}

// Counter Animation
function initializeCounterAnimation() {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Enhanced Hero Effects
function initializeEnhancedHeroEffects() {
  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll(
      ".hero-bg-image, .floating-elements"
    );

    heroElements.forEach((element) => {
      if (element) {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  });

  // Mouse movement effect for product showcase
  const productShowcase = document.querySelector(".product-showcase");
  if (productShowcase) {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      productShowcase.style.transform = `perspective(1000px) rotateY(${
        -15 + xPos
      }deg) rotateX(${yPos}deg)`;
    });
  }
}

// About Section Enhancements
function initializeAboutEnhancements() {
  // Animate feature items on scroll
  const featureItems = document.querySelectorAll(".feature-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 200);
      }
    });
  });

  featureItems.forEach((item) => {
    observer.observe(item);
  });
}

// Video Modal
function initializeVideoModal() {
  const playVideoBtn = document.querySelector(".play-video-btn");

  if (playVideoBtn && videoModal && videoClose) {
    playVideoBtn.addEventListener("click", () => {
      videoModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    videoClose.addEventListener("click", () => {
      videoModal.classList.remove("active");
      document.body.style.overflow = "";
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// Review Slider (placeholder for future implementation)
function initializeReviewSlider() {
  // This would be implemented if there were review elements in the HTML
  console.log("Review slider initialized");
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${
      type === "success"
        ? "check-circle"
        : type === "error"
        ? "exclamation-circle"
        : "info-circle"
    }"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search Functionality
function initializeSearch() {
  const searchInput = document.querySelector(".search-input");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        const productDescription = card
          .querySelector(".product-description")
          .textContent.toLowerCase();

        if (productName.includes(query) || productDescription.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = query === "" ? "block" : "none";
        }
      });
    });
  }
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeSearch();
});

// Expose functions to global scope for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", () => {
  initializeLazyLoading();
});

// Error handling for missing elements
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
}

function safeQuerySelectorAll(selector) {
  try {
    return document.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Elements not found: ${selector}`);
    return [];
  }
}

// Accessibility improvements
function initializeAccessibility() {
  // Add focus indicators for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });

  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", () => {
  initializeAccessibility();
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // This would integrate with Google Analytics, Adobe Analytics, etc.
  console.log("Event tracked:", eventName, eventData);
}

// Track important user interactions
document.addEventListener("DOMContentLoaded", () => {
  // Track page view
  trackEvent("page_view", { page: window.location.pathname });

  // Track cart interactions
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-to-cart")) {
      const productCard = e.target.closest(".product-card");
      const productId = productCard?.getAttribute("data-product");
      trackEvent("add_to_cart", { product_id: productId });
    }

    if (e.target.closest(".wishlist-btn")) {
      const productCard = e.target.closest(".product-card");
      const productId = productCard?.getAttribute("data-product");
      trackEvent("add_to_wishlist", { product_id: productId });
    }
  });
});

// Chat Widget Functionality
function initializeChatWidget() {
  const chatIcon = document.getElementById('chatIcon');
  const chatWidget = document.getElementById('chatWidget');
  const chatClose = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatVoice = document.getElementById('chatVoice');
  const typingIndicator = document.getElementById('typingIndicator');
  const offlineForm = document.getElementById('offlineForm');
  const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
  
  let isOpen = false;
  let isTyping = false;
  let voiceRecognition = null;
  
  // Toggle chat widget
  chatIcon.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWidget.classList.toggle('active', isOpen);
    
    // Play subtle chime sound when opening
    if (isOpen) {
      const chime = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'); // Short chime sound
      chime.volume = 0.3;
      chime.play().catch(e => console.log('Audio play failed:', e));
    }
  });
  
  chatClose.addEventListener('click', () => {
    isOpen = false;
    chatWidget.classList.remove('active');
  });
  
  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    isTyping = true;
    typingIndicator.classList.add('active');
    
    // Simulate bot response after delay
    setTimeout(() => {
      isTyping = false;
      typingIndicator.classList.remove('active');
      
      // Get bot response
      const botResponse = getBotResponse(message);
      addMessage(botResponse, 'bot');
      
      // Scroll to bottom
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);
  }
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const messageP = document.createElement('p');
    messageP.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    contentDiv.appendChild(messageP);
    contentDiv.appendChild(timeDiv);
    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // Get bot response based on user input
  function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Product recommendations
    if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest')) {
      if (lowerMsg.includes('floral')) {
        return "For a beautiful floral scent, I recommend our Velvet Rose with notes of peony, musk, and honey. It's perfect for daytime wear.";
      } else if (lowerMsg.includes('woody') || lowerMsg.includes('oud')) {
        return "Our Midnight Oud with exotic woody notes of oud, saffron, and leather would be an excellent choice for evening wear.";
      } else if (lowerMsg.includes('fresh') || lowerMsg.includes('summer')) {
        return "For a fresh summer scent, try our Ocean Breeze with marine notes of sea spray and citrus. It's light and refreshing.";
      } else {
        return "I'd be happy to recommend a fragrance. Could you tell me if you prefer floral, woody, or fresh scents?";
      }
    }
    
    // Order tracking
    else if (lowerMsg.includes('track') || lowerMsg.includes('order')) {
      return "To track your order, please provide your order number and email address. Or click the 'Track My Order' button below.";
    }
    
    // Ingredients question
    else if (lowerMsg.includes('ingredient') || lowerMsg.includes('natural')) {
      return "All Nure Véla perfumes use 100% natural ingredients sourced from sustainable gardens worldwide. Each product lists full ingredients on its page.";
    }
    
    // Shipping/returns
    else if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery')) {
      return "We offer free standard shipping on orders over $75. Express and overnight options are available at checkout. Delivery typically takes 3-5 business days.";
    } else if (lowerMsg.includes('return') || lowerMsg.includes('exchange')) {
      return "We accept returns of unopened products within 30 days. For opened items, we offer a 7-day satisfaction exchange policy.";
    }
    
    // Default response
    else {
      const responses = [
        "I'd be delighted to help with that. Could you provide more details?",
        "For personalized fragrance recommendations, tell me about scents you typically enjoy.",
        "Would you like assistance with an existing order or our product collection?",
        "Our concierge team can help you find the perfect fragrance. What are you looking for?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Quick reply buttons
  quickReplyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      addMessage(query, 'user');
      
      // Show typing indicator
      isTyping = true;
      typingIndicator.classList.add('active');
      
      setTimeout(() => {
        isTyping = false;
        typingIndicator.classList.remove('active');
        const response = getBotResponse(query);
        addMessage(response, 'bot');
      }, 1500);
    });
  });
  
  // Send message on enter or button click
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  chatSend.addEventListener('click', sendMessage);
  
  // Voice recognition
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    chatVoice.addEventListener('mousedown', () => {
      chatVoice.classList.add('voice-active');
      recognition.start();
    });
    
    chatVoice.addEventListener('mouseup', () => {
      chatVoice.classList.remove('voice-active');
      recognition.stop();
    });
    
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      chatInput.value = transcript;
    };
    
    recognition.onerror = (e) => {
      console.log('Voice recognition error', e.error);
      chatVoice.classList.remove('voice-active');
    };
  } else {
    chatVoice.style.display = 'none';
  }
  
  // Check if agents are online (simulated)
  const isOnline = Math.random() > 0.5; // 50% chance to simulate offline
  
  if (!isOnline) {
    offlineForm.classList.add('active');
    addMessage("Our fragrance concierge is currently unavailable, but I can still answer basic questions. For detailed assistance, please leave your email and we'll respond within 24 hours.", 'bot');
  }
  
  // Initialize with welcome message
  setTimeout(() => {
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 100);
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeChatWidget();
});
