# DevDoctor AI 🩺

**AI-powered code analysis SaaS platform.** Analyze code for bugs, security vulnerabilities, performance issues, and more using Google Gemini 1.5 Flash.

## ✨ Features

| Tool | Description |
|------|-------------|
| Code Review | Readability, best practices, improvements |
| Bug Detector | Logical bugs, runtime errors, crashes |
| Security Scanner | OWASP vulnerabilities, injection risks |
| Performance Analyzer | Slow operations, memory leaks |
| Code Quality | Readability, maintainability, complexity scores |
| Architecture Analyzer | Folder structure, modularity, scalability |
| GitHub Analyzer | Full repository analysis via GitHub API |
| Debug Assistant | Root-cause analysis of errors/stack traces |
| Code Explainer | Step-by-step code explanation |

## 📦 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS v3 + Chart.js + React Router
- **Backend**: Node.js + Express.js + MongoDB (Mongoose)
- **AI**: Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Auth**: JWT (jsonwebtoken + bcryptjs)

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally or MongoDB Atlas URI
- Google Gemini API key → [Get one here](https://aistudio.google.com/app/apikey)

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devdoctor
JWT_SECRET=your_super_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=your_github_token_here   # optional but recommended
```

Start backend:
```bash
npm run dev      # with nodemon (install: npm i -g nodemon)
# OR
npm start        # with node
```

Backend runs at: **http://localhost:5000**

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

## 📁 Project Structure

```
devdoctor-ai/
├── backend/
│   ├── server.js           # Express entry point
│   ├── .env                # Environment variables
│   ├── config/db.js        # MongoDB connection
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Report.js       # Report schema
│   ├── middleware/
│   │   ├── auth.js         # JWT middleware
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── toolsController.js
│   ├── services/
│   │   └── geminiService.js  # Gemini AI + prompts
│   └── routes/
│       ├── auth.js
│       └── tools.js
└── frontend/
    └── src/
        ├── App.jsx          # Router setup
        ├── context/AuthContext.jsx
        ├── api/axios.js     # Axios + JWT interceptors
        ├── hooks/useTheme.js
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── Navbar.jsx
        │   ├── DashboardLayout.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── CodeEditor.jsx
        │   ├── ResultPanel.jsx
        │   ├── ScoreChart.jsx
        │   └── ToolPage.jsx  # Reusable tool page
        └── pages/
            ├── Landing.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Pricing.jsx
            ├── Documentation.jsx
            └── dashboard/
                ├── Overview.jsx
                ├── CodeReview.jsx
                ├── BugDetector.jsx
                ├── SecurityScanner.jsx
                ├── PerformanceAnalyzer.jsx
                ├── CodeQuality.jsx
                ├── ArchitectureAnalyzer.jsx
                ├── GitHubAnalyzer.jsx
                ├── DebugAssistant.jsx
                ├── CodeExplainer.jsx
                └── ReportHistory.jsx
```

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### AI Tools (all require `Authorization: Bearer <token>`)
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/tools/code-review` | `{ code }` |
| POST | `/api/tools/bug-detect` | `{ code }` |
| POST | `/api/tools/security-scan` | `{ code }` |
| POST | `/api/tools/performance` | `{ code }` |
| POST | `/api/tools/code-quality` | `{ code }` |
| POST | `/api/tools/architecture` | `{ code }` |
| POST | `/api/tools/github-analyze` | `{ repoUrl }` |
| POST | `/api/tools/debug` | `{ code }` |
| POST | `/api/tools/explain` | `{ code }` |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools/reports` | List all reports |
| GET | `/api/tools/reports/:id` | Get single report |
| DELETE | `/api/tools/reports/:id` | Delete a report |
| GET | `/api/tools/dashboard-stats` | Dashboard statistics |

## 🎨 Design System

- **Colors**: Custom `brand` (violet/indigo) palette with dark mode support
- **Typography**: Inter (UI) + JetBrains Mono (code)
- **Components**: Cards, buttons, badges, inputs all themed consistently
- **Dark Mode**: Class-based (`dark:`) with localStorage persistence
- **Animations**: fade-in, slide-in, glow keyframes

## 📝 License

MIT — Built with ❤️ using Google Gemini + React + Express
