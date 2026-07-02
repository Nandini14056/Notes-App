# 📝 Notes App

A full-stack **MERN Notes Application** that allows users to securely create, view, update, and delete their personal notes. The application uses **JWT Authentication** to ensure that each user can only access their own notes.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using Bcrypt

### 📝 Notes Management
- Create Notes
- View All Notes
- View Single Note
- Edit Notes
- Delete Notes
- Search Notes

### 🎨 Frontend
- Responsive UI
- React Router
- Toast Notifications
- Loading States
- Protected Pages
- Clean & Modern Design

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt

---

## 📁 Project Structure

```
Notes-App
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Notes-App.git
```

```bash
cd Notes-App
```

---

## Backend Setup

Navigate to the server folder

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_secret_key
```

Start the backend

```bash
npm start
```

---

## Frontend Setup

Navigate to the client folder

```bash
cd client
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/user/register` | Register User |
| POST | `/api/user/login` | Login User |

### Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notes` | Get All Notes |
| GET | `/api/notes/:id` | Get Single Note |
| POST | `/api/notes` | Create Note |
| PUT | `/api/notes/:id` | Update Note |
| DELETE | `/api/notes/:id` | Delete Note |

---

## 🔒 Security

- JWT Authentication
- Password Hashing with Bcrypt
- Protected API Routes
- User-specific Notes
- Environment Variables for Sensitive Data

---

## 🌟 Future Improvements

- Dark Mode
- Pin Important Notes
- Categories & Tags
- Rich Text Editor
- File Attachments
- Markdown Support
- Pagination
- Note Colors
- Archive Notes
- Favorite Notes

---

## 👩‍💻 Author

**Nandini Raulji**

---
