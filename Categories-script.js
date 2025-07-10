// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let currentTheme = localStorage.getItem("theme") || "light";
let currentFilter = "all";

// Product Data with updated image paths to match HTML
const products = {
  // Women's Perfumes
  "chanel-chance": {
    id: "chanel-chance",
    name: "Chanel Chance Eau Tendre",
    description: "Fresh floral with notes of grapefruit, quince, and jasmine",
    price: 135,
    rating: 4.8,
    image: "jpg(22).jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "dior-jadore": {
    id: "dior-jadore",
    name: "Dior J'adore",
    description: "Luxurious floral bouquet with ylang-ylang and Damascus rose",
    price: 158,
    rating: 4.9,
    image:
      "Демонстрация Вашего парфюма на фоне мха и леса _ создано в нейрофото.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "ysl-black-opium": {
    id: "ysl-black-opium",
    name: "YSL Black Opium",
    description: "Addictive blend of coffee, vanilla, and white flowers",
    price: 112,
    rating: 4.9,
    image: "mm.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "marc-jacobs-daisy": {
    id: "marc-jacobs-daisy",
    name: "Marc Jacobs Daisy",
    description: "Playful floral with strawberry, violet leaves, and jasmine",
    price: 96,
    rating: 4.7,
    image: "mers.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "jo-malone-peony": {
    id: "jo-malone-peony",
    name: "Jo Malone Peony & Blush Suede",
    description: "Luxurious peony with juicy red apple and suede accord",
    price: 148,
    rating: 4.9,
    image: "bb.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "tom-ford-orchid": {
    id: "tom-ford-orchid",
    name: "Tom Ford Black Orchid",
    description:
      "Sensual blend of black truffle, ylang-ylang, and dark vanilla",
    price: 165,
    rating: 5.0,
    image: "opim.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "valentino-donna": {
    id: "valentino-donna",
    name: "Valentino Donna Born in Roma",
    description: "Floral woody musk with jasmine, vanilla, and bourbon",
    price: 142,
    rating: 4.7,
    image: "perfume(1).jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "gucci-bloom": {
    id: "gucci-bloom",
    name: "Gucci Bloom",
    description: "White floral bouquet with tuberose and jasmine",
    price: 108,
    rating: 4.9,
    image: "духи_парфюм_идея инфографики_карточка товара.jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },
  "lancome-la-vie": {
    id: "lancome-la-vie",
    name: "Lancôme La Vie Est Belle",
    description: "Gourmand floral with iris, patchouli, and praline",
    price: 125,
    rating: 4.9,
    image: "духи_парфюм_идея инфографики_карточка товара(1).jpg",
    category: "women",
    features: [
      "Long-lasting (24h+)",
      "Elegant bottle design",
      "Available in 30ml, 50ml, 100ml",
      "Free mini tester on purchase",
    ],
  },

  // Men's Perfumes
  "dior-sauvage": {
    id: "dior-sauvage",
    name: "Dior Sauvage",
    description: "Fresh spicy with bergamot, ambroxan, and pepper",
    price: 128,
    rating: 4.9,
    image: "Product design _Sauvage Dior_.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "chanel-bleu": {
    id: "chanel-bleu",
    name: "Bleu de Chanel",
    description: "Woody aromatic with citrus, sandalwood, and incense",
    price: 145,
    rating: 4.8,
    image: "화장품촬영 전문 스튜디오 와이낫포토그래피 — WHYNOTPHOTOGRAPHY.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "creed-aventus": {
    id: "creed-aventus",
    name: "Creed Aventus",
    description: "Powerful fruity chypre with pineapple, birch, and musk",
    price: 395,
    rating: 5.0,
    image: "Creed Aventus Eau de Parfum.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "tom-ford-oud": {
    id: "tom-ford-oud",
    name: "Tom Ford Oud Wood",
    description: "Rich woody fragrance with oud, sandalwood, and vanilla",
    price: 250,
    rating: 4.9,
    image:
      "Парфюм_ Визуал. Природный фон. Генерации картинок для инфографики.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "acqua-parma-colonia": {
    id: "acqua-parma-colonia",
    name: "Acqua di Parma Colonia",
    description: "Classic citrus cologne with lavender and rosemary",
    price: 110,
    rating: 4.7,
    image: "Midjourney Generation(1).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "viktor-rolf-spicebomb": {
    id: "viktor-rolf-spicebomb",
    name: "Viktor & Rolf Spicebomb",
    description: "Explosive blend of chili, tobacco, and leather",
    price: 98,
    rating: 4.8,
    image: "mers (2).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "jgp-le-male": {
    id: "jgp-le-male",
    name: "Jean Paul Gaultier Le Male",
    description: "Fresh aromatic with lavender, vanilla, and mint",
    price: 92,
    rating: 4.8,
    image:
      "Парфюм_ Мужской парфюм. Генерация картинок. Нейросети. Графический дизайнер. Инфографика.jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "paco-1million": {
    id: "paco-1million",
    name: "Paco Rabanne 1 Million",
    description: "Warm spicy with blood mandarin and cinnamon",
    price: 105,
    rating: 4.9,
    image: "Midjourney Generation(3).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },
  "armani-code": {
    id: "armani-code",
    name: "Armani Code",
    description: "Woody aromatic with bergamot and tonka bean",
    price: 98,
    rating: 4.7,
    image: "jpg(21).jpg",
    category: "men",
    features: [
      "Sweat-proof and summer-safe",
      "Matte glass packaging",
      "Gift wrap options available",
    ],
  },

  // Luxury Perfumes
  "clive-christian-no1": {
    id: "clive-christian-no1",
    name: "Clive Christian No. 1",
    description: "Regal blend of bergamot, jasmine, and vanilla",
    price: 850,
    rating: 5.0,
    image: "luxu.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "roja-enigma": {
    id: "roja-enigma",
    name: "Roja Parfums Enigma",
    description: "Cognac, cinnamon, and tobacco in a masterpiece",
    price: 695,
    rating: 5.0,
    image:
      "Brivido Della Caccia_ Argos Unleashes – A Captivating Leather Fragrance That Sets Hearts Ablaze🔥🔍.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "amouage-jubilation": {
    id: "amouage-jubilation",
    name: "Amouage Jubilation XXV",
    description: "Opulent blend of blackberry, frankincense, and myrrh",
    price: 385,
    rating: 5.0,
    image:
      "GUERLAIN - L'Art & La Matière Cuir Béluga eau de parfum _ Selfridges_com.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "xerjoff-naxos": {
    id: "xerjoff-naxos",
    name: "Xerjoff Naxos",
    description: "Lavender, honey, and tobacco in a luxurious blend",
    price: 320,
    rating: 4.9,
    image:
      "💔 AI generation + photoshop = magnificent visuals for your brand ___._._._.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "mfk-baccarat": {
    id: "mfk-baccarat",
    name: "MFK Baccarat Rouge 540",
    description: "Amber floral with jasmine, saffron, and ambergris",
    price: 325,
    rating: 5.0,
    image: "Midjourney Generation(2).jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "lv-ombre": {
    id: "lv-ombre",
    name: "Louis Vuitton Ombre Nomade",
    description: "Intense oud with raspberry, saffron, and incense",
    price: 290,
    rating: 4.9,
    image:
      "Trace the shape of your destiny with a gift wrapped in the mystery of the snake__Explore the limited-edition Art of Gifting Collection this Lunar New Year, exclusively with purchases at guerlain.com(1).jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "byredo-gypsy": {
    id: "byredo-gypsy",
    name: "Byredo Gypsy Water",
    description: "Woody aromatic with bergamot, pine, and vanilla",
    price: 280,
    rating: 4.9,
    image:
      "Trace the shape of your destiny with a gift wrapped in the mystery of the snake__Explore the limited-edition Art of Gifting Collection this Lunar New Year, exclusively with purchases at guerlain.com.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "lelabo-santal": {
    id: "lelabo-santal",
    name: "Le Labo Santal 33",
    description: "Woody aromatic with sandalwood, cardamom, and violet",
    price: 295,
    rating: 5.0,
    image:
      "Argos Presents Brivido Della Caccia – Embark an Intense Fragrance Journey Evoking the Thrilling 🌟🔥.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
    ],
  },
  "fm-portrait": {
    id: "fm-portrait",
    name: "Frederic Malle Portrait of a Lady",
    description: "Floral chypre with rose, patchouli, and blackcurrant",
    price: 350,
    rating: 5.0,
    image: "Guerlain Santal Pao Rosa Eau de Parfum.jpg",
    category: "luxury",
    features: [
      "Crystal bottle designs",
      "Exclusive only on this site",
      "Collector's edition with serial number",
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
const searchInput = document.querySelector(".search-input");
const valueCards = document.querySelectorAll(".value-card");
const categorySections = document.querySelectorAll(".category-section");
const quickViewModal = document.getElementById("quick-view-modal");
const modalClose = document.getElementById("modal-close");

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
  initializeProductCards();
  initializeCart();
  initializeSearch();
  initializeFilters();
  initializeQuickView();

  // Update cart display
  updateCartDisplay();

  // Show all categories initially
  showCategories(currentFilter);
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
  const icon = themeToggle.querySelector("i");
  if (icon) {
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
}

// Particles Animation
function initializeParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
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
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe category sections
  categorySections.forEach((section) => {
    observer.observe(section);
  });

  // Observe product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    observer.observe(card);
  });
}

// Product Cards
function initializeProductCards() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = card.getAttribute("data-product");
    const addToCartBtn = card.querySelector(".add-to-cart");
    const wishlistBtn = card.querySelector(".wishlist-btn");
    const quickViewBtn = card.querySelector(".quick-view-btn");

    // Add to cart
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(productId);
      });
    }

    // Add to wishlist
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(productId);
      });
    }

    // Quick view
    if (quickViewBtn) {
      quickViewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openQuickView(productId);
      });
    }
  });
}

