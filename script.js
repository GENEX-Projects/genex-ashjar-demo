let lang = "ar";
let cart = [];
let orderNumber = Number(localStorage.getItem("orderNumber")) || 200;
let selectedPaymentMethod = "";

const texts = {
  ar: {
    welcomeTitle: "حياك الله في أشجار كافيه",
    welcomeText: "فضلاً اختر طريقة البدء للانتقال إلى تجربة الطلب",
    summaryTitle: "ملخص الطلب",
    itemsLabel: "العناصر",
    totalLabel: "الإجمالي",
    emptyCart: "لا توجد عناصر في السلة",
    menu: "المنيو",
    menuGuide: "نحن الآن في صفحة المنيو، يمكنك اختيار صنف أو أكثر ثم الانتقال إلى الدفع.",
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
    cashLabel: "عند الكاشير",
    payDetails: "بيانات الدفع",
    cardName: "اسم حامل البطاقة",
    cardNumber: "رقم البطاقة",
    expiry: "تاريخ الانتهاء",
    cvv: "CVV",
    completePayment: "إتمام الدفع",
    payCounterMessage: "تم اختيار الدفع عند الكاشير",
    paymentSuccess: "تمت محاكاة الدفع بنجاح",
    featuresTitle: "ميزات النظام",
    menuVoice: "نحن الآن في صفحة المنيو، يمكنك اختيار صنف أو أكثر من القائمة.",
    paymentVoice: "نحن الآن في صفحة الدفع، فضلاً أكمل بيانات الدفع لإتمام الطلب.",
    confirmVoice: "تم تأكيد طلبك بنجاح ويقوم الموظف حالياً بتجهيز الطلب.",
    startVoice: "حياك الله في أشجار كافيه. يمكنك الآن البدء بالطلب."
  },
  en: {
    welcomeTitle: "Welcome to Ashjar Café",
    welcomeText: "Please choose how you want to begin your ordering experience",
    summaryTitle: "Order Summary",
    itemsLabel: "Items",
    totalLabel: "Total",
    emptyCart: "Cart is empty",
    menu: "Menu",
    menuGuide: "You are now on the menu page. Choose one or more items, then continue to payment.",
    add: "Add",
    viewCart: "View Cart",
    yourOrder: "Your Order",
    total: "Total",
    confirm: "Continue to Payment",
    back: "Back",
    paymentTitle: "Select Payment Method",
    paymentGuide: "Choose the suitable method to complete your order",
    card: "Card",
    apple: "Apple Pay",
    cash: "Pay at Counter",
    processing: "Processing payment",
    confirmed: "Order Confirmed",
    sentToCashier: "The order has been sent to the cashier successfully",
    newOrder: "New Order",
    cardLabel: "Card",
    appleLabel: "Apple Pay",
    cashLabel: "Counter",
    payDetails: "Payment Details",
    cardName: "Cardholder Name",
    cardNumber: "Card Number",
    expiry: "Expiry Date",
    cvv: "CVV",
    completePayment: "Complete Payment",
    payCounterMessage: "Pay at counter has been selected",
    paymentSuccess: "Payment simulation completed successfully",
    featuresTitle: "System Features",
    menuVoice: "You are now on the menu page. You can choose one or more items from the list.",
    paymentVoice: "You are now on the payment page. Please complete the payment details to finish the order.",
    confirmVoice: "Your order has been confirmed successfully and the staff is now preparing it.",
    startVoice: "Welcome to Ashjar Café. You can now start ordering."
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
  const featuresTitle = document.getElementById("featuresTitle");
  const featureList = document.getElementById("featureList");

  if (welcomeTitle) welcomeTitle.textContent = current.welcomeTitle;
  if (welcomeText) welcomeText.textContent = current.welcomeText;
  if (summaryTitle) summaryTitle.textContent = current.summaryTitle;
  if (itemsLabel) itemsLabel.textContent = current.itemsLabel;
  if (totalLabel) totalLabel.textContent = current.totalLabel;
  if (featuresTitle) featuresTitle.textContent = current.featuresTitle;

  if (featureList) {
    featureList.innerHTML =
      lang === "ar"
        ? `
          <li>ترحيب ذكي</li>
          <li>منيو ثنائي اللغة</li>
          <li>دفع تجريبي احترافي</li>
          <li>إرسال الطلب للكاشير</li>
          <li>نداء الطلب الجاهز</li>
        `
        : `
          <li>Smart welcome</li>
          <li>Bilingual menu</li>
          <li>Professional payment simulation</li>
          <li>Order sent to cashier</li>
          <li>Ready order voice call</li>
        `;
  }
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
  speak(t().startVoice, lang);
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
  speak(current.menuVoice, lang);
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
        <div class="card space-top">
          <div class="order-item">
            <span>${lang === "ar" ? p.ar : p.en}</span>
            <strong>${p.price} SR</strong>
          </div>
        </div>
      `;
    });

    html += `
      <div class="card space-top">
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
        <button type="button" class="btn primary" onclick="openPaymentForm('card')">${current.card}</button>
      </div>

      <div class="payment-card">
        <h3>${current.apple}</h3>
        <p>${current.appleLabel}</p>
        <button type="button" class="btn primary" onclick="openPaymentForm('apple')">${current.apple}</button>
      </div>

      <div class="payment-card">
        <h3>${current.cash}</h3>
        <p>${current.cashLabel}</p>
        <button type="button" class="btn primary" onclick="payAtCounter()">${current.cash}</button>
      </div>
    </div>

    <div class="toolbar">
      <button type="button" class="btn secondary" onclick="renderCart()">${current.back}</button>
    </div>
  `;

  app.innerHTML = html;
  speak(current.paymentVoice, lang);
}

function openPaymentForm(method) {
  selectedPaymentMethod = method;
  const app = document.getElementById("app");
  const current = t();

  app.innerHTML = `
    <div class="menu-header">
      <h2>${current.payDetails}</h2>
      <p>${method === "apple" ? "Apple Pay Simulation" : current.paymentGuide}</p>
    </div>

    <div class="form-card">
      <div class="form-group">
        <label>${current.cardName}</label>
        <input id="cardName" type="text" placeholder="${current.cardName}" />
      </div>

      <div class="form-group">
        <label>${current.cardNumber}</label>
        <input id="cardNumber" type="text" placeholder="0000 0000 0000 0000" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>${current.expiry}</label>
          <input id="expiry" type="text" placeholder="MM/YY" />
        </div>

        <div class="form-group">
          <label>${current.cvv}</label>
          <input id="cvv" type="text" placeholder="123" />
        </div>
      </div>

      <div class="toolbar">
        <button type="button" class="btn primary" onclick="submitPaymentForm()">${current.completePayment}</button>
        <button type="button" class="btn secondary" onclick="goToPayment()">${current.back}</button>
      </div>
    </div>
  `;

  speak(current.paymentVoice, lang);
}

function submitPaymentForm() {
  const name = document.getElementById("cardName").value.trim();
  const number = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!name || !number || !expiry || !cvv) {
    if (lang === "ar") {
      alert("فضلاً أكمل جميع بيانات الدفع");
    } else {
      alert("Please complete all payment fields");
    }
    return;
  }

  if (lang === "ar") {
    speak("جاري معالجة الدفع", "ar");
  } else {
    speak("Processing payment", "en");
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="card">
      <h2>${t().processing}</h2>
      <p>${t().paymentSuccess}</p>
    </div>
  `;

  setTimeout(() => {
    confirmOrder(selectedPaymentMethod || "card");
  }, 1200);
}

function payAtCounter() {
  if (lang === "ar") {
    speak("تم اختيار الدفع عند الكاشير", "ar");
  } else {
    speak("Pay at counter selected", "en");
  }

  confirmOrder("cash");
}

function getPaymentLabel(method) {
  const current = t();
  if (method === "card") return current.card;
  if (method === "apple") return current.apple;
  return current.cash;
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

  speak(t().confirmVoice, lang);

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
window.openPaymentForm = openPaymentForm;
window.submitPaymentForm = submitPaymentForm;
window.payAtCounter = payAtCounter;
window.resetHome = resetHome;
