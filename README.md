# WorkHub

A multilingual labour platform connecting workers with verified employers. Built as a React single-page app with three role-based portals: **Worker**, **Company**, and **Admin**.

## Features

- **Worker portal** – dashboard, job browsing with match scores, applications, earnings and payments, digital work passport, documents, reviews, rights and complaints.
- **Company portal** – dashboard, job postings, applicants, attendance, payments, compliance policies and employer responsibilities.
- **Admin portal** – platform analytics, job approvals, fraud alerts, complaints, and verification oversight.
- **Multilingual UI** – English, हिंदी, मराठी, தமிழ், বাংলা.
- **Voice prompts** and charts (Recharts) for accessibility and insight.

> The app currently runs on built-in sample data (workers, companies, jobs, payments, etc.) defined in `Workhub-labour-platform.jsx`; there is no backend.

## Tech Stack

- React 18
- Vite 5
- Recharts
- lucide-react

## Getting Started

Prerequisites: Node.js 18+ and npm (Python 3 is optional, for the launcher).

```bash
npm install
npm run dev
```

The app is served at <http://localhost:5000>.

Alternatively, use the launcher, which installs dependencies if needed, starts the dev server and opens your browser:

```bash
python3 main.py
```

### Other scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build       |

## Project Structure

```
Workhub/
├── Workhub-labour-platform.jsx   # Main app: components, views, translations, sample data
├── src/                          # App entry point
├── index.html                    # HTML template
├── main.py                       # Dev launcher
├── vite.config.js                # Vite config (port 5000)
└── dist/                         # Production build output
```