// Cart Functions
function initializeCart() {
  // Cart toggle
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      // Redirect to cart.html instead of opening sidebar
      window.location.href = "cart.html";
    });
  }

  // Close cart
  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("Your cart is empty!", "warning");
        return;
      }
      showNotification("Redirecting to checkout...", "success");
      // Here you would typically redirect to checkout page
    });
  }
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function addToCart(productId) {
  const product = products[productId];
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
  showNotification("Item removed from cart", "success");
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

function updateCartDisplay() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "block" : "none";
  }

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }

  // Update cart items
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
        .map(
          (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p class="cart-item-price">$${item.price}</p>
            <div class="cart-item-controls">
              <button onclick="updateCartQuantity('${item.id}', ${
            item.quantity - 1
          })" class="quantity-btn">-</button>
              <span class="quantity">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.id}', ${
            item.quantity + 1
          })" class="quantity-btn">+</button>
              <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }
}

// Wishlist Functions
function toggleWishlist(productId) {
  const product = products[productId];
  if (!product) return;

  const existingIndex = wishlist.findIndex((item) => item.id === productId);
  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1);
    showNotification(`${product.name} removed from wishlist`, "success");
  } else {
    wishlist.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showNotification(`${product.name} added to wishlist!`, "success");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistButtons();
}

