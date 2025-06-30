# 🗳️ VoteRight - Fullstack Voting App

VoteRight is a collaborative fullstack web application for creating and participating in polls. Users can sign up, log in, vote on polls, and view results in real-time.

This project is built with:

- 🔥 **Backend**: Flask (Python), PostgreSQL, Alembic
- ⚛️ **Frontend**: React.js
- 🔐 **Auth**: JWT (Flask-JWT-Extended)
- 🌐 **CORS**: Flask-CORS
- 📦 **ORM**: SQLAlchemy
- 📄 **Serialization**: Marshmallow

---

## 📁 Project Structure

voteright/
├── backend/
│ ├── app/
│ │ ├── init.py # App factory
│ │ ├── models.py # SQLAlchemy models
│ │ ├── routes/ # Blueprint routes (auth, polls, votes)
│ │ ├── schemas.py # Marshmallow schemas
│ ├── migrations/ # Alembic migration files
│ ├── main.py # Entry point
│ └── config.py # Environment-based config
│
├── frontend/
│ ├── src/
│ │ ├── components/ # React UI components
│ │ ├── pages/ # Login, Dashboard, Polls, etc.
│ │ ├── App.js
│ │ └── api/ # Axios client setup
│
├── requirements.txt # Backend dependencies
├── README.md # This file
└── .env # Environment variables




---

## 🚀 Features

- ✅ JWT Authentication (Register / Login / Logout)
- ✅ Create, vote, and manage polls
- ✅ View poll choices and total vote count
- ✅ Role-based access (admin vs regular users)
- ✅ RESTful API with token protection
- ✅ PostgreSQL + Alembic migrations
- ✅ Responsive React frontend

---

## 🛠️ Backend Setup (Flask)

### 1. Clone the repo

```bash
git clone https://github.com/theMungai/voteright.git
cd voteright/backend

