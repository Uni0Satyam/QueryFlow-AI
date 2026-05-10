# QueryFlow AI

QueryFlow AI is a full-stack chat application that combines secure user authentication with threaded AI-powered conversations.

## What it does

- Sign up and log in users
- Create, list, and view chat threads
- Send user questions and receive AI responses
- Remember previous chat context for ongoing conversations
- Protect routes with token-based authentication

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Setup

1. In `backend/`:

```bash
cd backend
npm install
```

2. In `frontend/`:

```bash
cd frontend
npm install
```

3. Run both apps:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

## Environment variables

Create `backend/.env` with:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
TOKEN_KEY=random_string
MODEL_API=your_ai_api_key
```

## Key API routes

- `POST /auth/signup` — register
- `POST /auth/login` — login
- `POST /v1/chat` — send a chat message
- `GET /api/thread` — list threads
- `GET /api/thread/:id` — get thread details

## Project structure

- `backend/` — API server, auth middleware, controllers, models
- `frontend/` — React app, routes, protected pages

## Notes

- Requires Node.js and MongoDB
- Frontend and backend run separately

## Author

Satyam Kushwaha