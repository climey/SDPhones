/* =====================
   STORAGE HELPERS
   ===================== */
const STORAGE_KEYS = {
  products: 'sdphones_products',
  cart: 'sdphones_cart',
  compare: 'sdphones_compare',
  theme: 'sdphones_theme',
};

function getProducts() {
  const raw = localStorage.getItem(STORAGE_KEYS.products);
  if (raw) return JSON.parse(raw);
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

function getCart() {
  const raw = localStorage.getItem(STORAGE_KEYS.cart);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
}

function getCompare() {
  const raw = localStorage.getItem(STORAGE_KEYS.compare);
  return raw ? JSON.parse(raw) : [];
}

function saveCompare(list) {
  localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(list));
}

/* =====================
   PRODUTOS PADRÃO
   ===================== */
const DEFAULT_PRODUCTS = [
  {
    id: '1',
    model: 'iPhone 14',
    name: 'iPhone 14 128GB',
    color: 'Meia-noite',
    storage: '128GB',
    ram: '6GB',
    camera: '12MP',
    battery: '3279mAh',
    condition: 'Novo',
    price: 2990,
    priceOld: 3290,
    image: '',
    description: 'iPhone 14 novo, lacrado. Factory Unlocked — funciona com qualquer operadora. Chip A15 Bionic, tela Super Retina XDR 6.1".',
  },
  {
    id: '2',
    model: 'iPhone 14',
    name: 'iPhone 14 256GB',
    color: 'Roxo',
    storage: '256GB',
    ram: '6GB',
    camera: '12MP',
    battery: '3279mAh',
    condition: 'Novo',
    price: 3190,
    priceOld: 3490,
    image: '',
    description: 'iPhone 14 novo, lacrado. Factory Unlocked — funciona com qualquer operadora. Chip A15 Bionic, câmera dupla 12MP.',
  },
  {
    id: '3',
    model: 'iPhone 15',
    name: 'iPhone 15 128GB',
    color: 'Preto',
    storage: '128GB',
    ram: '6GB',
    camera: '48MP',
    battery: '3877mAh',
    condition: 'Novo',
    price: 4190,
    priceOld: 4590,
    image: '',
    description: 'iPhone 15 novo, lacrado. USB-C, chip A16 Bionic, câmera principal de 48MP. Factory Unlocked.',
  },
  {
    id: '4',
    model: 'iPhone 15 Pro',
    name: 'iPhone 15 Pro 256GB',
    color: 'Titânio Natural',
    storage: '256GB',
    ram: '8GB',
    camera: '48MP',
    battery: '3274mAh',
    condition: 'Novo',
    price: 4990,
    priceOld: 5490,
    image: '',
    description: 'iPhone 15 Pro novo, lacrado. Corpo em titânio aeroespacial, chip A17 Pro, câmera 48MP com zoom 3x.',
  },
  {
    id: '5',
    model: 'iPhone 16',
    name: 'iPhone 16 128GB',
    color: 'Branco',
    storage: '128GB',
    ram: '8GB',
    camera: '48MP',
    battery: '3561mAh',
    condition: 'Novo',
    price: 5190,
    priceOld: 5490,
    image: '',
    description: 'iPhone 16 novo, lacrado. Chip A18, câmera 48MP, botão de controle de câmera. Factory Unlocked.',
  },
  {
    id: '6',
    model: 'iPhone 16',
    name: 'iPhone 16 256GB',
    color: 'Preto',
    storage: '256GB',
    ram: '8GB',
    camera: '48MP',
    battery: '3561mAh',
    condition: 'Novo',
    price: 5490,
    priceOld: 5990,
    image: '',
    description: 'iPhone 16 256GB novo, lacrado. Chip A18, câmera 48MP, Dynamic Island. Factory Unlocked.',
  },
  {
    id: '7',
    model: 'iPhone 17 Pro Max',
    name: 'iPhone 17 Pro Max 256GB',
    color: 'Cosmic Orange',
    storage: '256GB',
    ram: '8GB',
    camera: '48MP',
    battery: '5000mAh',
    condition: 'Novo',
    price: 9490,
    priceOld: 10490,
    image: 'iphone17-orange-front.jpg',
    description: 'iPhone 17 Pro Max novo, lacrado. Chip A19 Pro, tela OLED 6.9" ProMotion 120Hz, câmera tripla 48MP com zoom 8x, bateria recorde. Design unibody alumínio com vapor chamber. eSIM. Fotos reais do produto.',
  },
  {
    id: '8',
    model: 'iPhone 17 Pro Max',
    name: 'iPhone 17 Pro Max 256GB',
    color: 'Silver',
    storage: '256GB',
    ram: '8GB',
    camera: '48MP',
    battery: '5000mAh',
    condition: 'Novo',
    price: 9490,
    priceOld: 10490,
    image: 'iphone17-silver-front.jpg',
    description: 'iPhone 17 Pro Max Silver novo, lacrado. Chip A19 Pro, tela OLED 6.9" ProMotion 120Hz, câmera tripla 48MP com zoom 8x. Design unibody alumínio. eSIM. Fotos reais do produto.',
  },
];

