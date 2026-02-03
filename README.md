# Task Management Dashboard

A **full-stack task management application** that allows users to securely manage daily tasks with smart categorization, completion tracking, and a clean productivity-focused UI.
This project demonstrates an **end-to-end frontend + backend workflow** using **React, Node.js, Express, and MongoDB**.

---

## 📌 Project Objective

The objective of this project is to demonstrate:

- Secure authentication and protected routes
- Clean and responsive dashboard UI
- CRUD operations with real-time updates
- Proper frontend–backend API integration
- Practical task organization (Today, Tomorrow, Upcoming, Completed)
- Good UX practices for productivity tools

The focus is on **clarity, correctness, and real-world usability**, not over-engineering.

---

## 🚀 Features

### 🔐 Authentication
- User Signup and Login
- JWT-based authentication
- Protected dashboard routes

### 📝 Task Management
- Create tasks with title and due date
- Emoji-based importance indicator (🔥 ⭐ ❗ 📝 etc.)
- Mark tasks as completed
- Delete tasks
- Tasks are user-specific

### 📅 Smart Task Views
- **Today** – tasks due today (default view)
- **Tomorrow** – tasks due tomorrow
- **Upcoming** – future tasks
- **Completed** – finished tasks

### 🎯 UX & Productivity Enhancements
- Clean and consistent UI across Login, Signup, and Dashboard
- Sidebar navigation for switching views
- Keyboard shortcuts:
  - `N` → focus on Add Task input
  - `Esc` → close sidebar
- Empty-state messages
- Confirmation before deleting tasks

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)

---

## 📁 Project Structure

```

frontend-intern-assignment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── screenshots/
│
├──.gitignore
└── README.md

````

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ritisha0701/frontend-intern-assignment.git
cd frontend-intern-assignment
````

---

## 🧩 Backend Setup (Node.js + Express)

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> ⚠️ `.env` is intentionally excluded from GitHub for security.

Backend runs at:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📤 How to Use the Application

1. Sign up with a new account
2. Log in using your credentials
3. Add tasks with due dates and emojis
4. View tasks under Today, Tomorrow, or Upcoming
5. Mark tasks as completed when done
6. Delete tasks if no longer needed

---

## 📸 Screenshots

Screenshots of the application UI are available in the `screenshots/` folder and include:

* Login Page
* Signup Page
* Dashboard (Today view)
* Tasks Tomorrow
* Completed Task
* Sidebar Navigation

---

## 🔐 Security & Best Practices

* JWT authentication for protected routes
* `.env` file removed and not committed
* User-specific task access
* `node_modules` and secrets excluded via `.gitignore`
* Clean API error handling

---

## 🧪 Evaluation Criteria Covered

* UI quality and responsiveness
* Frontend–backend integration
* Authentication and route protection
* CRUD functionality
* Code organization and readability
* Clear documentation

---

## 🚫 Notes

* This project is designed for **local execution**
* MongoDB can be local or cloud-based (MongoDB Atlas)
* Deployment is optional and not required

---

## 🎯 Interview-Ready Summary

> “This project is a full-stack task management dashboard built with React and Node.js that focuses on clean UI, secure authentication, and real-world productivity workflows.”

---

## 👤 Author

**Ritisha Chaurasia**

GitHub: https://github.com/ritisha0701/

---

## ✅ FINAL CONFIRMATION

