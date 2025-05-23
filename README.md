# 📝 BlogNest - Full Stack Blogging Platform

BlogNest is a full-featured MERN stack blogging platform that allows users to write, auto-save drafts, publish blogs, and manage their posts. It includes user authentication with session-based login and a sleek, user-friendly interface.

## 🌐 Live Demo

- **Demo Link**: [https://blognest-kmn1.onrender.com/blog-editor](https://blognest-kmn1.onrender.com/blog-editor)

---

## 🚀 Features

- 🧠 **Auto-save Drafts** – Blogs are saved every few seconds while typing
- ✍️ **Rich Blog Editor** – Create and update blog posts with title, content, and tags
- ✅ **Session-based Authentication** – Secure login using `passport.js` and `express-session`
- 🔐 **Protected Routes** – Only authenticated users can create, edit, or update blogs
- 📂 **Your Blogs Page** – View, edit, and manage your published and draft blogs
- 📱 **Responsive Design** – Mobile and desktop-friendly layout
- 📦 **REST API** – Cleanly structured REST endpoints for blog operations

---

## 🛠️ Tech Stack

### Frontend

- **React.js** – Component-based frontend framework
- **React Router** – Navigation and routing
- **Axios** – HTTP requests with `withCredentials` for cookies
- **CSS** – Custom styles for layout and toast notifications

### Backend

- **Node.js + Express.js** – RESTful API and server logic
- **MongoDB + Mongoose** – NoSQL database and object modeling
- **Passport.js** – Authentication middleware
- **Express-session** – Handles user sessions via cookies
- **MongoStore** – Stores sessions in MongoDB
- **CORS** – Secure cross-origin resource sharing

---

## 🔐 Authentication Flow

- Users log in using a email and password
- Upon success, a session cookie (`connect.sid`) is set via `express-session`
- All subsequent requests include this cookie (`withCredentials: true`)
- Protected routes check for authenticated sessions before allowing access

---
