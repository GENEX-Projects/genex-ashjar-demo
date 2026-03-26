let lang = "ar";
let cart = [];
let orderNumber = Number(localStorage.getItem("orderNumber")) || 200;

const texts = {
  ar: {
    welcomeTitle: "حياك الله في أشجار كافيه",
    welcomeText: "فضلاً اختر اللغة المفضلة للانتقال إلى قائمة المنيو",
    summaryTitle: "ملخص الطلب",
    itemsLabel: "العناصر",
    totalLabel: "الإجمالي",
    emptyCart: "لا توجد عناصر في السلة",
    menu: "المنيو",
    menuGuide: "يمكنك اختيار صنف أو أكثر، ثم الانتقال إلى الدفع وتأكيد الطلب.",
    add: "إضافة",
    viewCart: "عرض الطلب",
    yourOrder: "طلبك",
    total: "الإجمالي",
    confirm: "متابعة إلى الدفع",
    back: "رجوع",
    paymentTitle: "اختر طريقة الدفع",
    paymentGuide: "اختر الطريقة المناسبة لإتمام الطلب",
    card: "بطاقة بنكية",
    apple: "Apple Pay",
    cash: "الدفع عند الكاشير",
    processing: "جاري معالجة الدفع",
    confirmed: "تم تأكيد الطلب",
    sentToCashier: "تم إرسال الطلب إلى الكاشير بنجاح",
    newOrder: "طلب جديد",
    cardLabel: "بطاقة",
    appleLabel: "أبل باي",
    cashLabel: "عند الكاشير"
  },
  en: {
    welcomeTitle: "Welcome to Ashjar Café",
    welcomeText: "Please choose your preferred language to continue to the menu",
    summaryTitle: "Order Summary",
    itemsLabel: "Items",
    totalLabel: "Total",
    emptyCart: "Cart is empty",
    menu: "Menu",
    menuGuide: "Choose one or more items, then continue to payment and confirm your order.",
    add: "Add",
    viewCart: "View Cart",
    yourOrder: "Your Order",
    total: "Total",
    confirm: "Continue to Payment",
    back: "Back",
    paymentTitle: "Select Payment Method",
    paymentGuide: "Choose the suitable method to complete the order",
    card: "Card",
    apple: "Apple Pay",
    cash: "Pay at Counter",
    processing: "Processing payment",
    confirmed: "Order Confirmed",
    sentToCashier: "The order has been sent to the cashier successfully",
    newOrder: "New Order",
    cardLabel: "Card",
    appleLabel: "Apple Pay",
    cashLabel: "Counter"
  }
};

const products = [
  { ar: "لاتيه", en: "Latte", price: 18, icon: "☕", descAr: "مشروب ناعم ومتوازن", descEn: "Smooth and balanced coffee" },
  { ar: "أمريكانو", en: "Americano", price: 15, icon: "☕", descAr: "إسبريسو مع ماء ساخن", descEn: "Espresso with hot water" },
  { ar: "كابتشينو", en: "Cappuccino", price: 17, icon: "🥛", descAr: "رغوة كثيفة وطعم كلاسيكي", descEn: "Classic taste with rich foam" },
  { ar: "فلات وايت", en: "Flat White", price: 16, icon: "🥤", descAr: "مزيج ناعم من الحليب والقهوة", descEn: "Silky milk and espresso blend" },
  { ar: "شوكولاتة ساخنة", en: "Hot Chocolate", price: 18, icon: "🍫", descAr: "غنية وكريمية", descEn: "Rich and creamy" },
  { ar: "إسبريسو", en: "Espresso", price: 12, icon: "⚫", descAr: "شوت مركز", descEn: "Concentrated shot" }
];

function t() {
  return texts[lang];
}

function speak(text, selectedLang = "ar") {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = selectedLang === "ar" ? "ar-SA" : "en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function updateStaticTexts() {
  const current = t();
  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeText = document.getElementById("welcomeText");
  const summaryTitle = document.getElementById("summaryTitle");
  const itemsLabel = document.getElementById("itemsLabel");
  const totalLabel = document.getElementById("totalLabel");

  if (welcomeTitle) welcomeTitle.textContent = current.welcomeTitle;
  if (welcomeText) welcomeText.textContent = current.welcomeText;
  if (summaryTitle) summaryTitle.textContent = current.summaryTitle;
  if (itemsLabel) itemsLabel.textContent = current.itemsLabel;
  if (totalLabel) totalLabel.textContent = current.totalLabel;
}

function updateCartSummary() {
  const countEl = document.getElementById("itemCount");
  const totalEl = document.getElementById("totalAmount");
  const previewEl = document.getElementById("cartPreview");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (countEl) countEl.textContent = cart.length;
  if (totalEl) totalEl.textContent = `${total} SR`;

  if (!previewEl) return;

  if (cart.length === 0) {
    previewEl.textContent = t().emptyCart;
    return;
  }

  let html = "";
  cart.forEach((item) => {
    html += `
      <div class="preview-item">
        <div class="order-item">
          <span>${lang === "ar" ? item.ar : item.en}</span>
          <strong>${item.price} SR</strong>
        </div>
      </div>
    `;
  });

  previewEl.innerHTML = html;
}

function setLang(selected) {
  lang = selected;
  updateStaticTexts();
  document.getElementById("langBox").style.display = "none";
  renderMenu();

  if (lang === "ar") {
    speak("حياك الله في أشجار كافيه. يمكنك الآن اختيار طلبك من المنيو", "ar");
  } else {
    speak("Welcome to Ashjar Cafe. You can now choose your order from the menu", "en");
  }
}

