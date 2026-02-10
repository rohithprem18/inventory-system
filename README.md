# Inventory Management System (React + LocalStorage)

A frontend-only Inventory Management System with role-based authentication (Retailer, Customer), product expiry tracking, and LocalStorage persistence. Designed for easy deployment on Netlify, Vercel, or GitHub Pages.

## Features
- Register/Login with role selection (Retailer or Customer)
- LocalStorage-backed session persistence
- Retailer dashboard:
  - Add, edit, delete products
  - Expiry-aware recommendations
  - Automatic grouping: Expired, Expiring Soon (≤ 7 days), Safe
- Customer view:
  - Browse non-expired products only
  - Search by name
  - Filter by category and price range
- Route protection by role using React Router
- Build-ready with no backend dependencies

## Tech Stack
- React (functional components + hooks)
- React Router
- LocalStorage as data store
- Vite for build tooling
- Plain CSS

## Folder Structure
```txt
inventory-system/
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    styles.css
    components/
      Navbar.jsx
      ProductForm.jsx
      ProductTable.jsx
      ProtectedRoute.jsx
    context/
      AuthContext.jsx
    pages/
      CustomerView.jsx
      Login.jsx
      Register.jsx
      RetailerDashboard.jsx
    utils/
      auth.js
      products.js
      storage.js
```

## LocalStorage Design
Data is stored as JSON using the following keys:
- `users`
- `products`
- `currentUser`

## Route Map
- `/login` — Login screen
- `/register` — Registration screen
- `/retailer` — Retailer dashboard (Retailer only)
- `/products` — Customer product view (Customer only)

## Expiry Logic
Products are categorized based on `expiryDate` compared with today's date:
- **Expired**: expiry date before today
- **Expiring Soon**: expiry date within 7 days (inclusive)
- **Safe**: beyond 7 days

Retailer recommendations prioritize the nearest expiries.

## Getting Started
Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev
```

Create a production build:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

## Deployment
This is a static frontend and can be deployed to:
- **Netlify**: build command `npm run build`, publish directory `dist`
- **Vercel**: build command `npm run build`, output `dist`
- **GitHub Pages**: set a `base` in `vite.config.js` if deploying under a subpath

## Notes
- Passwords are hashed with browser `crypto.subtle` (demo-level security only).
- All data persists in LocalStorage, so clearing browser storage will reset the app.

## Future Extensions
The architecture is structured to easily add:
- Orders
- Cart/checkout
- Analytics dashboards
- Multi-store inventory support