/* =====================
   ESTADO GLOBAL
   ===================== */
let currentFilter = 'todos';
let currentSort = 'default';
let currentProduct = null;

/* =====================
   THEME
   ===================== */
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.theme, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* =====================
   FORMATAÇÃO
   ===================== */
function formatPrice(n) {
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
}

/* =====================
   SVG PLACEHOLDER POR MODELO
   ===================== */
function getPhoneSVG(model, condition) {
  const colors = {
    'iPhone 13': ['#1a1a1a','#2a2a2a','#111'],
    'iPhone 13 Mini': ['#1a1a1a','#2a2a2a','#111'],
    'iPhone 14': ['#2d1f4e','#4a3580','#1e1535'],
    'iPhone 14 Pro': ['#c8a84b','#a88a30','#1a1a1a'],
    'iPhone 14 Pro Max': ['#c8a84b','#a88a30','#1a1a1a'],
    'iPhone 15': ['#222','#333','#1a1a1a'],
    'iPhone 15 Pro': ['#bdb8ae','#9e9990','#1a1a1a'],
    'iPhone 15 Pro Max': ['#bdb8ae','#9e9990','#1a1a1a'],
    'iPhone 16': ['#e8e4dc','#ccc8c0','#f5f3ef'],
    'iPhone 16 Pro': ['#2a2a2a','#3a3a3a','#1a1a1a'],
    'iPhone 16 Pro Max': ['#2a2a2a','#3a3a3a','#1a1a1a'],
    'iPhone 17 Pro Max': ['#d4520a','#b84208','#a33a06'],
  };
  const c = colors[model] || ['#222','#333','#1a1a1a'];
  return `<svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:82%;height:82%;">
    <rect x="10" y="5" width="80" height="190" rx="18" fill="${c[0]}" stroke="${c[1]}" stroke-width="2"/>
    <rect x="18" y="16" width="64" height="138" rx="7" fill="${c[2]}"/>
    <rect x="42" y="8" width="16" height="4" rx="2" fill="${c[1]}"/>
    <circle cx="50" cy="10" r="2" fill="${c[0]}"/>
    <rect x="22" y="160" width="56" height="28" rx="8" fill="${c[0]}" stroke="${c[1]}" stroke-width="1"/>
  </svg>`;
}

/* =====================
   RENDER PRODUCTS
   ===================== */
