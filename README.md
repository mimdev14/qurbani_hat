# QurbaniHat 🐄🐐

**A modern livestock booking platform for Qurbani** — browse verified cows
and goats, compare details honestly, and book the right animal before Eid.

### 🔗 Live URL
`https://qurbanihat.vercel.app` *(replace with your deployed link)*

### 📦 GitHub Repository
`https://github.com/mimdev14/qurbanihat` *(replace with your repo link)*

---

## 🎯 Purpose

QurbaniHat helps families find and reserve Qurbani animals without the
guesswork of an in-person haat. It presents a curated, filterable
marketplace of cows and goats with full specs (breed, weight, age,
price, location), a booking flow gated behind authentication, and a
simple profile system — all wrapped in a design inspired by the ticket
tokens used at real Bangladeshi cattle markets.

## ✨ Key Features

- **Home page** with a hero banner, 4 featured animals, a Qurbani Tips
  section, a Top Breeds section, and a "How QurbaniHat Works" walkthrough.
- **All Animals page** with type filtering (Cow / Goat) and sort-by-price
  (low → high, high → low).
- **Animal Details page** (private route) with full specs and a booking
  form (name, email, phone, address) that shows a success toast and
  resets on submit.
- **Authentication** via Better Auth — email/password register & login,
  plus Google social login, with friendly toast/error messaging.
- **My Profile** (private route) showing the logged-in user's name, photo,
  and email, with an **Update Information** flow for name and photo URL
  (using Better Auth's `updateUser`).
- **Private routes** that redirect unauthenticated users to Login and
  return them to the page they wanted afterward.
- **Fully responsive** layout for mobile, tablet, and desktop.
- **Loading states**, a custom **404 Not Found** page, and toast
  notifications throughout.

## 🧰 Tech Stack & npm Packages

- **Next.js 16 (App Router)** — routing, layouts, and rendering
- **React 19** — UI
- **Better Auth** + **@better-auth/mongo-adapter** — email/password and
  Google authentication, session management
- **MongoDB (native driver)** — Better Auth's data store
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Axios** — fetching animal data
- **React Toastify** — toast notifications
- **Animate.css** — entrance/menu micro-animations

## 🔐 Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your own values:

```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=qurbanihat

BETTER_AUTH_SECRET=generate_a_long_random_string
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Generate `BETTER_AUTH_SECRET` with `npx auth secret` or
`openssl rand -base64 32`. Get Google OAuth credentials from the
[Google Cloud Console](https://console.cloud.google.com/apis/credentials)
(set the authorized redirect URI to
`<your-domain>/api/auth/callback/google`).

## 🚀 Running Locally

```bash
npm install
npm run dev
```

## 🏗️ Building for Production

```bash
npm run build
npm run start
```

## 🗂️ Project Structure

```
app/
  api/auth/[...all]/route.js   Better Auth route handler
  animals/                     All Animals + Animal Details (private) pages
  login/, register/            Auth pages
  my-profile/                  Profile (private) + Update Information (private)
  layout.js                    Root layout: fonts, Navbar, Footer, Toasts
  page.js                      Home page
components/                    Navbar, Footer, AnimalCard, LoadingSpinner, PrivateRoute
contexts/                      useAuth hook (wraps the Better Auth client)
lib/                           auth.js (server config), auth-client.js (browser client)
public/animals.json            Sample animal listings (6 cows/goats)
```
