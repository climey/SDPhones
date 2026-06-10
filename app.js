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
    model: 'iPhone 13',
    name: 'iPhone 13 128GB',
    color: 'Meia-noite',
    storage: '128GB',
    ram: '6GB',
    camera: '12MP',
    battery: '3227mAh',
    condition: 'Seminovo',
    price: 2190,
    priceOld: 2490,
    image: '',
    description: 'iPhone 13 em excelente estado. Bateria com saúde acima de 85%. Desbloqueado para todas as operadoras.',
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
    description: 'iPhone 14 novo, lacrado. Factory unlocked. Chip físico + eSIM. Garantia de 1 ano.',
  },
  {
    id: '3',
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
    description: 'iPhone 15 Pro com câmera de 48MP, chip A17 Pro e corpo em titânio. Novo, lacrado.',
  },
  {
    id: '4',
    model: 'iPhone 14 Pro',
    name: 'iPhone 14 Pro 256GB',
    color: 'Dourado',
    storage: '256GB',
    ram: '6GB',
    camera: '48MP',
    battery: '3200mAh',
    condition: 'Seminovo',
    price: 4490,
    priceOld: 4890,
    image: '',
    description: 'iPhone 14 Pro seminovo em ótimas condições. Câmera principal de 48MP. Bateria com saúde 88%.',
  },
  {
    id: '5',
    model: 'iPhone 16',
    name: 'iPhone 16 128GB',
    color: 'Branco',
    storage: '128GB',
    ram: '8GB',
    camera: '48MP',
    battery: '3650mAh',
    condition: 'Novo',
    price: 5190,
    priceOld: 5490,
    image: '',
    description: 'iPhone 16 lançamento 2024. Chip A18, câmera 48MP com zoom ótico 2x. Novo e lacrado.',
  },
  {
    id: '6',
    model: 'iPhone 13',
    name: 'iPhone 13 256GB',
    color: 'Estelar',
    storage: '256GB',
    ram: '6GB',
    camera: '12MP',
    battery: '3227mAh',
    condition: 'Seminovo',
    price: 2490,
    priceOld: 2790,
    image: '',
    description: 'iPhone 13 256GB seminovo. Excelente custo-benefício. Desbloqueado, bateria 82%.',
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

  grid.innerHTML = filtered.map(p => {
    const inCompare = compare.includes(p.id);
    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy"/>`
      : getPhoneSVG(p.model, p.condition);

    return `
      <div class="card" onclick="openModal('${p.id}')">
        <span class="card-badge ${p.condition === 'Novo' ? 'badge-new' : 'badge-used'}">${p.condition}</span>
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
  }).join('') + `
    <div class="card card-no-model">
      <div class="card-no-model-icon">📱</div>
      <div class="card-no-model-text">Não encontrou<br>o modelo?</div>
      <a href="https://wa.me/5579999999999?text=Olá! Não encontrei o modelo que procuro." target="_blank" class="btn-secondary" style="font-size:10px;padding:8px 16px;border-radius:20px;margin-top:4px;">Falar no WhatsApp</a>
    </div>
  `;
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
  document.getElementById('modal-category').textContent = p.model + ' · ' + p.condition;
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
