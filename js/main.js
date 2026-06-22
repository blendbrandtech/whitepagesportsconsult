// ============================================================
// WHITEPAGE SPORTS CONSULT GH — Shared Scripts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Page Loader ---- */
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 300);
    });
    // fallback in case load already fired
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }

  /* ---- Sticky Header on Scroll ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }
    // back to top button
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      if (window.scrollY > 500) btt.classList.add('show');
      else btt.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---- Mobile Menu Toggle ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- Back to Top ---- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Scroll Reveal Animations ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  /* ---- Active Nav Link Highlight ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Shop Filter (if present) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');
  if (filterBtns.length && products.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        products.forEach(p => {
          if (cat === 'all' || p.dataset.category === cat) {
            p.style.display = '';
          } else {
            p.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Cart System ---- */
  initCart();
});

/* ============================================================
   Cart Logic (localStorage based)
   ============================================================ */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('wp_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('wp_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function addToCart(id, name, price, img) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, img, qty: 1 });
  }
  saveCart(cart);
  renderCart();
  openCart();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const container = document.querySelector('.cart-items');
  const totalEl = document.querySelector('.cart-total-amount');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <p style="margin-top:8px;">Browse the shop and add some kits or gear.</p>
      </div>`;
    if (totalEl) totalEl.textContent = 'GHS 0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-thumb img-placeholder" style="min-height:64px; font-size:0.6rem;"></div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>GHS ${item.price.toFixed(2)} &times; ${item.qty}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" title="Remove item">&times;</button>
      </div>`;
  }).join('');

  if (totalEl) totalEl.textContent = `GHS ${total.toFixed(2)}`;

  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

function openCart() {
  document.querySelector('.cart-drawer')?.classList.add('open');
  document.querySelector('.cart-overlay')?.classList.add('open');
}

function closeCart() {
  document.querySelector('.cart-drawer')?.classList.remove('open');
  document.querySelector('.cart-overlay')?.classList.remove('open');
}

function initCart() {
  updateCartCount();
  renderCart();

  document.querySelectorAll('.nav-cart, .cart-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCart);

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const { id, name, price } = btn.dataset;
      addToCart(id, name, parseFloat(price), '');
    });
  });

  // Checkout button (demo only)
  document.querySelector('.checkout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;
    alert('Thank you! This is a demo checkout. Connect a payment gateway (e.g. Paystack / Stripe) to enable real orders.');
  });
}
