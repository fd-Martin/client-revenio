# 📚 BookCourier – Library‑to‑Home Delivery System

A modern, full‑stack MERN application that allows users to request book pickup and delivery directly from nearby libraries. BookCourier aims to make book borrowing and returning effortless for students, researchers, and book lovers.

---

## 🚀 Live URLs

* **Live Link:** https://revenio-ace1f.web.app
* **Client:** (https://github.com/fd-Martin/client-revenio.git)
* **Server:** (https://github.com/fd-Martin/server-revenio.git)

---

## 🎯 Project Purpose

BookCourier provides a seamless system for:

* Borrowing books without visiting the library.
* Delivering and returning books from home.
* Managing books, orders, users, and payments based on user roles (User, Librarian, Admin).

This project is designed following modern UI/UX principles, production‑level security, and scalable architecture.

---

## ✨ Key Features

### 🔐 Authentication & User Roles

* Email/Password login
* One social login provider
* Firebase Authentication
* JWT token‑based protected API routes
* Role-based dashboards: **User | Librarian | Admin**

### 🏠 Home Page

* Banner with **3+ book sliders**
* Latest Books section
* Coverage Map (Available cities)
* Why Choose BookCourier section
* 1 animated section + 2 additional custom sections

### 📚 Books Management

* All Books page with search & price sort
* Book Details page with order modal
* Wishlist functionality
* Book Reviews & Ratings

### 📦 Order Management

* Users can order books
* Status: pending → shipped → delivered
* Payment system with Pay Now option
* Cancel order functionality
* Invoices page

### 🛠️ Librarian Dashboard

* Add Book
* Manage My Books
* Edit book details
* View & update order statuses

### 🛡️ Admin Dashboard

* Manage All Users (Make Admin / Librarian)
* Manage All Books (Publish / Unpublish / Delete)
* Profile Management

---

## 🖥️ Technology Stack

### **Frontend**

* React (Vite)
* React Router DOM
* TailwindCSS + DaisyUI / ShadCN (optional)
* TanStack Query (optional)
* Recharts (for dashboard analytics)
* AOS / Framer Motion (animations)

### **Backend**

* Node.js
* Express.js
* MongoDB / Mongoose
* Firebase Admin SDK (JWT verification)
* Stripe (optional payments)

### **Hosting**

* Client: Vercel
* Server: Vercel
* Database: MongoDB Atlas

---

## 🔐 Environment Variables

### **Frontend (.env)**

```
VITE_apiKey=*********
VITE_authDomain=*********
VITE_projectId=*********
VITE_storageBucket=*********
VITE_messagingSenderId=*********
VITE_appId=*********
VITE_server_url=*********
```

### **Backend (.env)**

```
MONGODB_URI=*********
FIREBASE_TYPE=*********
FIREBASE_PRIVATE_KEY=*********
FIREBASE_CLIENT_EMAIL=*********
JWT_SECRET=*********
STRIPE_SECRET_KEY=*********(optional)
```

---

## 📁 Folder Structure

```
BookCourier/
│── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── utils/
│── server/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── config/
```

---

## 🧪 Core Functionalities (Detailed)

### 👤 User Dashboard

* View all orders
* Cancel pending orders
* Pay for pending orders
* View invoices
* Manage profile
* Wishlist system

### 📚 Librarian Dashboard

* Add or edit books
* Publish or unpublish books
* View orders for their books
* Update order status (pending → shipped → delivered)

### 🛡️ Admin Dashboard

* Manage users
* Manage all books
* Delete books + related data

---

## 🔎 Search & Sorting

All Books page includes:

* Real‑time search by book title
* Sorting by price (Low → High, High → Low)

---


## 🧳 Deployment Checklist

* Server deployed with no CORS/404/504 errors
* Client live link stable with no reload errors
* Firebase domain authorized
* Private routes persist state even after refresh

---

## 📬 Contact

If you have any questions or need help during evaluation, feel free to reach out.

**Thank you for reviewing BookCourier!** 🙏🚀



# Project Dependencies Installation Guide

This project uses the following packages. You can install them using npm or yarn.

---

## Package List and Installation Commands

| Package Name               | Short Description                                   | Install (npm)                                      | Install (yarn)                                  |
|----------------------------|----------------------------------------------------|---------------------------------------------------|------------------------------------------------|
| @chakra-ui/react           | React UI component library for easy styling         | `npm install @chakra-ui/react`                     | `yarn add @chakra-ui/react`                      |
| @coreui/react-pro          | CoreUI React Pro UI components                       | `npm install @coreui/react-pro`                     | `yarn add @coreui/react-pro`                      |
| @emotion/react             | CSS-in-JS styling library                            | `npm install @emotion/react`                        | `yarn add @emotion/react`                         |
| @emotion/styled            | Styled components with Emotion                       | `npm install @emotion/styled`                       | `yarn add @emotion/styled`                        |
| @mui/material              | Material UI React components                         | `npm install @mui/material`                         | `yarn add @mui/material`                          |
| @tailwindcss/vite          | Tailwind CSS plugin for Vite                         | `npm install -D @tailwindcss/vite`                  | `yarn add -D @tailwindcss/vite`                   |
| @tanstack/react-query      | React Query for data fetching and state management  | `npm install @tanstack/react-query`                 | `yarn add @tanstack/react-query`                  |
| @tanstack/react-query-devtools | React Query Devtools for debugging                 | `npm install @tanstack/react-query-devtools`       | `yarn add @tanstack/react-query-devtools`        |
| aos                        | Animate on Scroll library                            | `npm install aos`                                   | `yarn add aos`                                    |
| axios                      | HTTP client for API requests                         | `npm install axios`                                 | `yarn add axios`                                  |
| firebase                   | Firebase JavaScript SDK                              | `npm install firebase`                              | `yarn add firebase`                               |
| framer-motion              | React animation library                              | `npm install framer-motion`                         | `yarn add framer-motion`                          |
| gsap                       | JavaScript animation toolkit                         | `npm install gsap`                                  | `yarn add gsap`                                   |
| leaflet                    | Interactive maps JavaScript library                  | `npm install leaflet`                               | `yarn add leaflet`                                |
| lottie-react               | React component for Lottie animations                | `npm install lottie-react`                          | `yarn add lottie-react`                           |
| lucide-react               | React icon library                                   | `npm install lucide-react`                          | `yarn add lucide-react`                           |
| motion                     | Animation library (part of framer-motion)           | `npm install motion`                                | `yarn add motion`                                 |
| react                      | React library for building UI                        | `npm install react`                                 | `yarn add react`                                  |
| react-admin                | React framework for building admin applications      | `npm install react-admin`                           | `yarn add react-admin`                            |
| react-countup              | React component for animated counting numbers        | `npm install react-countup`                         | `yarn add react-countup`                          |
| react-dom                  | React DOM rendering package                          | `npm install react-dom`                             | `yarn add react-dom`                              |
| react-fast-marquee         | React marquee component                              | `npm install react-fast-marquee`                    | `yarn add react-fast-marquee`                     |
| react-hook-form            | React form management library                        | `npm install react-hook-form`                       | `yarn add react-hook-form`                        |
| react-icons                | Popular icon packs as React components               | `npm install react-icons`                           | `yarn add react-icons`                            |
| react-leaflet              | React components for Leaflet maps                    | `npm install react-leaflet`                         | `yarn add react-leaflet`                          |
| react-leaflet-cluster      | Marker clustering for react-leaflet                  | `npm install react-leaflet-cluster`                 | `yarn add react-leaflet-cluster`                  |
| react-router               | Routing library for React                            | `npm install react-router`                          | `yarn add react-router`                           |
| react-typed                | React wrapper for typed.js typing animations        | `npm install react-typed`                           | `yarn add react-typed`                            |
| react-typist-component     | React component for typing animations                | `npm install react-typist-component`                | `yarn add react-typist-component`                  |
| sonner                     | React toast/notification library                     | `npm install sonner`                                | `yarn add sonner`                                 |
| stripe                     | Stripe API library for payments                      | `npm install stripe`                                | `yarn add stripe`                                 |
| sweetalert2                | Beautiful alerts and popups                          | `npm install sweetalert2`                           | `yarn add sweetalert2`                            |
| swiper                     | Modern touch slider library                          | `npm install swiper`                                | `yarn add swiper`                                 |
| tailwindcss                | Utility-first CSS framework                          | `npm install tailwindcss`                           | `yarn add tailwindcss`                            |

---

## Install all packages at once (npm)

```bash
npm install @chakra-ui/react @coreui/react-pro @emotion/react @emotion/styled @mui/material @tailwindcss/vite @tanstack/react-query @tanstack/react-query-devtools aos axios firebase framer-motion gsap leaflet lottie-react lucide-react motion react react-admin react-countup react-dom react-fast-marquee react-hook-form react-icons react-leaflet react-leaflet-cluster react-router react-typed react-typist-component sonner stripe sweetalert2 swiper tailwindcss