function updateWishlistButtons() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const productCard = btn.closest(".product-card");
    const productId = productCard.getAttribute("data-product");
    const isInWishlist = wishlist.some((item) => item.id === productId);

    const icon = btn.querySelector("i");
    if (isInWishlist) {
      icon.className = "fas fa-heart";
      btn.style.color = "#e91e63";
    } else {
      icon.className = "far fa-heart";
      btn.style.color = "";
    }
  });
}

// Search Functions
function initializeSearch() {
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchProducts(searchTerm);
    });
  }
}

function searchProducts(searchTerm) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productId = card.getAttribute("data-product");
    const product = products[productId];

    if (product) {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);

      if (matchesSearch || searchTerm === "") {
        card.style.display = "block";
        highlightSearchTerm(card, searchTerm);
      } else {
        card.style.display = "none";
      }
    }
  });

  // Show/hide category sections based on visible products
  categorySections.forEach((section) => {
    const visibleProducts = section.querySelectorAll(
      '.product-card[style*="display: block"], .product-card:not([style*="display: none"])'
    );
    section.style.display = visibleProducts.length > 0 ? "block" : "none";
  });
}

function highlightSearchTerm(card, searchTerm) {
  if (!searchTerm) return;

  const title = card.querySelector("h3");
  const description = card.querySelector(".product-description");

  [title, description].forEach((element) => {
    if (element) {
      const originalText = element.textContent;
      const regex = new RegExp(`(${searchTerm})`, "gi");
      element.innerHTML = originalText.replace(
        regex,
        '<span class="search-highlight">$1</span>'
      );
    }
  });
}

