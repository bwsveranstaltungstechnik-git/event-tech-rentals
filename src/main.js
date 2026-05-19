import { equipmentData, recommendedBundles } from './data/equipment.js';

// APPLICATION STATE
const state = {
  cart: [], // Array of { id, quantity, customBundleSource }
  rentalStartDate: "",
  rentalEndDate: "",
  serviceWanted: false,
  builderStep: 1,
  builderSelections: {
    eventType: "", // 'hochzeit', 'corporate', 'konzert', 'party'
    guestSize: ""   // 'small', 'medium', 'large'
  },
  activePreset: "off",
  activeCategory: "all",
  searchQuery: ""
};

// SVG ICON GENERATOR (Crisp, inline glowing SVGs for premium visuals)
function getSvgIcon(iconType) {
  const base = `<svg class="product-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;
  let path = "";

  switch (iconType) {
    case "moving-head":
      path = `
        <rect x="35" y="70" width="30" height="15" rx="3" fill="#181c2d" stroke="currentColor" stroke-width="2.5"/>
        <path d="M40 70 L40 50 L60 50 L60 70" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="50" cy="45" r="16" fill="#1f2937" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="50" cy="45" r="8" fill="var(--primary-glow)" opacity="0.8"/>
        <line x1="50" y1="29" x2="50" y2="15" stroke="var(--primary-glow)" stroke-width="3" stroke-dasharray="2,2"/>
      `;
      break;
    case "led-wash":
      path = `
        <rect x="42" y="75" width="16" height="10" rx="2" fill="#1f2937"/>
        <line x1="50" y1="75" x2="50" y2="45" stroke="currentColor" stroke-width="4"/>
        <ellipse cx="50" cy="40" rx="22" ry="14" fill="#181c2d" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="42" cy="40" r="3" fill="var(--secondary-glow)"/>
        <circle cx="50" cy="40" r="3" fill="var(--primary-glow)"/>
        <circle cx="58" cy="40" r="3" fill="var(--accent-glow)"/>
      `;
      break;
    case "pixel-tube":
      path = `
        <rect x="46" y="10" width="8" height="70" rx="4" fill="var(--primary-glow)" stroke="currentColor" stroke-width="1.5" style="filter: drop-shadow(0 0 8px var(--primary-glow))"/>
        <rect x="44" y="80" width="12" height="10" rx="1" fill="#1f2937"/>
        <line x1="30" y1="20" x2="70" y2="20" stroke="var(--primary-glow)" stroke-width="0.5" opacity="0.3"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="var(--primary-glow)" stroke-width="0.5" opacity="0.3"/>
      `;
      break;
    case "outdoor-flood":
      path = `
        <polygon points="30,85 70,85 50,65" fill="#111" stroke="currentColor" stroke-width="2"/>
        <rect x="25" y="30" width="50" height="35" rx="3" fill="#1f2937" stroke="currentColor" stroke-width="2.5"/>
        <rect x="32" y="36" width="36" height="23" fill="var(--primary-glow)" opacity="0.8"/>
      `;
      break;
    case "line-array":
      path = `
        <polygon points="30,15 70,18 68,36 32,33" fill="#111" stroke="currentColor" stroke-width="2.5"/>
        <polygon points="32,38 68,41 66,59 34,56" fill="#181c2d" stroke="currentColor" stroke-width="2.5"/>
        <polygon points="34,61 66,64 64,82 36,79" fill="#111" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="50" cy="25" r="4" fill="#333"/>
        <circle cx="50" cy="48" r="4" fill="#333"/>
        <circle cx="50" cy="71" r="4" fill="#333"/>
      `;
      break;
    case "subwoofer":
      path = `
        <rect x="25" y="15" width="50" height="70" rx="4" fill="#111" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="50" cy="38" r="14" fill="#1c1f2e" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="38" r="6" fill="#000"/>
        <circle cx="50" cy="68" r="10" fill="#1c1f2e" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="68" r="4" fill="#000"/>
      `;
      break;
    case "wireless-mic":
      path = `
        <rect x="46" y="35" width="8" height="50" rx="1" fill="#111" stroke="currentColor" stroke-width="2"/>
        <rect x="43" y="15" width="14" height="20" rx="5" fill="#333" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2"/>
        <rect x="48" y="85" width="4" height="6" fill="var(--primary-glow)"/>
      `;
      break;
    case "audio-mixer":
      path = `
        <rect x="15" y="15" width="70" height="70" rx="6" fill="#181c2d" stroke="currentColor" stroke-width="2.5"/>
        <line x1="25" y1="30" x2="25" y2="70" stroke="#ff007f" stroke-width="3"/>
        <line x1="40" y1="30" x2="40" y2="70" stroke="#00f0ff" stroke-width="3"/>
        <line x1="55" y1="30" x2="55" y2="70" stroke="currentColor" stroke-width="3"/>
        <line x1="70" y1="30" x2="70" y2="70" stroke="currentColor" stroke-width="3"/>
        <circle cx="25" cy="45" r="4" fill="#fff"/>
        <circle cx="40" cy="60" r="4" fill="#fff"/>
        <circle cx="55" cy="35" r="4" fill="#fff"/>
        <circle cx="70" cy="50" r="4" fill="#fff"/>
      `;
      break;
    case "projector":
      path = `
        <rect x="20" y="30" width="60" height="35" rx="5" fill="#1f2937" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="65" cy="47" r="12" fill="#111" stroke="currentColor" stroke-width="2"/>
        <circle cx="65" cy="47" r="6" fill="var(--primary-glow)"/>
        <rect x="28" y="65" width="8" height="6" fill="#333"/>
        <rect x="64" y="65" width="8" height="6" fill="#333"/>
      `;
      break;
    case "led-wall":
      path = `
        <rect x="15" y="20" width="70" height="50" rx="2" fill="#111" stroke="currentColor" stroke-width="3"/>
        <rect x="20" y="25" width="60" height="40" fill="var(--accent-glow)" opacity="0.6" style="filter: drop-shadow(0 0 5px var(--accent-glow))"/>
        <polygon points="30,70 20,85 80,85 70,70" fill="none" stroke="currentColor" stroke-width="2.5"/>
      `;
      break;
    case "video-mixer":
      path = `
        <rect x="15" y="20" width="70" height="60" rx="4" fill="#181c2d" stroke="currentColor" stroke-width="2.5"/>
        <rect x="25" y="30" width="20" height="15" rx="1" fill="#ff007f" opacity="0.7"/>
        <rect x="55" y="30" width="20" height="15" rx="1" fill="#00f0ff" opacity="0.7"/>
        <line x1="50" y1="55" x2="50" y2="70" stroke="currentColor" stroke-width="3"/>
        <circle cx="50" cy="62" r="5" fill="#fff"/>
      `;
      break;
    case "stage-platform":
      path = `
        <polygon points="15,45 85,45 95,75 5,75" fill="#111" stroke="currentColor" stroke-width="2.5"/>
        <line x1="20" y1="75" x2="20" y2="85" stroke="currentColor" stroke-width="3"/>
        <line x1="80" y1="75" x2="80" y2="85" stroke="currentColor" stroke-width="3"/>
        <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" stroke-width="3"/>
      `;
      break;
    case "truss":
      path = `
        <rect x="10" y="40" width="80" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="10" y1="40" x2="30" y2="60" stroke="currentColor" stroke-width="1.5"/>
        <line x1="30" y1="40" x2="50" y2="60" stroke="currentColor" stroke-width="1.5"/>
        <line x1="50" y1="40" x2="70" y2="60" stroke="currentColor" stroke-width="1.5"/>
        <line x1="70" y1="40" x2="90" y2="60" stroke="currentColor" stroke-width="1.5"/>
      `;
      break;
    case "chain-hoist":
      path = `
        <rect x="38" y="20" width="24" height="30" rx="3" fill="#111" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="85" stroke="currentColor" stroke-width="3" stroke-dasharray="3,3"/>
        <circle cx="50" cy="85" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      `;
      break;
    default:
      path = `<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>`;
  }

  return base + path + `</svg>`;
}

// DATE HELPERS (Set calendar constraint to starting tomorrow, calculate ranges & factors)
function initDatePickers() {
  const startInput = document.getElementById("rental-start");
  const endInput = document.getElementById("rental-end");
  
  if (!startInput || !endInput) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startFormatted = tomorrow.toISOString().split("T")[0];
  
  const inThreeDays = new Date(tomorrow);
  inThreeDays.setDate(inThreeDays.getDate() + 2);
  const endFormatted = inThreeDays.toISOString().split("T")[0];

  startInput.min = startFormatted;
  startInput.value = startFormatted;
  
  endInput.min = startFormatted;
  endInput.value = endFormatted;

  state.rentalStartDate = startFormatted;
  state.rentalEndDate = endFormatted;

  startInput.addEventListener("change", (e) => {
    state.rentalStartDate = e.target.value;
    endInput.min = e.target.value;
    if (new Date(state.rentalEndDate) < new Date(e.target.value)) {
      endInput.value = e.target.value;
      state.rentalEndDate = e.target.value;
    }
    recalculateDates();
  });

  endInput.addEventListener("change", (e) => {
    state.rentalEndDate = e.target.value;
    recalculateDates();
  });

  recalculateDates();
}

function recalculateDates() {
  const start = new Date(state.rentalStartDate);
  const end = new Date(state.rentalEndDate);
  
  let diffTime = Math.abs(end - start);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive first day

  if (isNaN(diffDays) || diffDays <= 0) {
    diffDays = 1;
  }

  const factor = getFactorForDays(diffDays);
  
  // Update Global Widget Display
  const durationEl = document.getElementById("display-duration");
  if (durationEl) {
    const savingsPercentage = Math.round((1 - (factor / diffDays)) * 100);
    durationEl.innerHTML = `${diffDays} ${diffDays === 1 ? 'Tag' : 'Tage'} <span id="display-factor" style="color: var(--primary-glow); font-weight:700;">(Faktor: ${factor.toFixed(1)}x${savingsPercentage > 0 ? ` / -${savingsPercentage}% Rabatt` : ''})</span>`;
  }

  // Update State & trigger renders
  renderCatalog();
  renderCartDrawer();
  updateInquiryOverview();
}

function getFactorForDays(days) {
  // Event technology industry standard sliding rental scales
  if (days <= 1) return 1.0;
  if (days === 2) return 1.6;
  if (days === 3) return 2.2;
  if (days === 4) return 2.8;
  if (days <= 6) return 3.5;
  if (days <= 9) return 4.5;
  return 5.5; // Huge discounts for long term rentals!
}

// MAIN RENDER ROUTINES

// 1. RENDER CATALOG (Mietkatalog)
function renderCatalog() {
  const grid = document.getElementById("catalog-grid-items");
  if (!grid) return;

  grid.innerHTML = "";

  // Apply filters
  const filtered = equipmentData.filter(item => {
    const matchesCat = state.activeCategory === "all" || item.category === state.activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">Keine Geräte gefunden</p>
        <p style="font-size: 0.9rem;">Verfeinern Sie Ihren Suchbegriff oder wählen Sie eine andere Kategorie.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const cartItem = state.cart.find(c => c.id === item.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    
    // Calculate display pricing (takes date factor into consideration)
    const start = new Date(state.rentalStartDate);
    const end = new Date(state.rentalEndDate);
    const diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (isNaN(diffDays) || diffDays <= 0) diffDays = 1;
    const factor = getFactorForDays(diffDays);
    const calculatedPrice = item.pricePerDay * factor;

    const card = document.createElement("div");
    card.className = "product-card glass-card";
    
    card.innerHTML = `
      <div class="product-icon-container">
        <span class="product-category-label">${item.category}</span>
        <img src="${item.imgSrc}" alt="${item.name}" class="product-img" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">
        <span class="fallback-svg-icon" style="display: none;">${getSvgIcon(item.iconType)}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      
      <ul class="product-specs-list">
        ${item.specs.slice(0, 3).map(s => `<li>${s}</li>`).join("")}
      </ul>
      
      <div class="product-footer">
        <div class="product-price">
          <span>${calculatedPrice.toFixed(2)} €</span>
          <span>Gesamt (${diffDays} ${diffDays === 1 ? 'Tag' : 'Tage'})</span>
        </div>
        
        <div class="quantity-control">
          ${quantityInCart > 0 ? `
            <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span class="qty-display">${quantityInCart}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
          ` : `
            <button class="btn-add-to-cart" data-id="${item.id}" aria-label="In den Warenkorb">
              <svg viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          `}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach Catalog Event Listeners
  grid.querySelectorAll(".btn-add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });

  grid.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === "increase") {
        updateCartQty(id, 1);
      } else {
        updateCartQty(id, -1);
      }
    });
  });
}

