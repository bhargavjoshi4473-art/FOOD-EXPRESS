// ================== Load Cart ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");

// ================== Render Cart ==================
function renderCart() {
  cartContainer.innerHTML = "";
  if(cart.length === 0){
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</p>
      <button onclick="updateQty(${index}, -1)">-</button>
      <button onclick="updateQty(${index}, 1)">+</button>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
}

// ================== Update Quantity ==================
function updateQty(index, change){
  cart[index].qty += change;
  if(cart[index].qty <= 0){
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ================== Remove Item ==================
function removeItem(index){
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ================== Update Total ==================
function updateTotal(){
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  totalPriceEl.innerText = total;
}

// ================== Checkout ==================
function checkout(){
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

// ================== Back to Menu ==================
function goBack(){
  window.location.href = "menu.html";
}

// ================== Initial Render ==================
renderCart();