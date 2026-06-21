# ExamRank – Frontend

Free marks-to-percentile/rank estimator for Indian entrance exams (JEE Main, MHT-CET, NEET, JEE Advanced).

## Stack

- **React 19** + **Vite 5**
- **React Router DOM v6** (SPA routing)
- **Tailwind CSS v3** (utility-first styling, dark mode via class)
- **Axios** (API calls with interceptors)
- **React Helmet Async** (SEO meta tags per page)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with mobile menu + dark toggle
│   ├── Footer.jsx          # Footer with links
│   ├── Hero.jsx            # Landing hero section
│   ├── PredictorCard.jsx   # Exam card on homepage
│   ├── PredictorForm.jsx   # Marks input form + animated result card
│   ├── LoadingSpinner.jsx  # Reusable spinner (inline + block)
│   └── SEOSection.jsx      # FAQ, stats, how-it-works, disclaimer
├── pages/
│   ├── Home.jsx            # /
│   ├── Jee.jsx             # /jee
│   ├── Mhtcet.jsx          # /mhtcet
│   ├── Neet.jsx            # /neet
│   ├── JeeAdvanced.jsx     # /jee-advanced
│   └── NotFound.jsx        # 404
├── services/
│   └── api.js              # Axios instance + endpoint functions
├── utils/
│   └── constants.js        # Exam configs, FAQ, stats, disclaimer
└── styles/
    └── globals.css         # Tailwind directives + custom utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend running at `http://localhost:8000`

### Install

```bash
cd frontend
npm install
```

### Dev server

```bash
npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
# Output: dist/
```

### Preview production build

```bash
npm run preview
```

## Backend API

The frontend expects a REST API at `http://localhost:8000` with these endpoints:

| Endpoint | Method | Payload | Response |
|---|---|---|---|
| `/predict/jee` | POST | `{ "marks": 140 }` | `{ "percentile": 92.5, "rank": 68000, "confidence": "High" }` |
| `/predict/mhtcet` | POST | `{ "marks": 155 }` | `{ "percentile": 97.2, "rank": null, "confidence": "High" }` |
| `/predict/neet` | POST | `{ "marks": 580 }` | `{ "percentile": 92.1, "rank": 52000, "confidence": "Medium" }` |
| `/predict/jeeadv` | POST | `{ "marks": 210 }` | `{ "percentile": null, "rank": 3800, "confidence": "High" }` |

Confidence values: `"High"` | `"Medium"` | `"Low"`

## Features

- ✅ Dark mode (persisted to localStorage, respects system preference)
- ✅ Mobile-first responsive design
- ✅ Lazy-loaded pages with Suspense
- ✅ Per-page SEO (title, description, canonical, OG, structured data)
- ✅ Accessible (ARIA labels, keyboard nav, focus rings, reduced motion)
- ✅ Animated score bar on result card
- ✅ Form validation with range checks
- ✅ Error handling with friendly messages
- ✅ React.memo on all components

## Disclaimer

This tool provides estimates based on historical trends and is not affiliated with NTA, IIT, or any official exam body.
