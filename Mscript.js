// ================== Get restaurant from localStorage ==================
const restaurantName = localStorage.getItem("restaurant") || "Restaurant";
document.getElementById("restaurantName").innerText = restaurantName;

// ================== Sample Menu Items ==================
const menuData = [
  {name: "Margherita Pizza", price: 250},
  {name: "Veggie Burger", price: 150},
  {name: "Chicken Burger", price: 180},
  {name: "French Fries", price: 80},
  {name: "Paneer Wrap", price: 200},
  {name: "Grilled Sandwich", price: 120},
  {name: "Coke 500ml", price: 50},
  {name: "Pepsi 500ml", price: 50},
  {name: "Chocolate Shake", price: 100},
  {name: "Vanilla Shake", price: 100}
];

// ================== Load Cart from localStorage ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// ================== Render Menu Items ==================
const menuContainer = document.getElementById("menuItems");

menuData.forEach(item => {
  const div = document.createElement("div");
  div.className = "menu-item";
  div.innerHTML = `
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
  `;
  menuContainer.appendChild(div);
});

// ================== Add to Cart Function ==================
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({name, price, qty: 1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// ================== Update Cart Count ==================
function updateCartCount() {
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById("cartCount").innerText = count;
}

// ================== Go to Cart Page ==================
function goCart() {
  if(cart.length === 0){
    alert("Cart is empty! Add at least 1 item.");
    return;
  }
  window.location.href = "cart.html";
}