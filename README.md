# Eslam Mostafa — Portfolio (React Vite)

A pixel-perfect rebuild of the original portfolio using a modern, clean architecture.

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Bundler      | **Vite 5**                        |
| Framework    | **React 18**                      |
| Routing      | **React Router v6**               |
| Styling      | **Tailwind CSS v3**               |
| Icons        | **Lucide React**                  |
| Animations   | **Framer Motion**                 |
| HTTP / API   | **Axios** (EmailJS REST + GitHub) |
| Toasts       | **Sonner**                        |

## Architecture Differences vs Original

| Original (React Router v7 / Framework) | This (Vite SPA)                       |
|-----------------------------------------|---------------------------------------|
| File-based routing (app/routes.ts)      | `react-router-dom` declarative routes |
| SSR via Hono adapter                    | Pure client-side SPA                  |
| `@emailjs/browser` SDK                  | Axios POST to EmailJS REST API        |
| `motion/react` (Motion package)         | `framer-motion`                       |
| GitHub data: static                     | **Live** via Axios + GitHub API hook  |

## New: GitHub Stats Section

The `GithubStats` component uses a custom `useGithubData` hook that calls
the **GitHub REST API** via Axios to fetch live repos — this is the external API
integration added on top of the original design.

## Getting Started

```bash
cd D:\Work\Es
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env` and fill in your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
