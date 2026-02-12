# 🍔 Savora - Client (Frontend)

The frontend client for **Savora**, a full-stack multi-vendor food delivery platform. This application provides a seamless, responsive interface for Customers, Restaurant Partners, and Administrators.

Built with **React** and **Vite**, utilizing **Tailwind CSS** for modern, utility-first styling.

---

## ⚡ Tech Stack & Key Libraries

We chose a modern stack focused on performance, developer experience, and scalability.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | [React](https://react.dev/) | Utilizing latest Concurrent features and Hooks. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast HMR and optimized production builds. |
| **Routing** | [React Router](https://reactrouter.com/) | Client-side routing with nested layouts. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Design system and responsive layouts via `@tailwindcss/vite`. |
| **State Management** | Context API | Global state for Authentication (`AuthContext`) and Shopping Cart (`CartContext`). |
| **Data Fetching** | [Axios](https://axios-http.com/) | Centralized API client with interceptors for JWT handling. |
| **Visualization** | [Recharts](https://recharts.org/) | Interactive analytics charts for Restaurant Dashboards. |
| **UI Components** | [Lucide React](https://lucide.dev/) | Lightweight, consistent SVG icons. |
| **Notifications** | React Hot Toast | Minimalist toast notifications for user feedback. |

---

## 📂 Project Structure

The codebase follows a feature-based modular architecture to ensure maintainability.

```text
client/src
├── assets/              # Static assets and global styles
├── components/          # Reusable UI components
│   ├── publicModels/    # Global modals (e.g., Forgot Password)
│   ├── resturantModals/ # Partner-specific forms (Add Item, Edit Menu)
│   ├── resturentDashboard/ # Dashboard widgets (Sidebar, Transactions, Graphs)
│   ├── userDashboard/   # Customer profile components
│   ├── Header.jsx       # Adaptive navigation bar (Context-aware)
│   └── Footer.jsx       # Global footer
├── config/
│   └── Api.jsx          # Axios instance configuration & base URLs
├── context/
│   ├── AuthContext.jsx  # Authentication logic & User Role handling
│   └── CartContext.jsx  # Shopping cart logic (Add/Remove, Persistence)
├── pages/
│   ├── auth/            # Login & Register views
│   ├── dashboards/      # Role-protected dashboard views
│   ├── Home.jsx         # Landing page
│   ├── Order.jsx        # Restaurant listing & filtering
│   ├── RestaurantDetails.jsx # Dynamic menu page
│   └── Cart.jsx         # Checkout interface
├── App.jsx              # Main application router
└── main.jsx             # Entry point


# 🛡️ Savora - Server (Backend)

The backend API for **Savora**, designed to handle high-concurrency requests for a multi-vendor food delivery platform. It serves as the central logic hub connecting Customers, Restaurant Partners, and Riders.

Built with **Node.js** and **Express 5**, utilizing **MongoDB** for scalable data storage.

---

## ⚙️ Tech Stack & Architecture

We utilize a robust MVC (Model-View-Controller) architecture to ensure separation of concerns.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | Scalable, event-driven JavaScript runtime. |
| **Framework** | [Express v5](https://expressjs.com/) | Next-generation web framework for routing and middleware. |
| **Database** | [MongoDB](https://www.mongodb.com/) | NoSQL database for flexible schema modeling via **Mongoose**. |
| **Authentication** | [JWT](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt) | Stateless authentication and password hashing. |
| **File Storage** | [Cloudinary](https://cloudinary.com/) | Cloud-based image optimization and storage. |
| **File Handling** | [Multer](https://github.com/expressjs/multer) | Middleware for handling `multipart/form-data` uploads. |
| **Email Service** | [Nodemailer](https://nodemailer.com/) | Transactional emails (Welcome, OTPs, Reset Password). |
| **Logging** | [Morgan](https://github.com/expressjs/morgan) | HTTP request logger for debugging and monitoring. |

---

## 📂 Project Structure

The codebase is organized to support scalability and maintainability.

```text
server/src
├── config/              # External service configurations
│   ├── db.js            # MongoDB connection logic
│   ├── cloudinaryUpload.js # Cloudinary SDK setup
│   └── email.js         # Nodemailer transporter configuration
├── controllers/         # Business logic layer
│   ├── authController.js       # Login, Register, OTP logic
│   ├── restaurantController.js # Menu CRUD & Profile management
│   ├── orderController.js      # Order placement & tracking
│   └── publicController.js     # Public-facing data (Restaurant listing)
├── middleware/          # Request interceptors
│   ├── authMiddleware.js   # JWT verification & Role-Based Access Control (RBAC)
│   └── uploadMiddleware.js # Multer configuration for file uploads
├── models/              # Mongoose Data Schemas
│   ├── userModel.js     # Unified User schema (Customer, Admin, Partner)
│   ├── menuSchema.js    # Food items linked to restaurants
│   ├── OrderModel.js    # Transactional order data
│   └── otpModel.js      # Temporary OTP storage
├── routers/             # API Route definitions
│   ├── authRouter.js
│   ├── orderRoutes.js
│   ├── publicRouter.js
│   └── restaurantRouter.js
└── utils/               # Helper functions
    ├── authToken.js     # JWT generation utility
    ├── emailService.js  # Email template & sending logic
    └── imageUploader.js # Streamifier logic for cloud uploads
