const products = [
  {id:1,name:"Pain & Fever Care",cat:"pain",price:120,emoji:"💊",desc:"Common pain and fever category"},
  {id:2,name:"Cold & Cough Care",cat:"cold",price:150,emoji:"🫁",desc:"Cold and cough category"},
  {id:3,name:"Daily Vitamins",cat:"vitamin",price:180,emoji:"🍊",desc:"Vitamin & wellness category"},
  {id:4,name:"Personal Care",cat:"care",price:220,emoji:"🧴",desc:"Everyday personal care"},
  {id:5,name:"First Aid Essentials",cat:"care",price:250,emoji:"🩹",desc:"Basic first-aid supplies"},
  {id:6,name:"Wellness Support",cat:"vitamin",price:199,emoji:"🌿",desc:"General wellness products"},
  {id:7,name:"Thermometer",cat:"care",price:299,emoji:"🌡️",desc:"Healthcare device"},
  {id:8,name:"Oral Care",cat:"care",price:99,emoji:"🪥",desc:"Daily oral-care products"}
];
let cart = JSON.parse(localStorage.getItem("kunmunCart") || "[]");
let activeFilter = "all";

const productsEl = document.getElementById("products");
function renderProducts(){
  const q = (document.getElementById("search").value || "").toLowerCase();
  const list = products.filter(p => (activeFilter==="all" || p.cat===activeFilter) && (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
  productsEl.innerHTML = list.map(p => `<article class="product"><div class="emoji">${p.emoji}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="bottom"><strong>₹${p.price}</strong><button onclick="addToCart(${p.id})">Add</button></div></article>`).join("") || `<div class="empty">No matching products found.</div>`;
}
window.addToCart = function(id){
  const p = products.find(x=>x.id===id);
  const existing = cart.find(x=>x.id===id);
  if(existing) existing.qty++; else cart.push({...p,qty:1});
  saveCart();
  openCart();
}
function saveCart(){localStorage.setItem("kunmunCart",JSON.stringify(cart)); renderCart(); document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div class="empty">Your cart is empty.</div>';document.getElementById("cartTotal").textContent="₹0";return}
  el.innerHTML=cart.map(x=>`<div class="cart-item"><div><b>${x.emoji} ${x.name}</b><br><small>₹${x.price} × ${x.qty}</small></div><button onclick="removeFromCart(${x.id})">Remove</button></div>`).join("");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0); document.getElementById("cartTotal").textContent=`₹${total}`;
}
window.removeFromCart=function(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=()=>document.getElementById("cartDrawer").classList.remove("open");
document.getElementById("cartDrawer").addEventListener("click",e=>{if(e.target.id==="cartDrawer")e.currentTarget.classList.remove("open")});
document.getElementById("search").addEventListener("input",renderProducts);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts()}));
document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("open"));

document.getElementById("orderCart").onclick=()=>{
  if(!cart.length)return;
  const items=cart.map(x=>`${x.name} × ${x.qty}`).join(", ");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const msg=`Hello KUNMUN Medical Hall, I want to order: ${items}. Demo cart total: ₹${total}. Please confirm availability and final price.`;
  window.open("https://wa.me/918249357903?text="+encodeURIComponent(msg),"_blank");
};

document.getElementById("prescriptionForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const form=e.target;
  const name=document.getElementById("rxName").value, phone=document.getElementById("rxPhone").value, file=document.getElementById("rxFile").files[0];
  const statusEl=document.getElementById("rxStatus");
  statusEl.textContent="Sending your request...";
  try{
    await fetch("/", {method:"POST", body:new FormData(form)});
    statusEl.textContent=`Request received (${file.name}). WhatsApp will open so our team can confirm.`;
    form.reset();
  }catch(err){
    statusEl.textContent="Could not save the request, but WhatsApp will still open.";
  }
  const msg=`Hello KUNMUN Medical Hall, I want to send a prescription. Name: ${name}. Phone: ${phone}. I will attach the prescription image/PDF in WhatsApp.`;
  setTimeout(()=>window.open("https://wa.me/918249357903?text="+encodeURIComponent(msg),"_blank"),300);
});

document.getElementById("consultForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const form=e.target;
  const statusEl=document.getElementById("cStatus");
  statusEl.textContent="Sending your request...";
  try{
    await fetch("/", {
      method:"POST",
      headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body:new URLSearchParams(new FormData(form)).toString()
    });
    statusEl.textContent="Appointment request received. WhatsApp will open so our team can confirm.";
    const msg=`Hello KUNMUN Medical Hall, I want a doctor consultation appointment. Name: ${cName.value}; Phone: ${cPhone.value}; Date: ${cDate.value}; Time: ${cTime.value}; Message: ${cMessage.value||"N/A"}.`;
    setTimeout(()=>window.open("https://wa.me/918249357903?text="+encodeURIComponent(msg),"_blank"),300);
    form.reset();
  }catch(err){
    statusEl.textContent="Could not save the request, but WhatsApp will still open.";
    const msg=`Hello KUNMUN Medical Hall, I want a doctor consultation appointment. Name: ${cName.value}; Phone: ${cPhone.value}; Date: ${cDate.value}; Time: ${cTime.value}; Message: ${cMessage.value||"N/A"}.`;
    window.open("https://wa.me/918249357903?text="+encodeURIComponent(msg),"_blank");
  }
});

renderProducts();saveCart();
