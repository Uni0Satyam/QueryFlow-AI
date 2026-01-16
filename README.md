# QueryFlow AI 🚀

QueryFlow AI is a **full‑stack AI-powered chat and query management application** inspired by ChatGPT. It allows users to authenticate securely, create conversation threads, send queries, and receive AI-generated responses in real time. The project is built using the **MERN stack**.

---

## ✨ Features

* 🔐 **User Authentication & Authorization** (Token based)
* 💬 **Chat-based AI Interface**
* 🧵 **Conversation Threads** (multi-message support)
* 🤖 **AI Assistant Responses**
* ⚡ **Real-time UI updates**
* 🗂️ **Modular Backend Architecture**
* 🎨 **Modern React UI**
* 🛡️ **Protected Routes (Frontend & Backend)**

---

## 🏗️ Tech Stack

### Frontend

* **React (Vite)**
* **React Router**
* **Context API** (Global State)
* **Auth API** (Protected State)
* **CSS / Modern UI Styling**
* **Font Awesome**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **bcrypt** (Password hashing)

---

## 📁 Project Structure

```
QueryFlow/
│
├── frontend/
│   ├── node_module/
│   ├── public/
│   ├── src/
│   │   ├── animation/
│   │   ├── landingpage/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── main.jsx
│   │   └── Protected.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## 🧠 Database Models

### User

* username
* email
* password (hashed)
* token

### Thread

* threadId
* title
* messages[]
* createdAt
* updatedAt
* author (ref: User)

### Message

* role (`user | assistant`)
* content
* timestamp
* author

---

## 🔑 Authentication Flow

1. User signs up
2. User logs in token - assigned
3. Token stored on client (localStorage)
4. Protected routes validate token
5. Unauthorized users are redirected to Login

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=8080
MODEL_API=sk-or-v1-openrouterAPIKEY
MONGO_Uri=your_mongodb_connection_string
TOKEN_KEY=random_string
SESSION_SECRET=your_session_secret
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/queryflow-ai.git
cd queryflow-ai
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (Sample)

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |
| POST   | /v1/chat        | Send message  |
| GET    | /api/thread/:id  | Get thread    |
| GET    | /api/thread/ | Get all thread    |

---

## 🔐 Protected Routes

* Frontend routes are protected using a **Protected** component
* Backend routes are secured using **auth middleware**

---

## 🎯 Future Enhancements

* 🔄 Streaming AI responses
* 📜 Chat history search
* 🌙 Dark / Light mode
* 🧠 Multiple AI models support

---

## 👨‍💻 Author

**Satyam Kushwaha**

---

⭐ If you like this project, don’t forget to star the repository!
