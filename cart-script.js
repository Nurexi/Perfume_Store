// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentTheme = localStorage.getItem("theme") || "light";
let appliedCoupon = null;
let currentPaymentMethod = "card";

// Product Database for cart display
const productDatabase = {
  "celestial-blossom": {
    id: "celestial-blossom",
    name: "Celestial Blossom",
    description: "Ethereal floral with notes of jasmine, peony, and white musk",
    price: 250,
    rating: 4.9,
    image: "perfume.jpg",
    features: ["Long-lasting (24h+)", "Elegant bottle design", "50ml"],
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
    features: ["Crystal bottle designs", "Exclusive", "50ml"],
  },
  "mystic-dawn": {
    id: "mystic-dawn",
    name: "Mystic Dawn",
    description: "Fresh aquatic with sea salt, bergamot, and driftwood",
    price: 175,
    rating: 4.7,
    image: "духи_парфюм_идея инфографики_карточка товара(1).jpg",
    features: ["Sweat-proof", "Summer-safe", "100ml"],
  },
  "golden-amber": {
    id: "golden-amber",
    name: "Golden Amber",
    description: "Warm oriental with amber, vanilla, and sandalwood",
    price: 225,
    rating: 4.6,
    image: "mm.jpg",
    features: ["Crystal bottle", "Exclusive", "50ml"],
  },
  "velvet-rose": {
    id: "velvet-rose",
    name: "Velvet Rose",
    description: "Luxurious rose with peony, musk, and honey",
    price: 275,
    rating: 4.9,
    image: "mers.jpg",
    features: ["Long-lasting", "Elegant design", "50ml"],
  },
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Fresh marine with sea spray, citrus, and mineral notes",
    price: 195,
    rating: 4.3,
    image: "opim.jpg",
    features: ["Sweat-proof", "Summer-safe", "100ml"],
  },
  "midnight-oud": {
    id: "midnight-oud",
    name: "Midnight Oud",
    description: "Exotic woody with oud, saffron, and leather",
    price: 350,
    rating: 4.8,
    image: "bb.jpg",
    features: ["Crystal bottle", "Exclusive", "50ml"],
  },
  "citrus-zest": {
    id: "citrus-zest",
    name: "Citrus Zest",
    description: "Vibrant citrus with bergamot, mandarin, and vetiver",
    price: 165,
    rating: 4.5,
    image: "jpg(21).jpg",
    features: ["Sweat-proof", "Summer-safe", "100ml"],
  },
  "vanilla-dream": {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    description: "Sweet gourmand with vanilla, tonka bean, and caramel",
    price: 185,
    rating: 4.4,
    image: "jpg(22).jpg",
    features: ["Long-lasting", "Elegant design", "50ml"],
  },
};

// Coupon codes database
const couponCodes = {
  WELCOME15: {
    discount: 15,
    type: "percentage",
    description: "15% off for new customers",
  },
  LUXURY20: {
    discount: 20,
    type: "percentage",
    description: "20% off luxury items",
  },
  FIRST25: {
    discount: 25,
    type: "percentage",
    description: "25% off first purchase",
  },
  SAVE50: {
    discount: 50,
    type: "fixed",
    description: "$50 off orders over $300",
  },
};

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const cartBtn = document.getElementById("cart-btn");
const emptyCart = document.getElementById("empty-cart");
const cartWithItems = document.getElementById("cart-with-items");
const cartItemsList = document.getElementById("cart-items-list");
const itemCount = document.getElementById("item-count");
const subtotalAmount = document.getElementById("subtotal-amount");
const taxAmount = document.getElementById("tax-amount");
const totalAmount = document.getElementById("total-amount");
const paymentAmount = document.getElementById("payment-amount");
const discountRow = document.getElementById("discount-row");
const discountAmount = document.getElementById("discount-amount");
const appliedCouponSpan = document.getElementById("applied-coupon");
const couponInput = document.getElementById("coupon-input");
const applyCouponBtn = document.getElementById("apply-coupon-btn");
const submitPaymentBtn = document.getElementById("submit-payment");
const successModal = document.getElementById("success-modal");
const orderNumber = document.getElementById("order-number");

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
  initializePaymentForms();

  // Load cart from URL parameters if redirected from product page
  loadCartFromParams();

  // Update displays
  updateCartDisplay();
  updateOrderSummary();

  // Check if cart is empty
  if (cart.length === 0) {
    showEmptyCart();
  } else {
    showCartWithItems();
  }
}

