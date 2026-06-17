// CART
let cart = [];

// ADD TO CART
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    let count = document.getElementById("cart-count");

    if (count) {
        count.innerText = cart.length;
    }

    alert(name + " added to cart 🛒");
}

// PLACE ORDER
function placeOrder() {

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price, 0)
        })
    })
    .then(res => res.json())
    .then(data => {

        alert("Order placed successfully! 🎉");

        cart = [];

        document.getElementById("cart-count").innerText = 0;
    })
    .catch(err => {

        console.log(err);
        alert("Backend not connected!");
    });
}

// BOOK TABLE
function bookTable(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let guests = document.getElementById("guests").value;

    if(name === "" || email === "" || phone === "" ||
       date === "" || time === "" || guests === ""){
        alert("❌ Reservation Failed! Please enter all details.");
        return;
    }

    alert("✅ Table Booked Successfully!");
}
// LOGIN
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "1234") {

        alert("Welcome to Foodie's Restaurant 🍽️");

        window.location.href = "index.html";

    } else {

        document.getElementById("msg").innerText =
            "Wrong credentials ❌";
    }
}

// VEG / NON VEG TAB
function showMenu(type) {

    let veg = document.getElementById("veg");
    let nonveg = document.getElementById("nonveg");

    let buttons =
        document.querySelectorAll(".tab-btn");

    buttons.forEach(btn =>
        btn.classList.remove("active")
    );

    if (type === "veg") {

        veg.style.display = "grid";
        nonveg.style.display = "none";

        buttons[0].classList.add("active");

    } else {

        veg.style.display = "none";
        nonveg.style.display = "grid";

        buttons[1].classList.add("active");
    }
}
// ONLINE ORDER
function placeOnlineOrder(){

    let name = document.getElementById("order-name").value;
    let item = document.getElementById("order-item").value;
    let qty = document.getElementById("order-qty").value;

    if(name === "" || item === "" || qty === ""){
        alert("❌ Please fill order details!");
        return;
    }

    alert("🛒 Order placed successfully for " + item);
}


// PAYMENT
function makePayment(){

    let method = document.getElementById("payment-method").value;
    let upi = document.getElementById("upi-id").value;

    if(method === ""){
        alert("❌ Select payment method!");
        return;
    }

    if(method === "upi" && upi === ""){
        alert("❌ Enter UPI ID!");
        return;
    }

    alert("💳 Payment Successful via " + method.toUpperCase());
}