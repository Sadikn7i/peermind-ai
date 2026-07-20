
# ⬡ PeerMind AI — Academic Peer Review Platform

![PeerMind AI](./client/Ai%20reviewer.png)

> **Rigorous AI-powered peer review for academic research papers — in under 30 seconds.**

---

## ✦ Overview

PeerMind AI is a full-stack web application that allows researchers, students, and academics to upload their research papers (PDF) and receive instant, structured peer review feedback powered by Google Gemini AI.

No more waiting weeks for reviewer feedback. Get detailed, actionable insights immediately.

---

## Features

- **PDF Upload** — Drag & drop or click to upload any research paper
- **AI-Powered Review** — Powered by Google Gemini / Anthropic Claude
- **5 Review Criteria** — Originality, Methodology, Clarity, References, Contribution
- **10-Point Scoring** — Each section scored individually with an overall score
- **3 Reviewer Personas** — Constructive, Strict, or Expert reviewer style
- **Decision Output** — Accept / Minor Revision / Major Revision / Reject
- **Strengths & Weaknesses** — Clear breakdown of what works and what doesn't
- **Fast** — Full review generated in under 30 seconds
- **Secure** — Papers are never stored, processed in memory only

---

## Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- Axios
- Custom CSS (no UI library)

**Backend**
- Node.js + Express
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Google Generative AI SDK / Anthropic SDK

---

## Project Structure
```
reviewer/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadPanel.jsx
│   │   │   ├── PersonaSelector.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── ReviewReport.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   └── ScoreBadge.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Review.jsx
│   │   └── services/
│   │       └── api.js
│   └── index.html
└── server/                     # Node.js Backend
    ├── controllers/
    │   └── reviewController.js
    ├── middleware/
    │   └── upload.js
    ├── prompts/
    │   └── reviewPrompt.js
    ├── routes/
    │   └── review.js
    ├── services/
    │   ├── aiService.js
    │   └── pdfParser.js
    └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com)) or Anthropic API key

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/peermind-ai.git
cd peermind-ai
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Configure environment variables
Create a `.env` file inside the `server/` folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### 4. Install client dependencies
```bash
cd ../client
npm install
```

### 5. Run the app

Open two terminals:

**Terminal 1 — Start the backend:**
```bash
cd server
node server.js
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```

### 6. Open in browser
```
http://localhost:5173
```

---

## Switching to Anthropic Claude API

To use Anthropic Claude instead of Gemini, update `server/.env`:
```env
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Then update `server/services/aiService.js` to use the `@anthropic-ai/sdk` package.

---

## How It Works

1. User uploads a PDF research paper
2. Backend extracts text using `pdf-parse`
3. Extracted text is sent to the AI with a structured peer review prompt
4. AI returns a JSON review with scores, feedback, strengths, weaknesses, and suggestions
5. Frontend displays the review in a beautiful, structured report

---

## Roadmap

- [ ] User authentication & review history
- [ ] Export review as PDF
- [ ] Support for multiple AI models
- [ ] Streaming responses
- [ ] Multi-language support
- [ ] Deploy to production (Vercel + Railway)

---

## Deployment

**Frontend** → [Vercel](https://vercel.com)  
**Backend** → [Railway](https://railway.app) or [Render](https://render.com)

---

## License

MIT License — free to use and modify.

---

## 👤 Author

Built with wuv and luv by [@Sadikn7i](https://github.com/Sadikn7i)

---

> *PeerMind AI — Where research meets intelligence.*
