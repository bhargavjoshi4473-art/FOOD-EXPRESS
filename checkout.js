// ================== Load saved address ==================
const saved = JSON.parse(localStorage.getItem("address"));

if(saved){
  document.getElementById("addressForm").style.display = "none";
  document.getElementById("savedAddress").style.display = "block";
  document.getElementById("displayAddress").innerText =
    `${saved.name}, ${saved.street}, ${saved.city}, ${saved.state} - ${saved.zip}`;
}

// ================== Save Address ==================
function saveAddress(){
  const name = document.getElementById("name").value.trim();
  const street = document.getElementById("street").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const zip = document.getElementById("zip").value.trim();

  if(!name || !street || !city || !state || !zip){
    alert("Please fill all fields!");
    return;
  }

  const address = {name, street, city, state, zip};
  localStorage.setItem("address", JSON.stringify(address));

  document.getElementById("addressForm").style.display = "none";
  document.getElementById("savedAddress").style.display = "block";
  document.getElementById("displayAddress").innerText =
    `${name}, ${street}, ${city}, ${state} - ${zip}`;
}

// ================== Edit Address ==================
function editAddress(){
  document.getElementById("addressForm").style.display = "block";
  document.getElementById("savedAddress").style.display = "none";
}

// ================== Place Order ==================
function placeOrder(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  const address = JSON.parse(localStorage.getItem("address"));
  if(!address){
    alert("Please enter delivery address!");
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  alert(`Order Placed Successfully!\nPayment Method: ${paymentMethod}\nDeliver to: ${address.name}, ${address.street}, ${address.city}`);

  // Clear cart after order
  localStorage.removeItem("cart");

  // Redirect to restaurants page
  window.location.href = "restaurants.html";
}

// ================== Back to Cart ==================
function goCart(){
  window.location.href = "cart.html";
}