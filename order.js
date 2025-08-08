if (!localStorage.getItem("user")) {
    window.location.href = "login.html"; // Redirect to login page 
}
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("orderSummary");
    const finalTotal = document.getElementById("finalTotal");

    console.log("Loaded cart in order.html:", cart); // ✅ Debugging Log

    if (cart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty.</p>";
        finalTotal.innerText = "Total: ₹0.00";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`;
        orderSummary.appendChild(li);
        total += item.price * item.quantity;
    });

    finalTotal.innerText = `Total (incl. GST): ₹${total.toFixed(2)}`;


    // ✅ Order Submission
    document.getElementById("orderForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !phone || !address) {
            alert("Please fill in all details.");
            return;
        }

        const orderMessage = formatOrderMessage(name, phone, address, cart, total);

        // ✅ Send Order to Google Apps Script
        sendOrderToGAS(name, phone, address, cart, total)
            .then(response => {
                console.log("Google Apps Script Response:", response);
                
                // ✅ Send Telegram Notification after successful order submission
                return sendTelegramMessage(orderMessage);
            })
            .then(response => {
                console.log("Telegram Response:", response);
                alert(`Order placed successfully!\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal: ₹${total.toFixed(2)}`);

                localStorage.removeItem("cart");
                window.location.href = "index.html"; // Redirect to homepage
            })
            .catch(error => {
                console.error("Error processing order:", error);
                alert("Failed to send order. Please try again.");
            });
    });
});

/** ✅ Function to Send Order to Google Apps Script */
function sendOrderToGAS(name, phone, address, cart, total) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwQrzK8mkti3zy8A-FoZ4bt93te3E9E2HNqtVLtN-QbbLln-ijEEuormdDrn0OY6q4kDw/exec"; // ✅ Your GAS Web App URL

    const formData = new FormData();
    formData.append("action", "order");
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("orderDetails", JSON.stringify(cart));
    formData.append("total", total.toFixed(2));

    return fetch(scriptURL, {
        method: "POST",
        body: formData
    }).then(response => response.text());
}

/** ✅ Function to Format Order Message */
function formatOrderMessage(name, phone, address, cart, total) {
    let message = `🛒 *New Order Received!*\n\n` +
                  `👤 *Name:* ${name}\n` +
                  `📞 *Phone:* ${phone}\n` +
                  `🏠 *Address:* ${address}\n\n` +
                  `📌 *Order Summary:*\n`;

    cart.forEach(item => {
        message += `🍽️ ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 *Total:* ₹${total.toFixed(2)}`;

    return message;
}

/** ✅ Function to Send Telegram Message */
function sendTelegramMessage(message) {
    const botToken = "7330721492:AAGO9eJQfIFfELoCcE0gdcnjnsdqg7ggno4"; // ✅ Replace with your bot token
    const chatID = "-4795951564"; // ✅ Replace with your Telegram chat ID
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const payload = {
        chat_id: chatID,
        text: message,
        parse_mode: "Markdown"
    };

    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => response.json());
}
