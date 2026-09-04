# 🚀 AI Studio App

A modern AI-powered application built with Google's Gemini API, ready to run locally and deploy to production.

---

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (included with Node.js)
- **Gemini API Key** (get one at [ai.google.dev](https://ai.google.dev))

---

## 🔧 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or update the `.env.local` file with your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Run Locally
```bash
npm run dev
```

The app will start and be accessible at `http://localhost:3000` (or the configured port).

---

## 🎯 Access Your App

View and manage your app in **AI Studio**: https://ai.studio/apps/dee22918-0868-456a-b94a-6f2c5d453edf

---

## 📦 Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm start` – Run the production build

---

## 📝 Notes

- Keep your `GEMINI_API_KEY` secure and never commit it to version control
- The `.env.local` file is excluded from git by default

---

## 📖 Learn More

- [Google AI Studio Documentation](https://ai.google.dev)
- [Node.js Documentation](https://nodejs.org/docs)

---
