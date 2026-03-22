# 🚀 MERN AI Flow

A full-stack web application that integrates React Flow visualization with OpenRouter AI API. Users can input prompts, get AI responses, and save them to MongoDB.

**Live Demo**: https://futureblink-mauve.vercel.app/

---

## 📋 Features

✅ **Visual Node-Based Interface** - Interactive React Flow with Input and Result nodes  
✅ **AI Integration** - Real-time responses from OpenRouter API (Mistral AI)  
✅ **Database Storage** - Save prompts and responses to MongoDB Atlas  
✅ **Error Handling** - User-friendly error messages and validation  

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool (fast!)
- **@xyflow/react** - React Flow visualization
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Axios** - HTTP requests to OpenRouter

### Cloud Services
- **MongoDB Atlas** - Cloud database
- **OpenRouter** - AI API (Mistral model)
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Free account](https://www.mongodb.com/cloud/atlas)
- **OpenRouter API Key** - [Get key](https://openrouter.ai/)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/zabin0007/FutureBlink.git
cd FutureBlink
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

```

**Start backend:**
```bash
npm run dev
```

You should see:
```
✅ Server is running on http://localhost:5000
✅ MongoDB connected successfully!
✅ CORS enabled for: http://localhost:3000
```

### 3. Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional for local)
cp .env.production .env.local

# Start frontend
npm run dev
```

You should see:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

### 4. Open in Browser

Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 📖 How to Use

1. **Type a Prompt** - Click in the Input Node and type your question
   - Example: "What is the capital of France?"

2. **Click "Run Flow"** - The app sends your prompt to the backend
   - The backend calls OpenRouter AI API
   - Response appears in the Result Node

3. **Click "Save"** (Optional) - Stores the prompt and response to MongoDB
   - You'll see: "✅ Saved successfully!"

4. **View Results** - Both nodes show:
   - Input Node: Your prompt
   - Result Node: AI's response

---

## 🔌 API Endpoints

### `/api/ask-ai` (POST)
Calls the AI and returns a response

**Request:**
```json
{
  "prompt": "What is the capital of France?"
}
```

**Response:**
```json
{
  "prompt": "What is the capital of France?",
  "response": "The capital of France is Paris..."
}
```

### `/api/save-prompt` (POST)
Saves prompt and response to MongoDB

**Request:**
```json
{
  "prompt": "What is the capital of France?",
  "response": "The capital of France is Paris..."
}
```

**Response:**
```json
{
  "message": "Prompt saved successfully!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "prompt": "What is the capital of France?",
    "response": "The capital of France is Paris...",
    "createdAt": "2024-03-21T10:30:00Z"
  }
}
```

### `/api/prompts` (GET)
Retrieves all saved prompts

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "prompt": "What is the capital of France?",
    "response": "The capital of France is Paris...",
    "createdAt": "2024-03-21T10:30:00Z"
  }
]
```

---

## 🗂️ Project Structure

```
mern-ai-flow/
├── server/                          # Backend (Express.js)
│   ├── server.js                   # Main server file
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables
│   ├── .env.example                # Example env file
│   ├── models/
│   │   └── Prompt.js              # MongoDB schema
|   |──Controller/
|   |         └── promptService.js           #logic
|   |──Router/
|   |         └── router.js         # endpoint
│   └── services.js                 # OpenRouter AI integration
│                                
│    
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── App.jsx                # Main component with React Flow
│   │   ├── App.css                # Styling
│   │   └── main.jsx               # Entry point
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── .env.production            # Production env file
│
├── README.md                        # This file
└── .gitignore                      # Git ignore file
```

---

## 🌍 Deployment

### Deploy Backend on Render

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Create New Web Service
4. Select this repository
5. Configure:
   - Root Directory: ``
   - Build Command: `cd backend && npm install `
   - Start Command: `cd backend && npm start`
6. Add Environment Variables:
   - `PORT=5000`
   - `MONGODB_URI=your-mongodb-uri`
   - `OPENROUTER_API_KEY=your-key`
   - `FRONTEND_URL=your-vercel-url`

### Deploy Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import Project
4. Configure:
   - Root Directory: `client`
   - Framework: `Vite`
5. Add Environment Variable:
   - `VITE_BACKEND_URL=your-render-url`
6. Deploy!

