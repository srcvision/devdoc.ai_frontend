<div align="center">

<h1>🛡️ DevDoc.AI</h1>

<p><strong>AI-Powered Code Intelligence Platform for Modern Developers</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<p>
  <a href="#-live-demo">🚀 Live Demo</a> •
  <a href="#-key-features">✨ Features</a> •
  <a href="#-tech-stack">🛠️ Stack</a> •
  <a href="#-setup">⚙️ Setup</a> •
  <a href="#-author">👤 Author</a>
</p>

<br/>

> **DevDoc.AI** is a full-stack SaaS platform that acts as your automated technical consultant — analyzing code in real-time, catching bugs before they reach production, and surfacing security vulnerabilities before they're exploited.

</div>

---

## 🧠 What Problem Does This Solve?

Most developers ship code fast and do code reviews slow. Manual peer reviews are bottlenecked, security audits are expensive, and documentation is always an afterthought.

**DevDoc.AI solves this by giving every developer an AI pair programmer that never sleeps.**

| Pain Point | DevDoc.AI Solution |
|---|---|
| Slow manual code reviews | ⚡ Instant AI-driven analysis |
| Missed security vulnerabilities | 🛡️ OWASP-aligned security scanning |
| Undocumented codebases | 📄 Auto-generated code explanations |
| No architectural visibility | 🏗️ Repo-level structural breakdown |

---

## ✨ Key Features

### 🔍 Code Review Engine
Analyzes code for best practices, naming conventions, and maintainability issues — beyond what a linter can catch.

### 🐛 Bug Detector
Identifies logic errors, potential runtime exceptions, and edge cases using Gemini 1.5 Flash as the analysis backbone.

### 🛡️ Security Scanner
Maps code against known OWASP vulnerability patterns. Flags injection risks, insecure auth handling, exposed secrets, and more.

### 📁 GitHub Repository Sync
Connect your GitHub repo via REST API and run analysis across your entire codebase — not just paste snippets.

### 📄 Code Explainer
Generates plain-English walkthroughs of complex functions. Useful for onboarding, documentation, and learning unfamiliar code.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| React 19 + Vite | UI framework & bundler |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Chart.js | Dashboard visualizations |
| Lucide Icons | Icon system |
| React Context API | Auth & theme state management |

### Backend
| Technology | Role |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM / schema modeling |
| JWT | Stateless authentication |
| Google Generative AI SDK | Gemini 1.5 Flash integration |
| Groq SDK | Alternative LLM inference |

---

## 🔐 Authentication Flow

```
User → Login/Register
       ↓
   Express Auth Controller
       ↓
   Password hashed (bcrypt) → Stored in MongoDB
       ↓
   JWT issued (signed with JWT_SECRET)
       ↓
   Token stored on client (localStorage/cookie)
       ↓
   Protected routes → JWT middleware validates token
       ↓
   Access granted → AI tools unlocked
```

---

## 📁 Project Structure

```
devdoc-ai/
├── backend/
│   ├── config/          # DB connections, env config
│   ├── controllers/     # AI analysis logic, auth handlers
│   ├── middleware/      # JWT verification, error handling
│   ├── models/          # User & Report Mongoose schemas
│   ├── services/        # Gemini API service layer
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Sidebar, Editor, Cards
│   │   ├── context/     # AuthContext, ThemeContext
│   │   ├── pages/       # Dashboard, Tools, Landing
│   │   └── utils/       # API helpers, constants
│   └── tailwind.config.js
│
└── docs/                # Screenshots, architecture diagrams
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas cloud cluster)
- Gemini API Key → [Get it here](https://aistudio.google.com/)

### 1. Clone the Repo
```bash
git clone https://github.com/srcvision/devdoc-ai.git
cd devdoc-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## 🖼️ Screenshots

> *(Add your actual screenshots here — Landing, Dashboard, Code Review UI)*

| Landing Page | Dashboard | Security Scan |
|---|---|---|
| ![Landing](./docs/landing.png) | ![Dashboard](./docs/dashboard.png) | ![Security](./docs/security.png) |

---

## 🗺️ Roadmap

- [x] JWT Authentication
- [x] Code Review via Gemini
- [x] Bug Detection
- [x] Security Scanner
- [x] GitHub Repo Sync
- [ ] VS Code Extension integration
- [ ] Team workspaces & shared reports
- [ ] PR comment bot (GitHub Actions)
- [ ] Support for GPT-4o as alternative model

---

## 👤 Author

**Saurav Chaudhari** — Full Stack Developer

- 🌐 Portfolio: [your-portfolio.com](https://your-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/saurav-chaudhari-1ab838265](https://linkedin.com/in/saurav-chaudhari-1ab838265)
- 🐙 GitHub: [github.com/srcvision](https://github.com/srcvision)
- 📧 Email: your@email.com

---

## 🤝 Contributing

Contributions welcome. Open an issue first to discuss changes before submitting a PR.

```bash
# Standard flow
git checkout -b feature/your-feature
git commit -m "feat: describe what you added"
git push origin feature/your-feature
# → Open Pull Request
```

---

## 📝 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">
  <sub>Built by <a href="https://github.com/srcvision">Saurav Chaudhari</a> · Powered by Gemini 1.5 Flash</sub>
</div>
