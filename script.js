let lang = "ar";
let cart = [];
let orderNumber = 200;

const products = [
{ar:"لاتيه",en:"Latte",price:18},
{ar:"أمريكانو",en:"Americano",price:15},
{ar:"كابتشينو",en:"Cappuccino",price:17},
{ar:"فلات وايت",en:"Flat White",price:16}
];

function speak(text){
let msg = new SpeechSynthesisUtterance(text);
speechSynthesis.speak(msg);
}

function setLang(l){
lang = l;
document.getElementById("langBox").style.display="none";
renderMenu();

if(lang==="ar"){
speak("حياك الله في أشجار كافيه");
}else{
speak("Welcome to Ashjar Cafe");
}
}

function renderMenu(){
let html = "<h2>Menu</h2>";

products.forEach((p,i)=>{
html+=`
<div class="card">
<h3>${lang==="ar"?p.ar:p.en}</h3>
<p>${p.price} SR</p>
<button class="btn" onclick="add(${i})">Add</button>
</div>
`;
});

html+=`<button class="btn" onclick="renderCart()">Cart</button>`;

document.getElementById("app").innerHTML = html;
}

function add(i){
cart.push(products[i]);
}

function renderCart(){
let total=0;
let html="<h2>Order</h2>";

cart.forEach(p=>{
total+=p.price;
html+=`<p>${lang==="ar"?p.ar:p.en}</p>`;
});

html+=`<h3>${total} SR</h3>`;
html+=`<button class="btn" onclick="confirm()">Confirm</button>`;

document.getElementById("app").innerHTML = html;
}

function confirm(){
speak("تم تأكيد الطلب");

document.getElementById("app").innerHTML = `
<h1 class="big">#${orderNumber}</h1>
`;

orderNumber++;
cart=[];
}
