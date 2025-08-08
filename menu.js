if (!localStorage.getItem("user")) {
    window.location.href = "login.html"; // Redirect to login page 
}

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout");

    // ✅ Function to Update Cart UI and Local Storage
    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItem.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(index));
            cartContainer.appendChild(cartItem);
        });

        totalAmount.textContent = `₹${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));  // ✅ Save updated cart to localStorage
    }

    // ✅ Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".menu-item");
            const name = item.getAttribute("data-name");
            const price = parseFloat(item.getAttribute("data-price"));

            const existingItem = cart.find(cartItem => cartItem.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // ✅ Remove from Cart
    function removeFromCart(index) {
        cart[index].quantity -= 1;
        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }

    document.getElementById("search").addEventListener("input", (event) => {
        const searchText = event.target.value.toLowerCase();
        document.querySelectorAll(".menu-item").forEach(item => {
            const name = item.getAttribute("data-name").toLowerCase();
            if (name.includes(searchText)) {
                item.classList.remove("hidden"); // Show matching items
            } else {
                item.classList.add("hidden"); // Hide non-matching items without resizing the grid
            }
        });
    });
    
    
    





    // ✅ Checkout - Redirect and Save Cart
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }

        console.log("Saving cart to localStorage:", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "order.html";
    });

    // ✅ Load Cart on Page Load
    updateCart();
});