function renderProducts() {
  const products = getProducts();
  const search = (document.getElementById('search')?.value || '').toLowerCase();

  let filtered = products.filter(p => {
    const matchFilter = currentFilter === 'todos' || p.model.toLowerCase().includes(currentFilter.toLowerCase());
    const matchSearch = !search || p.name.toLowerCase().includes(search) || p.model.toLowerCase().includes(search) || p.color.toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === 'new') filtered.sort((a, b) => a.condition === 'Novo' ? -1 : 1);

  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');

  if (!filtered.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  const compare = getCompare();

  const cards = filtered.map(p => {
    const inCompare = compare.includes(p.id);
    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy"/>`
      : getPhoneSVG(p.model, p.condition);

    return `
      <div class="card" onclick="openModal('${p.id}')">
        <span class="card-badge ${p.condition === 'Novo' ? 'badge-new' : 'badge-new'}">${p.condition}</span>
        <div class="card-img">${imgContent}</div>
        <div class="card-model">${p.model}</div>
        <div class="card-name">${p.storage} · ${p.color}</div>
        <div class="card-specs">${p.ram} RAM · ${p.camera} · ${p.battery}</div>
        ${p.priceOld ? `<div class="card-price-old">${formatPrice(p.priceOld)}</div>` : ''}
        <div class="card-price">${formatPrice(p.price)}</div>
        <div class="card-actions">
          <button class="card-btn-primary" onclick="event.stopPropagation(); openModal('${p.id}')">Ver opções</button>
          <button class="card-btn-secondary ${inCompare ? 'added' : ''}" onclick="event.stopPropagation(); toggleCompare('${p.id}', this)">
            ${inCompare ? '✓ Comparando' : 'Comparar'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = cards;
}

/* =====================
   FILTROS
   ===================== */
function setFilter(btn) {
  currentFilter = btn.dataset.filter;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

function setSort(val) {
  currentSort = val;
  renderProducts();
}

/* =====================
   MODAL PRODUTO
   ===================== */
function openModal(id) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;

  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}"/>`
    : getPhoneSVG(p.model, p.condition);

  document.getElementById('modal-img').innerHTML = imgContent;
  document.getElementById('modal-category').textContent = p.model + ' · Lacrado';
  document.getElementById('modal-name').textContent = p.name + ' · ' + p.color;
  document.getElementById('modal-desc').textContent = p.description || '';
  document.getElementById('modal-price').textContent = formatPrice(p.price);
  document.getElementById('modal-price-old').textContent = p.priceOld ? formatPrice(p.priceOld) : '';

  document.getElementById('modal-specs').innerHTML = [
    { label: 'Armazenamento', value: p.storage },
    { label: 'RAM', value: p.ram },
    { label: 'Câmera', value: p.camera },
    { label: 'Bateria', value: p.battery },
  ].map(s => `
    <div class="modal-spec-item">
      <div class="modal-spec-label">${s.label}</div>
      <div class="modal-spec-value">${s.value}</div>
    </div>
  `).join('');

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function buyNow() {
  if (!currentProduct) return;
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no seguinte produto da SD Phones:\n\n` +
    `📱 *${currentProduct.name} · ${currentProduct.color}*\n` +
    `💾 ${currentProduct.storage} · ${currentProduct.ram} RAM\n` +
    `💰 ${formatPrice(currentProduct.price)}\n\n` +
    `Pode me passar mais informações?`
  );
  window.open(`https://wa.me/5579999999999?text=${msg}`, '_blank');
}

/* =====================
   CARRINHO
   ===================== */
function addToCartFromModal() {
  if (!currentProduct) return;
  addToCart(currentProduct.id);
}

function addToCart(id) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;

  const cart = getCart();
  if (!cart.find(c => c.id === id)) {
    cart.push({ id: p.id, name: p.name + ' · ' + p.color, price: p.price, storage: p.storage, image: p.image, model: p.model });
    saveCart(cart);
  }
  updateCartBadge();

  const btn = document.getElementById('modal-cart');
  if (btn) {
    btn.textContent = '✓ Adicionado';
    btn.style.borderColor = '#4ade80';
    btn.style.color = '#4ade80';
  }
}

function removeFromCart(id) {
  const cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCartDrawer();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const n = getCart().length;
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = n;
    if (n > 0) badge.classList.remove('hidden');
    else badge.classList.add('hidden');
  }
}

function openCart() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.remove('hidden');
  document.getElementById('drawer-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.add('hidden');
  document.getElementById('drawer-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const cart = getCart();
  const items = document.getElementById('cart-items');
  const total = document.getElementById('cart-total-value');

  if (!cart.length) {
    items.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.</div>';
    total.textContent = formatPrice(0);
    return;
  }

  items.innerHTML = cart.map(c => {
    const imgContent = c.image
      ? `<img src="${c.image}" alt="${c.name}"/>`
      : getPhoneSVG(c.model, '');
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgContent}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-price">${formatPrice(c.price)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${c.id}')">✕</button>
      </div>
    `;
  }).join('');

  const sum = cart.reduce((acc, c) => acc + c.price, 0);
  total.textContent = formatPrice(sum);
}

function sendCartToWhatsApp() {
  const cart = getCart();
  if (!cart.length) return;

  const lines = cart.map(c => `📱 *${c.name}* — ${formatPrice(c.price)}`).join('\n');
  const total = cart.reduce((acc, c) => acc + c.price, 0);
  const msg = encodeURIComponent(
    `Olá! Gostaria de fazer o seguinte pedido pela SD Phones:\n\n${lines}\n\n` +
    `💰 *Total: ${formatPrice(total)}*\n\nPode me confirmar a disponibilidade?`
  );
  window.open(`https://wa.me/5579999999999?text=${msg}`, '_blank');
}

/* =====================
   COMPARAR
   ===================== */
function toggleCompare(id, btn) {
  const compare = getCompare();
  const idx = compare.indexOf(id);

  if (idx !== -1) {
    compare.splice(idx, 1);
    if (btn) { btn.textContent = 'Comparar'; btn.classList.remove('added'); }
  } else {
    if (compare.length >= 3) {
      alert('Você pode comparar até 3 produtos.');
      return;
    }
    compare.push(id);
    if (btn) { btn.textContent = '✓ Comparando'; btn.classList.add('added'); }
  }

  saveCompare(compare);
  updateCompareBadge();
}

function updateCompareBadge() {
  const n = getCompare().length;
  const el = document.getElementById('compare-count');
  if (el) el.textContent = n;
}

function openCompare() {
  renderCompareDrawer();
  document.getElementById('compare-drawer').classList.remove('hidden');
  document.getElementById('compare-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCompare() {
  document.getElementById('compare-drawer').classList.add('hidden');
  document.getElementById('compare-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function clearCompare() {
  saveCompare([]);
  updateCompareBadge();
  renderProducts();
  closeCompare();
}

function renderCompareDrawer() {
  const compare = getCompare();
  const products = getProducts();
  const items = document.getElementById('compare-items');

  if (!compare.length) {
    items.innerHTML = '<div class="cart-empty">Nenhum produto selecionado para comparar.</div>';
    return;
  }

  const ps = compare.map(id => products.find(p => p.id === id)).filter(Boolean);

  const cards = ps.map(p => {
    const imgContent = p.image ? `<img src="${p.image}" alt="${p.name}"/>` : getPhoneSVG(p.model, p.condition);
    return `
      <div class="compare-card">
        <button class="compare-remove" onclick="toggleCompare('${p.id}'); renderCompareDrawer(); updateCompareBadge(); renderProducts();">✕</button>
        <div class="compare-card-img">${imgContent}</div>
        <div class="compare-card-name">${p.name} · ${p.color}</div>
        <div class="compare-card-price">${formatPrice(p.price)}</div>
      </div>
    `;
  }).join('');

  const specs = [
    { label: 'Condição', key: 'condition' },
    { label: 'Armazenamento', key: 'storage' },
    { label: 'RAM', key: 'ram' },
    { label: 'Câmera', key: 'camera' },
    { label: 'Bateria', key: 'battery' },
    { label: 'Preço', key: 'price', format: formatPrice },
  ];

  const specRows = specs.map(s => {
    const vals = ps.map(p => s.format ? s.format(p[s.key]) : p[s.key]);
    const best = s.key === 'price'
      ? Math.min(...ps.map(p => p[s.key]))
      : null;

    const cells = ps.map((p, i) => {
      const val = vals[i];
      const isBest = s.key === 'price' && p.price === best;
      return `<div class="compare-row-value ${isBest ? 'compare-row-best' : ''}">${val}</div>`;
    }).join('');

    const colStyle = `grid-template-columns: 120px ${ps.map(() => '1fr').join(' ')}`;
    return `<div class="compare-row" style="${colStyle}"><div class="compare-row-label">${s.label}</div>${cells}</div>`;
  }).join('');

  const colStyleCards = `grid-template-columns: repeat(${ps.length}, 1fr)`;

  items.innerHTML = `
    <div class="compare-grid" style="${colStyleCards}">${cards}</div>
    <div class="compare-specs">${specRows}</div>
  `;
}

/* =====================
   INIT
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  updateCartBadge();
  updateCompareBadge();
});

/* =====================
   NAV GLASSMORPHISM
   ===================== */
(function() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
})();

/* =====================
   BANNER CAROUSEL
   ===================== */
(function() {
  const track = document.getElementById('banner-track');
  const dots = document.querySelectorAll('.banner-dot');
  if (!track) return;

  let current = 0;
  const total = 3;
  let timer;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  window.bannerNext = () => { goTo(current + 1); resetTimer(); };
  window.bannerPrev = () => { goTo(current - 1); resetTimer(); };
  window.bannerGo   = (i) => { goTo(i); resetTimer(); };

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  resetTimer();
})();

/* =====================
   HERO DOTS ANIMATION
   ===================== */
(function () {
  const canvas = document.getElementById('hero-dots');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const SEPARATION = 38;
  let COLS, ROWS, dots, count = 0, raf;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function resize() {
    const hero = canvas.parentElement;
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    COLS = Math.ceil(canvas.width  / SEPARATION) + 2;
    ROWS = Math.ceil(canvas.height / SEPARATION) + 2;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let ix = 0; ix < COLS; ix++) {
      for (let iy = 0; iy < ROWS; iy++) {
        dots.push({ ix, iy });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = isDark() ? '255,255,255' : '0,0,0';

    for (const { ix, iy } of dots) {
      const x = ix * SEPARATION;
      // sine wave Y offset — igual ao Three.js original
      const wave = Math.sin((ix + count) * 0.3) * 6 + Math.sin((iy + count) * 0.5) * 6;
      const y = iy * SEPARATION + wave;

      // tamanho do ponto também oscila com a onda
      const size = 1.2 + (Math.sin((ix + count) * 0.3) + Math.sin((iy + count) * 0.5) + 2) * 0.6;

      // opacidade baseada na onda
      const alpha = 0.3 + (Math.sin((ix + count) * 0.3) + 1) * 0.25;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${alpha.toFixed(2)})`;
      ctx.fill();
    }

    count += 0.04;
    raf = requestAnimationFrame(draw);
  }

  // Pausa animação quando fora da viewport para economizar GPU
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!raf) draw();
    } else {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }, { threshold: 0.1 });

  observer.observe(canvas.parentElement);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = null;
    resize();
    draw();
  }, { passive: true });

  // Atualizar cor ao trocar de tema
  const themeObserver = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = null;
    draw();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  draw();
})();

/* =====================
   SOCIAL PROOF NOTIFICATIONS
   ===================== */
(function () {
  const EVENTS = [
    { name: 'Rafael Pereira',  city: 'Simão Dias',     product: 'iPhone 16 128GB',     model: 'iPhone 16' },
    { name: 'Camila Santos',   city: 'Lagarto',        product: 'iPhone 15 Pro 256GB',  model: 'iPhone 15 Pro' },
    { name: 'Lucas Oliveira',  city: 'Itabaiana',      product: 'iPhone 14 256GB',      model: 'iPhone 14' },
    { name: 'Ana Ferreira',    city: 'Aracaju',        product: 'iPhone 16 256GB',      model: 'iPhone 16' },
    { name: 'Marcos Costa',    city: 'Estância',       product: 'iPhone 15 128GB',      model: 'iPhone 15' },
    { name: 'Juliana Lima',    city: 'Simão Dias',     product: 'iPhone 14 128GB',      model: 'iPhone 14' },
    { name: 'Pedro Alves',     city: 'Tobias Barreto', product: 'iPhone 15 Pro 256GB',  model: 'iPhone 15 Pro' },
    { name: 'Fernanda Rocha',  city: 'São Cristóvão',  product: 'iPhone 16 128GB',      model: 'iPhone 16' },
    { name: 'Thiago Mendes',   city: 'Lagarto',        product: 'iPhone 14 256GB',      model: 'iPhone 14' },
    { name: 'Beatriz Souza',   city: 'Simão Dias',     product: 'iPhone 15 128GB',      model: 'iPhone 15' },
    { name: 'Diego Nascimento', city: 'Simão Dias',    product: 'iPhone 17 Pro Max 256GB', model: 'iPhone 17 Pro Max' },
    { name: 'Priscila Torres',  city: 'Lagarto',       product: 'iPhone 17 Pro Max 256GB', model: 'iPhone 17 Pro Max' },
  ];

  const TIMES = [
    'há 2 min', 'há 5 min', 'há 8 min', 'há 11 min',
    'há 14 min', 'há 18 min', 'há 22 min', 'há 27 min',
  ];

  const MODEL_COLORS = {
    'iPhone 14':         ['#2d1f4e','#4a3580'],
    'iPhone 15':         ['#222','#333'],
    'iPhone 15 Pro':     ['#bdb8ae','#9e9990'],
    'iPhone 16':         ['#e8e4dc','#ccc8c0'],
    'iPhone 17 Pro Max': ['#d4520a','#b84208'],
  };

  function getPhoneSVG(model) {
    const c = MODEL_COLORS[model] || ['#222','#333'];
    return `<svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="5" width="80" height="190" rx="18" fill="${c[0]}" stroke="${c[1]}" stroke-width="2"/>
      <rect x="18" y="16" width="64" height="138" rx="7" fill="${c[0]}aa"/>
      <rect x="42" y="8" width="16" height="4" rx="2" fill="${c[1]}"/>
    </svg>`;
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  const el        = document.getElementById('sp-notification');
  const elImg     = document.getElementById('sp-img');
  const elName    = document.getElementById('sp-name');
  const elAction  = document.getElementById('sp-action');
  const elTime    = document.getElementById('sp-time');

  if (!el) return;

  let used = [];

  function showNext() {
    if (used.length === EVENTS.length) used = [];

    // pega evento não usado recentemente
    let evt;
    do { evt = rand(EVENTS); } while (used.includes(evt.name));
    used.push(evt.name);

    elImg.innerHTML    = getPhoneSVG(evt.model);
    elName.textContent = evt.name;
    elAction.innerHTML = `comprou <strong>${evt.product}</strong>`;
    elTime.textContent = `${evt.city} • ${rand(TIMES)}`;

    // entrada
    el.classList.add('show');

    // saída após 4s
    setTimeout(() => {
      el.classList.remove('show');
    }, 4000);
  }

  // Primeira notificação após 8s, depois a cada 35-45s
  setTimeout(() => {
    showNext();
    setInterval(showNext, 38000 + Math.random() * 8000);
  }, 8000);
})();