// Load cart from URL parameters (when redirected from product pages)
function loadCartFromParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");
  const fromCart = urlParams.get("fromCart");

  if (productId && productDatabase[productId] && !fromCart) {
    // Add product to cart if it came from a product page
    addToCartFromProduct(productId);
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Add product to cart when redirected from product page
function addToCartFromProduct(productId) {
  const product = productDatabase[productId];
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      features: product.features,
      rating: product.rating,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`${product.name} added to cart!`, "success");
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

  // Cart button - redirect to cart page (if not already on cart page)
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      if (!window.location.pathname.includes("cart.html")) {
        window.location.href = "cart.html?fromCart=true";
      }
    });
  }

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
  const particleCount = 30;

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

// Cart Functions
function updateCartDisplay() {
  const cartCountElement = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "block" : "none";
  }

  if (itemCount) {
    itemCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;
  }

  if (!cartItemsList) return;

  if (cart.length === 0) {
    showEmptyCart();
    return;
  }

  showCartWithItems();

  cartItemsList.innerHTML = cart
    .map((item) => {
      const product = productDatabase[item.id] || item;
      return `
        <div class="cart-item" data-product-id="${item.id}">
          <div class="item-image">
            <img src="${
              item.image || "/placeholder.svg?height=120&width=120"
            }" alt="${item.name}">
            <div class="item-badge ${getBadgeClass(item.id)}">${getBadgeText(
        item.id
      )}</div>
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p class="item-description">${
              item.description || "Premium luxury fragrance"
            }</p>
            <div class="item-features">
              ${(item.features || ["Premium Quality", "Long-lasting"])
                .map((feature) => `<span class="feature-tag">${feature}</span>`)
                .join("")}
            </div>
            <div class="item-rating">
              <div class="stars">
                ${generateStars(item.rating || 4.5)}
              </div>
              <span>(${item.rating || 4.5})</span>
            </div>
          </div>
          <div class="item-controls">
            <div class="price-section">
              <span class="current-price">$${item.price.toFixed(2)}</span>
              <span class="unit-price">per item</span>
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn decrease" onclick="updateQuantity('${
                item.id
              }', -1)" ${item.quantity <= 1 ? "disabled" : ""}>
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" class="quantity-input" value="${
                item.quantity
              }" min="1" max="10" readonly>
              <button class="quantity-btn increase" onclick="updateQuantity('${
                item.id
              }', 1)" ${item.quantity >= 10 ? "disabled" : ""}>
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="item-total">
              <span class="total-label">Subtotal:</span>
              <span class="total-price">$${(item.price * item.quantity).toFixed(
                2
              )}</span>
            </div>
            <button class="remove-item" onclick="removeItem('${item.id}')">
              <i class="fas fa-trash"></i>
              <span>Remove</span>
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function getBadgeClass(itemId) {
  const badges = {
    "noir-elixir": "luxury",
    "midnight-oud": "exclusive",
    "celestial-blossom": "",
    "velvet-rose": "",
  };
  return badges[itemId] || "";
}

function getBadgeText(itemId) {
  const badges = {
    "celestial-blossom": "Bestseller",
    "noir-elixir": "Luxury",
    "midnight-oud": "Exclusive",
    "velvet-rose": "Classic",
    "mystic-dawn": "Limited",
  };
  return badges[itemId] || "New";
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

function showEmptyCart() {
  if (emptyCart && cartWithItems) {
    emptyCart.style.display = "flex";
    cartWithItems.style.display = "none";
  }
}

function showCartWithItems() {
  if (emptyCart && cartWithItems) {
    emptyCart.style.display = "none";
    cartWithItems.style.display = "block";
  }
}

function updateQuantity(itemId, change) {
  const item = cart.find((item) => item.id === itemId);
  if (!item) return;

  const newQuantity = item.quantity + change;
  if (newQuantity < 1 || newQuantity > 10) return;

  item.quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
  updateOrderSummary();

  // Add animation effect
  const cartItem = document.querySelector(`[data-product-id="${itemId}"]`);
  if (cartItem) {
    cartItem.style.transform = "scale(1.02)";
    setTimeout(() => {
      cartItem.style.transform = "scale(1)";
    }, 200);
  }

  showNotification(`Quantity updated for ${item.name}`, "success");
}

function removeItem(itemId) {
  const item = cart.find((item) => item.id === itemId);
  if (!item) return;

  // Add removal animation
  const cartItem = document.querySelector(`[data-product-id="${itemId}"]`);
  if (cartItem) {
    cartItem.style.animation = "slideOutRight 0.5s ease forwards";
    setTimeout(() => {
      cart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartDisplay();
      updateOrderSummary();

      if (cart.length === 0) {
        showEmptyCart();
      }
    }, 500);
  }

  showNotification(`${item.name} removed from cart`, "success");
}

// Order Summary Functions
function updateOrderSummary() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }

  const total = subtotal + tax - discount;

  // Update summary amounts
  if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
  if (taxAmount) taxAmount.textContent = `$${tax.toFixed(2)}`;
  if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
  if (paymentAmount) paymentAmount.textContent = `$${total.toFixed(2)}`;

  // Update discount row
  if (appliedCoupon && discountRow && discountAmount && appliedCouponSpan) {
    discountRow.style.display = "flex";
    discountAmount.textContent = `-$${discount.toFixed(2)}`;
    appliedCouponSpan.textContent = appliedCoupon.code;
  } else if (discountRow) {
    discountRow.style.display = "none";
  }
}

// Coupon Functions
function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    showNotification("Please enter a coupon code", "warning");
    return;
  }

  if (appliedCoupon && appliedCoupon.code === code) {
    showNotification("This coupon is already applied", "warning");
    return;
  }

  // Show loading state
  const btnText = applyCouponBtn.querySelector(".btn-text");
  const btnLoading = applyCouponBtn.querySelector(".btn-loading");
  btnText.style.display = "none";
  btnLoading.style.display = "block";
  applyCouponBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    if (couponCodes[code]) {
      appliedCoupon = { ...couponCodes[code], code };
      updateOrderSummary();
      showNotification(`Coupon ${code} applied successfully!`, "success");
      couponInput.value = "";

      // Add success animation to coupon section
      const couponSection = document.querySelector(".coupon-section");
      if (couponSection) {
        couponSection.style.background = "rgba(76, 175, 80, 0.1)";
        couponSection.style.borderColor = "rgba(76, 175, 80, 0.3)";
      }
    } else {
      showNotification("Invalid coupon code", "error");
    }

    // Reset button state
    btnText.style.display = "block";
    btnLoading.style.display = "none";
    applyCouponBtn.disabled = false;
  }, 1500);
}

function applySuggestedCoupon(code) {
  couponInput.value = code;
  applyCoupon();
}

// Payment Functions
function initializePaymentForms() {
  // Card number formatting
  const cardNumberInput = document.getElementById("card-number");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", formatCardNumber);
    cardNumberInput.addEventListener("input", updateCardPreview);
  }

  // Expiry date formatting
  const expiryInput = document.getElementById("expiry-date");
  if (expiryInput) {
    expiryInput.addEventListener("input", formatExpiryDate);
    expiryInput.addEventListener("input", updateCardPreview);
  }

  // CVV formatting
  const cvvInput = document.getElementById("cvv");
  if (cvvInput) {
    cvvInput.addEventListener("input", formatCVV);
  }

  // Card holder name
  const cardHolderInput = document.getElementById("card-holder-name");
  if (cardHolderInput) {
    cardHolderInput.addEventListener("input", updateCardPreview);
  }

  // PayPal email validation
  const paypalEmailInput = document.getElementById("paypal-email");
  if (paypalEmailInput) {
    paypalEmailInput.addEventListener("input", validatePayPalEmail);
  }
}

function formatCardNumber(e) {
  const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
  e.target.value = formattedValue;
}

function formatExpiryDate(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
  }
  e.target.value = value;
}

function formatCVV(e) {
  const value = e.target.value.replace(/\D/g, "");
  e.target.value = value.substring(0, 4);
}

function updateCardPreview() {
  const cardNumber = document.getElementById("card-number")?.value || "";
  const cardHolder = document.getElementById("card-holder-name")?.value || "";
  const expiryDate = document.getElementById("expiry-date")?.value || "";

  // Update card display
  const cardDisplay = document.getElementById("card-display");
  if (cardDisplay) {
    if (cardNumber) {
      cardDisplay.textContent = cardNumber.padEnd(19, "•");
    } else {
      cardDisplay.textContent = "•••• •••• •••• ••••";
    }
  }

  // Update holder display
  const holderDisplay = document.getElementById("holder-display");
  if (holderDisplay) {
    holderDisplay.textContent = cardHolder.toUpperCase() || "YOUR NAME";
  }

  // Update expiry display
  const expiryDisplay = document.getElementById("expiry-display");
  if (expiryDisplay) {
    expiryDisplay.textContent = expiryDate || "MM/YY";
  }

  // Update card brand
  updateCardBrand(cardNumber);
}

function updateCardBrand(cardNumber) {
  const cardBrand = document.getElementById("card-brand");
  const cardIcons = document.querySelectorAll(".card-icons i");

  if (!cardBrand) return;

  // Reset all icons
  cardIcons.forEach((icon) => icon.classList.remove("active"));

  const firstDigit = cardNumber.charAt(0);
  const firstTwoDigits = cardNumber.substring(0, 2);

  if (firstDigit === "4") {
    cardBrand.innerHTML = '<i class="fab fa-cc-visa"></i>';
    document.querySelector(".card-icons .fa-cc-visa")?.classList.add("active");
  } else if (firstDigit === "5" || firstTwoDigits === "22") {
    cardBrand.innerHTML = '<i class="fab fa-cc-mastercard"></i>';
    document
      .querySelector(".card-icons .fa-cc-mastercard")
      ?.classList.add("active");
  } else if (firstTwoDigits === "34" || firstTwoDigits === "37") {
    cardBrand.innerHTML = '<i class="fab fa-cc-amex"></i>';
    document.querySelector(".card-icons .fa-cc-amex")?.classList.add("active");
  } else if (firstDigit === "6") {
    cardBrand.innerHTML = '<i class="fab fa-cc-discover"></i>';
    document
      .querySelector(".card-icons .fa-cc-discover")
      ?.classList.add("active");
  } else {
    cardBrand.innerHTML = '<i class="fab fa-cc-visa"></i>';
  }
}

function validatePayPalEmail(e) {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    e.target.style.borderColor = "#e74c3c";
  } else {
    e.target.style.borderColor = "";
  }
}

function switchPaymentMethod(method) {
  currentPaymentMethod = method;

  // Update tabs
  document.querySelectorAll(".payment-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelector(`[data-method="${method}"]`).classList.add("active");

  // Update forms
  document.querySelectorAll(".payment-form").forEach((form) => {
    form.classList.remove("active");
  });
  document.getElementById(`${method}-form`).classList.add("active");
}

function processPayment() {
  if (!validatePaymentForm()) {
    return;
  }

  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }

  // Show loading state
  const btnContent = submitPaymentBtn.querySelector(".btn-content");
  const btnLoading = submitPaymentBtn.querySelector(".btn-loading");
  btnContent.style.display = "none";
  btnLoading.style.display = "flex";
  submitPaymentBtn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    // Reset button state
    btnContent.style.display = "flex";
    btnLoading.style.display = "none";
    submitPaymentBtn.disabled = false;

    // Show success modal
    showSuccessModal();

    // Clear cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }, 3000);
}

function validatePaymentForm() {
  if (currentPaymentMethod === "card") {
    const cardNumber = document.getElementById("card-number").value;
    const cardHolder = document.getElementById("card-holder-name").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
      showNotification("Please enter a valid card number", "error");
      return false;
    }

    if (!cardHolder.trim()) {
      showNotification("Please enter the card holder name", "error");
      return false;
    }

    if (!expiryDate || expiryDate.length < 5) {
      showNotification("Please enter a valid expiry date", "error");
      return false;
    }

    if (!cvv || cvv.length < 3) {
      showNotification("Please enter a valid CVV", "error");
      return false;
    }
  } else if (currentPaymentMethod === "paypal") {
    const paypalEmail = document.getElementById("paypal-email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!paypalEmail || !emailRegex.test(paypalEmail)) {
      showNotification("Please enter a valid PayPal email address", "error");
      return false;
    }
  }

  return true;
}

function showSuccessModal() {
  if (successModal) {
    // Generate order number
    const orderNum =
      "OP-" +
      new Date().getFullYear() +
      "-" +
      Math.random().toString().substr(2, 6);
    if (orderNumber) {
      orderNumber.textContent = orderNum;
    }

    successModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Auto redirect after 10 seconds
    setTimeout(() => {
      redirectToHome();
    }, 10000);
  }
}

function redirectToHome() {
  if (successModal) {
    successModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  showNotification("Redirecting to home page...", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

function viewOrderDetails() {
  if (successModal) {
    successModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  showNotification("Redirecting to order details...", "success");
}

// Notification System
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
  }, 4000);
}

// Global functions for onclick handlers
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.applyCoupon = applyCoupon;
window.applySuggestedCoupon = applySuggestedCoupon;
window.switchPaymentMethod = switchPaymentMethod;
window.processPayment = processPayment;
window.redirectToHome = redirectToHome;
window.viewOrderDetails = viewOrderDetails;

// Enhanced Add to Cart function for other pages
window.addToCartAndRedirect = function (productId) {
  // Redirect to cart page with product parameter
  window.location.href = `cart.html?product=${productId}`;
};

// Enhanced Cart button redirect function
window.redirectToCart = function () {
  window.location.href = "cart.html?fromCart=true";
};
