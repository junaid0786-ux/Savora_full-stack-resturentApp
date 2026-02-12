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