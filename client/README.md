# Savora_App — Client

This repository is a monorepo for the Savora application. The `client` folder contains a React + Vite frontend.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

Quick overview
- Frontend: React + Vite
- Styling: Tailwind CSS (configured in the project)
- Routing: react-router-dom
- HTTP: axios

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn)

Local development
1. Install dependencies:

	cd client
	npm install

2. Start the dev server:

	npm run dev

The frontend dev server runs with Vite and supports HMR. Open the URL printed by Vite (usually http://localhost:5173).

Server (backend)
The backend lives in the `server` folder. To run the backend locally:

	cd ../server
	npm install

Create a `.env` file in the `server` folder with the required environment variables. Typical variables used by the project:

- `PORT` — server port (e.g. 5000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JSON Web Tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — for image uploads (if used)
- Email settings (if used): `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

Start the backend in development mode:

	npm run dev

API
The backend exposes REST endpoints under the routes defined in `server/src/routers`. When running locally, point the frontend API calls to the backend URL (for example, `http://localhost:5000`).

Project structure (top-level)
- `client/` — React frontend (this folder)
- `server/` — Node/Express backend


