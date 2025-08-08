# 🍽️ Foodora - Online Restaurant Website

![Homepage Banner](./Screenshot%202025-08-08%20150713.png)

**Foodora** is a modern, responsive restaurant web application designed to enhance the user dining experience with features like online ordering, cart management, table booking, email OTP login, and Telegram notifications.

---

## 📌 Features

- ✅ **User Authentication with OTP:**  
  Users sign in using their email and receive a one-time password (OTP) via email.

- 🍔 **Explore & Order Food:**  
  View and search a variety of menu items. Users can add items to cart and see a **live order summary with bill**.

- 🛒 **Cart & Billing System:**  
  Items added to the cart are displayed with price and quantity. On checkout, a **popup summary** is shown and details are sent to the **restaurant host on Telegram**.

- 📅 **Table Booking:**  
  Users can book tables by filling in details (name, date, time, phone number, etc.), which are also sent to the restaurant owner on **Telegram**.

- 📊 **Google Sheets Integration:**  
  All login attempts and user emails are saved in **Google Sheets** using **Google Apps Script** for easy tracking and analytics.

- 🧾 **Responsive Design:**  
  Smooth and professional user interface with a mobile-friendly layout.

---

## 🛠️ Tech Stack

| Technology        | Purpose                        |
|-------------------|--------------------------------|
| `HTML`, `CSS`, `JavaScript` | Frontend development         |
| `Vercel`          | Deployment & Hosting            |
| `Google Apps Script` | OTP Email + Sheet Integration |
| `Telegram Bot API`| Order & Booking Notifications   |

---

## 🔐 Authentication

- Email-based login using OTP (One Time Password)
- OTP is sent using **Google Apps Script MailApp**
- User credentials logged securely in **Google Sheets**

---

## 📸 Screenshots

### ✅ Home Page  
![Home](./Screenshot%202025-08-08%20150713.png)

### 🛍️ Explore Food & Cart  
![Menu](./Screenshot%202025-08-08%20150851.png)

### 📅 Table Booking  
![Booking](./Screenshot%202025-08-08%20151025.png)

### 📦 Place Order Summary  
![Order](./Screenshot%202025-08-08%20151054.png)

---

## 📬 Notifications & Hosting

- 🔔 Order details and table bookings are sent directly to the restaurant host via **Telegram Bot**
- 📝 All user logins are recorded in **Google Sheets** in real-time
- 🌐 Hosted on [Vercel](https://vercel.com/) for fast and secure deployment

---
/Foodora
├── index.html
├── styles.css
├── script.js
├── /assets
│ └── food-images, icons, etc.
├── /functions
│ └── telegram.js, otp.js
└── README.md


---

## 👨‍💻 Developed By

**Vishal Moota**  
📧 [vishalmoota2005@gmail.com](mailto:vishalmoota2005@gmail.com)  
🔗 [GitHub](https://github.com/VishalMoota) • [LinkedIn](https://www.linkedin.com/in/vishal-moota/)

---

> _“Great food. Great tech. Great experience.”_


## 📂 Folder Structure (Simplified)

