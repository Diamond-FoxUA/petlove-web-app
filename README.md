# 🐾 PetLove

PetLove is a modern, full-featured web application designed for pet care management, booking doctor appointments, and exploring community pet services. Built with a robust frontend architecture using **React 19**, **Next.js 16 (App Router)**, and **Redux Toolkit**, this project stands out due to its extreme focus on modern web standards: semantic HTML, comprehensive accessibility (A11y), search engine optimization (SEO), modular folder architecture, and optimized hybrid data-fetching patterns.

🔗 **Live Demo:** https://petlove-web-app.vercel.app/

---

## 🌟 Advanced Technical Highlights

### 🏗️ Feature-Driven Modular Architecture
*   **Scalable Folder Design:** Organized using a **Feature-Driven Folder Structure** inside the Next.js App Router layout. Components, hooks, types, and state slices are co-located within dedicated feature directories rather than scattered globally.
*   **High Cohesion & Low Coupling:** Code is structured by business domains (e.g., Auth, Profile, Appointments, News), making the codebase highly maintainable, isolated, and effortlessly scalable.

### 🔍 Elite SEO & Next-Gen Semantics
*   **Semantic Layouts:** Built strictly with native semantic HTML elements (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) to construct an immaculate document outline.
*   **Section-Heading Associations:** Every content container and interactive block is programmatic, explicitly mapping sections to their corresponding headers (`aria-labelledby`) for bulletproof heading trees.
*   **Search Engine Optimization:** Fully optimized for search crawlers utilizing modern Next.js metadata configurations, semantic structure, and performant server rendering.

### ♿ Accessibility (A11y) & Screen Reader Optimization
*   **Native Dialogs:** Implements the native HTML `<dialog>` element for robust, accessible modal management that handles focus traps and backdrop rendering naturally.
*   **Advanced ARIA Implementation:** Leverages explicit `aria-label`, `aria-labelledby`, and `aria-describedby` attributes to deliver rich context to assistive technologies.
*   **Clutter Reduction:** Employs strategic `aria-hidden="true"` on decorative elements, icons, and non-interactive graphics to save screen readers from processing unnecessary audible noise.
*   **Keyboard Navigation:** Fully focusable interactive paths ensuring the app is entirely navigable via keyboard controls.

### ⚡ Server-First Architecture & Hybrid Data Fetching
*   **Dominant Server Components:** The vast majority of the application relies heavily on **React Server Components (RSC)**, significantly eliminating client-side JavaScript bloat, slashing Time to Interactive (TTI), and boosting Core Web Vitals.
*   **Direct Server-Side Requests:** Pages handling heavily public or read-heavy dynamic data (e.g., the News page) perform raw server-side fetching directly inside the server component to guarantee instant rendering and optimal indexing.
*   **Stateful Client-Side Requests:** Interactive, protected, or complex application states (e.g., dynamic dashboards, user profile alterations, real-time filters) transition smoothly into **Redux Toolkit** hooks on the client side for optimal client performance.

---

## 🚀 General Core Features

*   **App Router System:** Leverages Next.js 16 layout structures, file-based routing, and swift nested navigation.
*   **Global State Management:** Seamlessly handles global user states and application data utilizing Redux Toolkit.
*   **Comprehensive Forms & Validation:** Smooth user input handling and automated validation powered by React Hook Form integrated with Yup schema.
*   **Dynamic Custom Dropdowns:** Highly interactive and accessible selection fields built using React Select.
*   **Flexible Appointment Booking:** Built-in interactive appointment scheduler driven by React Datepicker.
*   **State-of-the-Art Feedback:** Beautiful, lightweight, non-blocking toast alerts powered by Sonner.
*   **Secure Authentication Flow:** Cookie-based session processing using the lightweight `cookie` utility.
*   **Strict Quality Control:** Code reliability enforced through TypeScript typing and ESLint modular rules.

---

## 🛠️ Tech Stack & Dependencies

### Core Framework
*   **React & React-DOM (v19.2.4)** — Component-based declarative views.
*   **Next.js (v16.2.6)** — Core framework featuring file-based routing (App Router).

### State & Networking
*   **@reduxjs/toolkit (v2.12.0) & react-redux (v9.3.0)** — Centralized scalable data store.
*   **Axios (v1.17.0)** — Tailored HTTP client for smooth, promise-based API fetching.
*   **Cookie (v1.1.1)** — Direct parsing and serialization of access tokens.

### Forms & Schema Validation
*   **React Hook Form (v7.78.0)** — Lightweight, high-performance form handlers.
*   **@hookform/resolvers (v5.4.0)** — Bridges validation libraries with React Hook Form.
*   **Yup (v1.7.1)** — Descriptive object-schema validation.

### Interactive Components
*   **React Datepicker (v9.1.0) & @types/react-datepicker** — Custom styled scheduling calendars.
*   **React Select (v5.10.2)** — Highly customizable input-search dropdown filters.
*   **Sonner (v2.0.7)** — Smooth notification toasts.

---

## 📂 Project Structure (Feature-Driven Design)

---

## 📂 Project Structure (Feature-Driven Design)

```text
petlove-web-app/
├── app/                      # Next.js App Router (Core Application Layer)
│   ├── (auth)/               # Feature Domain: Authentication routes
│   │   ├── login/            # Sign In page
│   │   └── register/         # Sign Up page
│   ├── (private routes)/     # Protected layout groups
│   │   ├── add-pet/          # Add new pet form page
│   │   └── profile/          # User personal dashboard and profile settings
│   ├── (public routes)/      # Publicly accessible routes
│   │   ├── friends/          # Our friends / Partners directory page
│   │   ├── news/             # News portal with direct Server Component fetching
│   │   └── notices/          # Find pet listings, filters, and community notice board
│   ├── api/                  # Next.js Route Handlers for backend proxying & endpoints
│   ├── assets/               # Local static media (optimized images, vectors, hero graphics)
│   ├── features/             # Core Feature Modules (Slices, schemas, and specific widgets)
│   ├── shared/               # Global cross-cutting concerns (Reusable UI components, hooks, utils)
│   ├── globals.css           # Application global stylesheets and design tokens
│   ├── layout.tsx            # Main root layout enclosing core context providers
│   ├── page.tsx              # Application Landing / Home page
│   └── ...                   # Metadata configs, CSS modules, and error boundaries
├── public/                   # Static assets hosted at the root level
│   ├── og-image.jpg          # Open Graph image for rich social media previews (SEO)
│   └── sprite.svg            # Optimized SVG sprite sheet for accessible iconic infrastructure
├── .env                      # Local environment configurations
├── eslint.config.mjs         # Strict linter rules and structural configurations
├── next.config.ts            # Next.js compiler adjustments, optimizations, and rewrites
├── proxy.ts                  # Proxy routing script for local/cross-origin handling
├── tsconfig.json             # TypeScript compilation and strict rules configuration
└── package.json              # Project dependencies, scripts, and package information
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18.x or higher recommended) and **npm/yarn** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd petlove-web-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your API endpoints:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=your_api_endpoint_here

   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Build & Deployment

To build the project for production:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

The project is configured and fully optimized for one-click deployment on **Vercel**.

---

## 📄 License

This project is licensed under the **MIT License** — check the [LICENSE](LICENSE) file for more information.
