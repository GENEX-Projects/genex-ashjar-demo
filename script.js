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
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function setLang(l) {
  lang = l;
  document.getElementById("langBox").style.display = "none";
  renderMenu();

  if (lang === "ar") {
    speak("حياك الله في أشجار كافيه. يمكنك الآن اختيار طلبك من المنيو", "ar");
  } else {
    speak("Welcome to Ashjar Cafe. You can now choose your order from the menu", "en");
  }
}

function renderMenu() {
  let html = `<h2>${lang === "ar" ? "المنيو" : "Menu"}</h2>`;

  products.forEach((p, i) => {
    html += `
      <div class="card">
        <h3>${lang === "ar" ? p.ar : p.en}</h3>
        <p>${p.price} SR</p>
        <button class="btn" onclick="add(${i})">${lang === "ar" ? "إضافة" : "Add"}</button>
      </div>
    `;
  });

  html += `
    <button class="btn" onclick="renderCart()">${lang === "ar" ? "عرض الطلب" : "View Cart"}</button>
  `;

  document.getElementById("app").innerHTML = html;
}

function add(i) {
  cart.push(products[i]);
}

function renderCart() {
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
    html += `<button class="btn" onclick="confirmOrder()">${lang === "ar" ? "تأكيد الطلب" : "Confirm Order"}</button>`;
  }

  html += `<br><br><button class="btn" onclick="renderMenu()">${lang === "ar" ? "رجوع" : "Back"}</button>`;

  document.getElementById("app").innerHTML = html;
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

  document.getElementById("app").innerHTML = `
    <h2>${lang === "ar" ? "تم تأكيد الطلب" : "Order Confirmed"}</h2>
    <h1 class="big">#${orderNumber}</h1>
    <p>${lang === "ar" ? "تم إرسال الطلب إلى الكاشير" : "The order has been sent to the cashier"}</p>
    <button class="btn" onclick="resetHome()">${lang === "ar" ? "طلب جديد" : "New Order"}</button>
  `;

  orderNumber++;
  cart = [];
}

function resetHome() {
  document.getElementById("langBox").style.display = "block";
  document.getElementById("app").innerHTML = "";
