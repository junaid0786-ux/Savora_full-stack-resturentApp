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