// --- Search bar functionality for Categories page ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");
  const productCards = document.querySelectorAll(".product-card");
  const categorySections = document.querySelectorAll(".category-section");

  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;
    productCards.forEach((card) => {
      const name = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      const desc =
        card
          .querySelector(".product-description")
          ?.textContent?.toLowerCase() || "";
      if (name.includes(query) || desc.includes(query) || query === "") {
        card.style.display = "";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });
    // Hide category sections if all their products are hidden
    categorySections.forEach((section) => {
      const visible = Array.from(
        section.querySelectorAll(".product-card")
      ).some((card) => card.style.display !== "none");
      section.style.display = visible ? "" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") filterProducts();
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener("click", filterProducts);
  }
});

// Filter Functions
function initializeFilters() {
  valueCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      setActiveFilter(card);
      showCategories(category);
    });
  });
}

function setActiveFilter(activeCard) {
  valueCards.forEach((card) => card.classList.remove("active"));
  activeCard.classList.add("active");
}

function showCategories(category) {
  currentFilter = category;

  categorySections.forEach((section) => {
    const sectionCategory = section.getAttribute("data-category");

    if (category === "all" || sectionCategory === category) {
      section.classList.remove("hidden");
      section.style.display = "block";
    } else {
      section.classList.add("hidden");
      section.style.display = "none";
    }
  });

  // Trigger scroll animations for newly visible sections
  setTimeout(() => {
    const visibleSections = document.querySelectorAll(
      '.category-section:not([style*="display: none"])'
    );
    visibleSections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("visible");
      }
    });
  }, 100);
}

// Quick View Modal
function initializeQuickView() {
  // Close modal events
  if (modalClose) {
    modalClose.addEventListener("click", closeQuickView);
  }

  if (quickViewModal) {
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) {
        closeQuickView();
      }
    });
  }

  // Modal action buttons
  const modalAddToCart = document.getElementById("modal-add-to-cart");
  const modalAddToWishlist = document.getElementById("modal-add-to-wishlist");

  if (modalAddToCart) {
    modalAddToCart.addEventListener("click", () => {
      const productId = modalAddToCart.getAttribute("data-product-id");
      if (productId) {
        addToCart(productId);
      }
    });
  }

  if (modalAddToWishlist) {
    modalAddToWishlist.addEventListener("click", () => {
      const productId = modalAddToWishlist.getAttribute("data-product-id");
      if (productId) {
        toggleWishlist(productId);
      }
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quickViewModal.classList.contains("active")) {
      closeQuickView();
    }
  });
}

function openQuickView(productId) {
  const product = products[productId];
  if (!product) return;

  // Update modal content
  const modalImage = document.getElementById("modal-product-image");
  const modalName = document.getElementById("modal-product-name");
  const modalDescription = document.getElementById("modal-product-description");
  const modalRating = document.getElementById("modal-product-rating");
  const modalRatingText = document.getElementById("modal-rating-text");
  const modalPrice = document.getElementById("modal-product-price");
  const modalFeatures = document.getElementById("modal-product-features");
  const modalAddToCart = document.getElementById("modal-add-to-cart");
  const modalAddToWishlist = document.getElementById("modal-add-to-wishlist");

  // Set product image with error handling
  if (modalImage) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalImage.onerror = function () {
      this.src = "/placeholder.svg?height=400&width=400";
    };
  }

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

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
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

  // Set product IDs for action buttons
  if (modalAddToCart) {
    modalAddToCart.setAttribute("data-product-id", productId);
  }
  if (modalAddToWishlist) {
    modalAddToWishlist.setAttribute("data-product-id", productId);
  }

  // Show modal
  quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  quickViewModal.classList.remove("active");
  document.body.style.overflow = "";
}

// Utility Functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create new notification
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

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize wishlist buttons on page load
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistButtons();
});

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
  }
});

// Smooth scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

scrollToTopBtn.addEventListener("click", scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.visibility = "visible";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
  }
});

// Add CSS for cart item styles
const cartItemStyles = `
  .cart-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }
  
  .cart-item-info {
    flex: 1;
  }
  
  .cart-item-info h4 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .cart-item-price {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .quantity-btn {
    width: 25px;
    height: 25px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-primary);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    transition: all 0.2s ease;
  }
  
  .quantity-btn:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .quantity {
    min-width: 20px;
    text-align: center;
    font-weight: 500;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  .remove-btn:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = cartItemStyles;
document.head.appendChild(styleSheet);
