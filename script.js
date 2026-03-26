let lang = "ar";
let cart = [];
let orderNumber = Number(localStorage.getItem("orderNumber")) || 200;

const products = [
  { ar: "لاتيه", en: "Latte", price: 18 },
  { ar: "أمريكانو", en: "Americano", price: 15 },
  { ar: "كابتشينو", en: "Cappuccino", price: 17 },
  { ar: "فلات وايت", en: "Flat White", price: 16 },
  { ar: "شوكولاتة ساخنة", en: "Hot Chocolate", price: 18 },
  { ar: "إسبريسو", en: "Espresso", price: 12 }
];

function speak(text, selectedLang = "ar") {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = selectedLang === "ar" ? "ar-SA" : "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

function setLang(l) {
  lang = l;

  const langBox = document.getElementById("langBox");
  const app = document.getElementById("app");

  if (langBox) langBox.style.display = "none";
  if (app) renderMenu();

  if (lang === "ar") {
    speak("حياك الله في أشجار كافيه. يمكنك الآن اختيار طلبك من المنيو", "ar");
  } else {
    speak("Welcome to Ashjar Cafe. You can now choose your order from the menu", "en");
  }
}

function renderMenu() {
  const app = document.getElementById("app");
  if (!app) return;

  let html = `<h2>${lang === "ar" ? "المنيو" : "Menu"}</h2>`;

  products.forEach((p, i) => {
    html += `
      <div class="card">
        <h3>${lang === "ar" ? p.ar : p.en}</h3>
        <p>${p.price} SR</p>
        <button type="button" class="btn" onclick="add(${i})">
          ${lang === "ar" ? "إضافة" : "Add"}
        </button>
      </div>
    `;
  });

  html += `
    <button type="button" class="btn" onclick="renderCart()">
      ${lang === "ar" ? "عرض الطلب" : "View Cart"}
    </button>
  `;

  app.innerHTML = html;
}

function add(i) {
  cart.push(products[i]);
}

function renderCart() {
  const app = document.getElementById("app");
  if (!app) return;

  let total = 0;
  let html = `<h2>${lang === "ar" ? "طلبك" : "Your Order"}</h2>`;

  if (cart.length === 0) {
    html += `<p>${lang === "ar" ? "لا توجد عناصر في السلة" : "Cart is empty"}</p>`;
  } else {
    cart.forEach((p) => {
      total += p.price;
      html += `<p>${lang === "ar" ? p.ar : p.en} - ${p.price} SR</p>`;
    });

    html += `<h3>${lang === "ar" ? "الإجمالي" : "Total"}: ${total} SR</h3>`;
    html += `
      <button type="button" class="btn" onclick="confirmOrder()">
        ${lang === "ar" ? "تأكيد الطلب" : "Confirm Order"}
      </button>
    `;
  }

  html += `
    <br><br>
    <button type="button" class="btn" onclick="renderMenu()">
      ${lang === "ar" ? "رجوع" : "Back"}
    </button>
  `;

  app.innerHTML = html;
}

function confirmOrder() {
  const order = {
    number: orderNumber,
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price, 0),
    status: "new",
    lang: lang
  };

  localStorage.setItem("currentOrder", JSON.stringify(order));
  localStorage.setItem("orderNumber", String(orderNumber + 1));

  if (lang === "ar") {
    speak("تم تأكيد طلبك بنجاح. الموظف يقوم الآن بتجهيز الطلب", "ar");
  } else {
    speak("Your order has been confirmed successfully. The staff is now preparing your order", "en");
  }

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <h2>${lang === "ar" ? "تم تأكيد الطلب" : "Order Confirmed"}</h2>
    <h1 class="big">#${orderNumber}</h1>
    <p>${lang === "ar" ? "تم إرسال الطلب إلى الكاشير" : "The order has been sent to the cashier"}</p>
    <button type="button" class="btn" onclick="resetHome()">
      ${lang === "ar" ? "طلب جديد" : "New Order"}
    </button>
  `;

  orderNumber++;
  cart = [];
}

function resetHome() {
  const langBox = document.getElementById("langBox");
  const app = document.getElementById("app");

  if (langBox) langBox.style.display = "block";
  if (app) app.innerHTML = "";
}

window.addEventListener("DOMContentLoaded", function () {
  const btnAr = document.getElementById("btnAr");
  const btnEn = document.getElementById("btnEn");

  if (btnAr) {
    btnAr.addEventListener("click", function () {
      setLang("ar");
    });
  }

  if (btnEn) {
    btnEn.addEventListener("click", function () {
      setLang("en");
    });
  }
});

window.setLang = setLang;
window.add = add;
window.renderCart = renderCart;
window.confirmOrder = confirmOrder;
window.renderMenu = renderMenu;
window.resetHome = resetHome;
