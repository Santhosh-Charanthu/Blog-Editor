# 📝 BlogNest – Full-Stack Blog Editor Platform

**BlogNest** is a responsive, full-stack blogging platform built with the MERN stack. It allows users to create, auto-save, and manage blog drafts and published posts efficiently. The platform is split into two independently deployed components: a React.js frontend and a Node.js/Express backend connected to MongoDB Atlas.

---

## 🚀 Features

### ✍️ Blog Editor
- Clean, distraction-free writing interface
- **Auto-save draft** triggered on **5 seconds of user inactivity**
- Edit/update previously saved blogs without manual save
- Debounced API calls to prevent redundant server hits

### 🔐 Authentication
- User registration & login with session-based auth
- Secure password hashing
- Protected routes and role-based access

### 📋 Blog Management
- Create, save, and publish blogs
- View your published and drafted posts
- Structured blog listing with timestamps

### 💾 Backend Services
- REST API built with Express.js
- MongoDB Atlas integration
- Tested with Hoppscotch and Chrome DevTools

---

## 🛠 Tech Stack

| Layer         | Tech Used                            |
|---------------|---------------------------------------|
| **Frontend**  | React.js, CSS3, Bootstrap             |
| **Backend**   | Node.js, Express.js                   |
| **Database**  | MongoDB Atlas + Mongoose              |
| **Auth**      | Passport.js, express-session          |
| **Deployment**| Render (frontend & backend separately)|

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Santhosh-Charanthu/Blog-Editor
cd BlogNest

```

### 2. Install Backend Dependencies

cd server
npm install

### 3. Set Up Backend .env
Create a file named .env in the server/ directory with:
MONGO_URI=your_mongodb_uri

SESSION_SECRET=your_secret

### 4. cd ..
npm install

###5. Set Up Frontend .env
Create a .env file in the src/ directory:
REACT_APP_API_URL=https://draftnest.onrender.com

### 5. 6. Run Locally
Start backend:
cd server
node app.js

Start frontend
cd ..
npm run dev

## 🌐 Live Demo- **Demo Link**: [Demo](https://blognest-kmn1.onrender.com/blog-editor)---

## 🧠 Future Enhancements

- 🖼️ Blog image upload support  
- 📄 Markdown or rich-text editor  
- 💬 Comments section under each blog  
- 📊 Dashboard analytics for blog stats  
- 🔔 Email notifications

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!  
Please open an issue or submit a pull request to collaborate.

---

## 👨‍💻 Author

**Santhosh Charanthu**  
Full-Stack Developer | MERN Specialist  
📬 [Connect on LinkedIn](https://www.linkedin.com/in/santhosh-charanthu-bb6102300/)