// 2. RENDER WARENKORB DRAWER (Cart Details, staff additions, assembly toggles)
function renderCartDrawer() {
  const container = document.getElementById("cart-items-container");
  const badge = document.getElementById("cart-badge-count");
  
  if (!container || !badge) return;

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
  badge.style.display = totalCount > 0 ? "flex" : "none";

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
        </svg>
        <p style="font-family: var(--font-title); font-size: 1.1rem; font-weight:600; color:#fff;">Ihr Warenkorb ist leer</p>
        <p style="font-size: 0.85rem; max-width: 250px;">Fügen Sie Produkte aus unserem Mietkatalog oder über den Event-Kalkulator hinzu.</p>
      </div>
    `;
    
    // Hide footer details on empty cart
    document.getElementById("cart-drawer-footer").style.opacity = "0.3";
    document.getElementById("cart-drawer-footer").style.pointerEvents = "none";
    
    // Reset values
    document.getElementById("cart-subtotal").textContent = "0,00 €";
    document.getElementById("cart-discount-factor").textContent = "-0%";
    document.getElementById("cart-tax").textContent = "0,00 €";
    document.getElementById("cart-total-gross").textContent = "0,00 €";
    return;
  }

  document.getElementById("cart-drawer-footer").style.opacity = "1";
  document.getElementById("cart-drawer-footer").style.pointerEvents = "auto";

  container.innerHTML = "";

  const start = new Date(state.rentalStartDate);
  const end = new Date(state.rentalEndDate);
  const diffTime = Math.abs(end - start);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  if (isNaN(diffDays) || diffDays <= 0) diffDays = 1;
  const factor = getFactorForDays(diffDays);

  let rawSubtotal = 0;

  state.cart.forEach(cartItem => {
    const item = equipmentData.find(e => e.id === cartItem.id);
    if (!item) return;

    const basePrice = item.pricePerDay;
    const itemSubtotal = basePrice * cartItem.quantity * factor;
    rawSubtotal += itemSubtotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    
    row.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="category">${item.category}</div>
        
        <div class="cart-item-price-calc">
          <div class="quantity-control">
            <button class="qty-btn" style="width:24px; height:24px;" data-action="decrease" data-id="${item.id}">-</button>
            <span class="qty-display" style="font-size:0.85rem; width:16px;">${cartItem.quantity}</span>
            <button class="qty-btn" style="width:24px; height:24px;" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <span class="totals">${itemSubtotal.toFixed(2)} €</span>
        </div>
      </div>
      <button class="cart-item-remove-btn" data-id="${item.id}" aria-label="Entfernen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;

    container.appendChild(row);
  });

  // Calculate pricing matrices
  const discountPercent = Math.round((1 - (factor / diffDays)) * 100);
  
  let setupCost = 0;
  if (state.serviceWanted) {
    // Deliver & Setup is roughly 15% of total equipment, minimum 150 EUR
    setupCost = Math.max(150.00, rawSubtotal * 0.15);
    document.getElementById("setup-row").style.display = "flex";
    document.getElementById("cart-setup-cost").textContent = `${setupCost.toFixed(2)} €`;
  } else {
    document.getElementById("setup-row").style.display = "none";
  }

  const grossTotal = rawSubtotal + setupCost;
  const taxContent = grossTotal * 0.19 / 1.19; // Backwards VAT 19%

  // Update Cart Drawer Summary Displays
  document.getElementById("cart-subtotal").textContent = `${rawSubtotal.toFixed(2)} €`;
  document.getElementById("cart-discount-factor").textContent = `-${discountPercent}%`;
  document.getElementById("cart-tax").textContent = `${taxContent.toFixed(2)} €`;
  document.getElementById("cart-total-gross").textContent = `${grossTotal.toFixed(2)} €`;

  // Attach Event listeners to Cart drawer controls
  container.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === "increase") {
        updateCartQty(id, 1);
      } else {
        updateCartQty(id, -1);
      }
    });
  });

  container.querySelectorAll(".cart-item-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

// CART LOGIC WRAPPERS
function addToCart(id) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id, quantity: 1 });
  }
  recalculateDates();
  openCartDrawer();
}

function updateCartQty(id, change) {
  const item = state.cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    recalculateDates();
  }
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  recalculateDates();
}

function openCartDrawer() {
  document.getElementById("cart-drawer").classList.add("active");
  document.getElementById("cart-drawer-overlay").classList.add("active");
}

function closeCartDrawer() {
  document.getElementById("cart-drawer").classList.remove("active");
  document.getElementById("cart-drawer-overlay").classList.remove("active");
}

// 3. RENDER EVENT BUILDER (Intelligenter Kalkulator)
function initEventBuilder() {
  const optionCards = document.querySelectorAll(".builder-option-card");
  const sizeCards = document.querySelectorAll(".builder-size-card");
  
  const btnNext = document.getElementById("btn-builder-next");
  const btnPrev = document.getElementById("btn-builder-prev");

  // Step 1 Click selections
  optionCards.forEach(card => {
    card.addEventListener("click", () => {
      optionCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.builderSelections.eventType = card.dataset.event;
      validateBuilderSteps();
    });
  });

  // Step 2 Click selections
  sizeCards.forEach(card => {
    card.addEventListener("click", () => {
      sizeCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.builderSelections.guestSize = card.dataset.size;
      validateBuilderSteps();
    });
  });

  btnNext.addEventListener("click", () => {
    if (state.builderStep < 3) {
      changeBuilderStep(state.builderStep + 1);
    }
  });

  btnPrev.addEventListener("click", () => {
    if (state.builderStep > 1) {
      changeBuilderStep(state.builderStep - 1);
    }
  });

  document.getElementById("btn-add-bundle").addEventListener("click", () => {
    addRecommendedBundleToCart();
  });
}

function validateBuilderSteps() {
  const btnNext = document.getElementById("btn-builder-next");
  if (state.builderStep === 1) {
    btnNext.disabled = !state.builderSelections.eventType;
  } else if (state.builderStep === 2) {
    btnNext.disabled = !state.builderSelections.guestSize;
  }
}

function changeBuilderStep(nextStep) {
  // Hide current pane
  document.getElementById(`step-pane-${state.builderStep}`).classList.remove("active");
  
  // Set new step
  state.builderStep = nextStep;
  
  // Show new pane
  document.getElementById(`step-pane-${state.builderStep}`).classList.add("active");

  // Update indicators
  const indicators = document.querySelectorAll(".builder-step-indicator");
  indicators.forEach((indicator, index) => {
    const indicatorStep = index + 1;
    indicator.classList.remove("active", "completed");
    
    if (indicatorStep === state.builderStep) {
      indicator.classList.add("active");
    } else if (indicatorStep < state.builderStep) {
      indicator.classList.add("completed");
    }
  });

  // Footer Buttons adjustment
  const btnPrev = document.getElementById("btn-builder-prev");
  const btnNext = document.getElementById("btn-builder-next");

  btnPrev.style.visibility = state.builderStep === 1 ? "hidden" : "visible";
  
  if (state.builderStep === 3) {
    btnNext.style.display = "none";
    generateRecommendation();
  } else {
    btnNext.style.display = "inline-flex";
    btnNext.textContent = "Weiter";
    validateBuilderSteps();
  }
}

function generateRecommendation() {
  const event = state.builderSelections.eventType;
  const size = state.builderSelections.guestSize;

  const bundle = recommendedBundles[event];
  if (!bundle) return;

  // Scale quantities and fees based on audience capacity sizes
  let scaleFactor = 1.0;
  if (size === "small") scaleFactor = 0.6;
  if (size === "large") scaleFactor = 2.0;

  const titleEl = document.getElementById("recommendation-title");
  const descEl = document.getElementById("recommendation-desc");
  const specsGrid = document.getElementById("recommendation-specs-list");

  titleEl.textContent = bundle.name;
  descEl.textContent = bundle.description + ` (${bundle.recommendedSize}).`;

  // Clear list
  specsGrid.innerHTML = "";

  // Render scaling details
  bundle.items.forEach(item => {
    const finalQty = Math.max(1, Math.round(item.quantity * scaleFactor));
    const li = document.createElement("li");
    li.textContent = `${finalQty}x ${item.name}`;
    specsGrid.appendChild(li);
  });

  // Math totals
  const basePrice = bundle.basePrice * scaleFactor;
  const setupPrice = bundle.setupFee * scaleFactor;
  const totalPrice = basePrice + setupPrice;

  document.getElementById("recom-base-price").textContent = `${basePrice.toFixed(2)} €`;
  document.getElementById("recom-setup-price").textContent = `${setupPrice.toFixed(2)} €`;
  document.getElementById("recom-total-price").textContent = `${totalPrice.toFixed(2)} €`;
}

function addRecommendedBundleToCart() {
  const event = state.builderSelections.eventType;
  const size = state.builderSelections.guestSize;
  const bundle = recommendedBundles[event];
  
  if (!bundle) return;

  let scaleFactor = 1.0;
  if (size === "small") scaleFactor = 0.6;
  if (size === "large") scaleFactor = 2.0;

  // Add all items to cart drawer
  bundle.items.forEach(bundleItem => {
    const finalQty = Math.max(1, Math.round(bundleItem.quantity * scaleFactor));
    const existing = state.cart.find(c => c.id === bundleItem.id);
    
    if (existing) {
      existing.quantity += finalQty;
    } else {
      state.cart.push({ id: bundleItem.id, quantity: finalQty });
    }
  });

  // Enable deliver and setup toggle automatically since bundles have setupFees
  state.serviceWanted = true;
  const serviceCheckbox = document.getElementById("cart-service-toggle");
  if (serviceCheckbox) serviceCheckbox.checked = true;

  recalculateDates();
  openCartDrawer();

  // Reset builder back to step 1
  changeBuilderStep(1);
  state.builderSelections.eventType = "";
  state.builderSelections.guestSize = "";
  document.querySelectorAll(".builder-option-card").forEach(c => c.classList.remove("selected"));
  document.querySelectorAll(".builder-size-card").forEach(c => c.classList.remove("selected"));
}

// 4. RENDER INQUIRY FUNNEL OVERVIEW (Anfrage-Formular)
function updateInquiryOverview() {
  const startVal = document.getElementById("overview-start-val");
  const endVal = document.getElementById("overview-end-val");
  const list = document.getElementById("funnel-overview-items");
  
  if (!startVal || !endVal || !list) return;

  // Format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  startVal.textContent = formatDate(state.rentalStartDate);
  endVal.textContent = formatDate(state.rentalEndDate);

  list.innerHTML = "";

  if (state.cart.length === 0) {
    list.innerHTML = `<li class="overview-item">Warenkorb leer</li>`;
    document.getElementById("funnel-display-total").textContent = "0,00 €";
    return;
  }

  const start = new Date(state.rentalStartDate);
  const end = new Date(state.rentalEndDate);
  const diffTime = Math.abs(end - start);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  if (isNaN(diffDays) || diffDays <= 0) diffDays = 1;
  const factor = getFactorForDays(diffDays);

  let rawSubtotal = 0;

  state.cart.forEach(cartItem => {
    const item = equipmentData.find(e => e.id === cartItem.id);
    if (!item) return;

    const itemTotal = item.pricePerDay * cartItem.quantity * factor;
    rawSubtotal += itemTotal;

    const li = document.createElement("li");
    li.className = "overview-item";
    li.innerHTML = `
      <span>${cartItem.quantity}x ${item.name}</span>
      <span>${itemTotal.toFixed(2)} €</span>
    `;
    list.appendChild(li);
  });

  let setupCost = 0;
  if (state.serviceWanted) {
    setupCost = Math.max(150.00, rawSubtotal * 0.15);
    document.getElementById("funnel-display-setup").textContent = `${setupCost.toFixed(2)} €`;
  } else {
    document.getElementById("funnel-display-setup").textContent = "Selbstabholung";
  }

  const grossTotal = rawSubtotal + setupCost;

  document.getElementById("funnel-display-duration").textContent = `${diffDays} ${diffDays === 1 ? 'Tag' : 'Tage'} (Faktor: ${factor.toFixed(1)}x)`;
  document.getElementById("funnel-display-total").textContent = `${grossTotal.toFixed(2)} €`;
}

// 5. LIGHTSHOW PRESETS REGULATION (Lichtshow-Simulator)
function initSimulator() {
  const buttons = document.querySelectorAll(".preset-btn");
  const stage = document.getElementById("stage-viewport");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const preset = btn.dataset.preset;
      state.activePreset = preset;
      stage.setAttribute("data-theme", preset);
    });
  });
}

// CATEGORY FILTERS & SEARCH
function initCatalogFilters() {
  const tabs = document.querySelectorAll(".catalog-tab");
  const searchInput = document.getElementById("catalog-search-input");
  const indicator = document.querySelector(".catalog-tab-indicator");

  function updateIndicator(activeTab) {
    if (!indicator || !activeTab) return;
    indicator.style.left = `${activeTab.offsetLeft}px`;
    indicator.style.top = `${activeTab.offsetTop}px`;
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.height = `${activeTab.offsetHeight}px`;
  }

  // Initialize initial position on load
  const initialActive = document.querySelector(".catalog-tab.active");
  if (initialActive) {
    setTimeout(() => updateIndicator(initialActive), 100);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      updateIndicator(tab);
      
      state.activeCategory = tab.dataset.cat;
      renderCatalog();
    });
  });

  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".catalog-tab.active");
    if (currentActive) updateIndicator(currentActive);
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }
}

// GENERAL DRAWER CONTROL HANDLERS
function initHeaderScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initDrawerActions() {
  const cartBtn = document.getElementById("cart-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const overlay = document.getElementById("cart-drawer-overlay");
  const checkoutBtn = document.getElementById("btn-cart-checkout");

  if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (overlay) overlay.addEventListener("click", closeCartDrawer);

  const serviceCheckbox = document.getElementById("cart-service-toggle");
  if (serviceCheckbox) {
    serviceCheckbox.addEventListener("change", (e) => {
      state.serviceWanted = e.target.checked;
      recalculateDates();
    });
  }

  // Checkout transitions smoothly into the quotation form section
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      closeCartDrawer();
      const inquirySection = document.getElementById("kontakt");
      if (inquirySection) {
        inquirySection.classList.add("active");
        inquirySection.scrollIntoView({ behavior: "smooth" });
        updateInquiryOverview();
      }
    });
  }
}

// BOOKING REQUEST FORM INQUIRY FUNNEL SUBMIT
function initBookingForm() {
  const form = document.getElementById("booking-request-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fetch form fields
    const name = document.getElementById("client-name").value;
    const location = document.getElementById("event-location").value;
    const needsPersonal = document.getElementById("check-personal").checked;

    // Calculate final totals for success report
    const start = new Date(state.rentalStartDate);
    const end = new Date(state.rentalEndDate);
    const diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (isNaN(diffDays) || diffDays <= 0) diffDays = 1;
    const factor = getFactorForDays(diffDays);

    let rawSubtotal = 0;
    state.cart.forEach(c => {
      const item = equipmentData.find(e => e.id === c.id);
      if (item) rawSubtotal += item.pricePerDay * c.quantity * factor;
    });

    let setupCost = 0;
    if (state.serviceWanted) {
      setupCost = Math.max(150.00, rawSubtotal * 0.15);
    }
    const finalGrossTotal = rawSubtotal + setupCost;

    // Format Dates nicely
    const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    // Random Offer Number generator
    const offerNum = Math.floor(10000 + Math.random() * 90000);

    // Populate Success Modal Fields
    document.getElementById("success-invoice-num").textContent = `ANGEBOT #BWS-${offerNum}`;
    document.getElementById("success-client-name").textContent = name;
    document.getElementById("success-event-loc").textContent = location;
    document.getElementById("success-dates").textContent = `${formatDate(state.rentalStartDate)} - ${formatDate(state.rentalEndDate)}`;
    document.getElementById("success-personal-status").textContent = needsPersonal ? "Ja, Technik-Crew vor Ort" : "Nein, nur Verleih";
    document.getElementById("success-gross-total").textContent = `${finalGrossTotal.toFixed(2)} €`;

    // Display success screen
    document.getElementById("booking-success-modal").classList.add("active");
  });

  // Success Modal close handler
  document.getElementById("btn-success-close").addEventListener("click", () => {
    document.getElementById("booking-success-modal").classList.remove("active");
    
    // Clear cart and state parameters
    state.cart = [];
    state.serviceWanted = false;
    const serviceCheckbox = document.getElementById("cart-service-toggle");
    if (serviceCheckbox) serviceCheckbox.checked = false;
    
    // Reset Form
    form.reset();

    // Refresh UI
    recalculateDates();
    
    // Hide funnel section
    document.getElementById("kontakt").classList.remove("active");

    // Scroll back to Home
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });
}