function renderMenu() {
  const app = document.getElementById("app");
  const current = t();

  let html = `
    <div class="menu-header">
      <h2>${current.menu}</h2>
      <p>${current.menuGuide}</p>
    </div>
    <div class="products-grid">
  `;

  products.forEach((p, i) => {
    html += `
      <div class="card">
        <div class="product-image">${p.icon}</div>
        <h3 class="product-name">${lang === "ar" ? p.ar : p.en}</h3>
        <div class="product-desc">${lang === "ar" ? p.descAr : p.descEn}</div>
        <div class="product-row">
          <strong>${p.price} SR</strong>
          <button type="button" class="btn primary" onclick="add(${i})">${current.add}</button>
        </div>
      </div>
    `;
  });

  html += `</div>
    <div class="toolbar">
      <button type="button" class="btn secondary" onclick="renderCart()">${current.viewCart}</button>
    </div>
  `;

  app.innerHTML = html;
  updateCartSummary();
}

function add(i) {
  cart.push(products[i]);
  updateCartSummary();
}

function renderCart() {
  const app = document.getElementById("app");
  const current = t();
  let total = 0;

  let html = `<div class="menu-header"><h2>${current.yourOrder}</h2></div>`;

  if (cart.length === 0) {
    html += `<div class="card"><p>${current.emptyCart}</p></div>`;
  } else {
    cart.forEach((p) => {
      total += p.price;
      html += `
        <div class="card">
          <div class="order-item">
            <span>${lang === "ar" ? p.ar : p.en}</span>
            <strong>${p.price} SR</strong>
          </div>
        </div>
      `;
    });

    html += `
      <div class="card">
        <h3>${current.total}: ${total} SR</h3>
      </div>
      <div class="toolbar">
        <button type="button" class="btn primary" onclick="goToPayment()">${current.confirm}</button>
        <button type="button" class="btn secondary" onclick="renderMenu()">${current.back}</button>
      </div>
    `;
  }

  app.innerHTML = html;
  updateCartSummary();
}

function goToPayment() {
  const app = document.getElementById("app");
  const current = t();

  let html = `
    <div class="menu-header">
      <h2>${current.paymentTitle}</h2>
      <p>${current.paymentGuide}</p>
    </div>

    <div class="payment-grid">
      <div class="payment-card">
        <h3>${current.card}</h3>
        <p>${current.cardLabel}</p>
        <button type="button" class="btn primary" onclick="pay('card')">${current.card}</button>
      </div>

      <div class="payment-card">
        <h3>${current.apple}</h3>
        <p>${current.appleLabel}</p>
        <button type="button" class="btn primary" onclick="pay('apple')">${current.apple}</button>
      </div>

      <div class="payment-card">
        <h3>${current.cash}</h3>
        <p>${current.cashLabel}</p>
        <button type="button" class="btn primary" onclick="pay('cash')">${current.cash}</button>
      </div>
    </div>

    <div class="toolbar">
      <button type="button" class="btn secondary" onclick="renderCart()">${current.back}</button>
    </div>
  `;

  app.innerHTML = html;
}

function getPaymentLabel(method) {
  const current = t();
  if (method === "card") return current.card;
  if (method === "apple") return current.apple;
  return current.cash;
}

function pay(method) {
  const current = t();

  if (lang === "ar") {
    speak("جاري معالجة الدفع", "ar");
  } else {
    speak("Processing payment", "en");
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="card">
      <h2>${current.processing}</h2>
      <p>...</p>
    </div>
  `;

  setTimeout(() => {
    confirmOrder(method);
  }, 1200);
}

function confirmOrder(method) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const order = {
    number: orderNumber,
    items: [...cart],
    total: total,
    status: "new",
    lang: lang,
    paymentMethod: getPaymentLabel(method)
  };

  localStorage.setItem("currentOrder", JSON.stringify(order));
  localStorage.setItem("orderNumber", String(orderNumber + 1));

  if (lang === "ar") {
    speak("تم تأكيد طلبك بنجاح. الموظف يقوم الآن بتجهيز الطلب", "ar");
  } else {
    speak("Your order has been confirmed successfully. The staff is now preparing your order", "en");
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="card">
      <h2>${t().confirmed}</h2>
      <div class="big-order">#${orderNumber}</div>
      <p>${t().sentToCashier}</p>
      <p>Payment: <strong>${getPaymentLabel(method)}</strong></p>
      <div class="toolbar">
        <button type="button" class="btn primary" onclick="resetHome()">${t().newOrder}</button>
      </div>
    </div>
  `;

  orderNumber++;
  cart = [];
  updateCartSummary();
}

function resetHome() {
  document.getElementById("langBox").style.display = "block";
  document.getElementById("app").innerHTML = "";
  updateStaticTexts();
  updateCartSummary();
}

window.addEventListener("DOMContentLoaded", function () {
  updateStaticTexts();
  updateCartSummary();

  document.getElementById("btnAr").addEventListener("click", function () {
    setLang("ar");
  });

  document.getElementById("btnEn").addEventListener("click", function () {
    setLang("en");
  });
});

window.setLang = setLang;
window.add = add;
window.renderCart = renderCart;
window.renderMenu = renderMenu;
window.goToPayment = goToPayment;
window.pay = pay;
window.resetHome = resetHome;