// INTERCEPT #KONTAKT LINKS TO ACTIVATE FUNNEL
function initInquiryLinks() {
  const inquirySection = document.getElementById("kontakt");
  if (!inquirySection) return;

  const activateAndScroll = (e) => {
    e.preventDefault();
    inquirySection.classList.add("active");
    if (typeof updateInquiryOverview === "function") {
      updateInquiryOverview();
    }
    setTimeout(() => {
      inquirySection.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  document.querySelectorAll('a[href="#kontakt"]').forEach(link => {
    link.addEventListener("click", activateAndScroll);
  });
}

// INLINE NAVIGATION HIGHLIGHTS
function initNavigationHighlights() {
  const sections = document.querySelectorAll("main > section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute("id");
      }
    });

    // Special funnel handling
    const inquirySection = document.getElementById("kontakt");
    if (inquirySection && inquirySection.classList.contains("active") && window.scrollY >= (inquirySection.offsetTop - 120)) {
      current = "kontakt";
    }

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

// INITIALIZER DELEGATOR
window.addEventListener("DOMContentLoaded", () => {
  initDatePickers();
  renderCatalog();
  renderCartDrawer();
  
  initHeaderScroll();
  initDrawerActions();
  initEventBuilder();
  initSimulator();
  initCatalogFilters();
  initBookingForm();
  initInquiryLinks();
  initNavigationHighlights();
});
