# 🚀 TaskPlanet Social Feed Clone (MERN Stack)

A mini social post application inspired by the **TaskPlanet Social Page UI**, built as part of the **Full Stack Internship Assignment**.

This project demonstrates a complete **MERN stack implementation** with:

✅ JWT Authentication
✅ Social Feed (Posts + Likes + Comments)
✅ Image Upload with Cloudinary
✅ TaskPlanet-inspired UI (No Tailwind)
✅ Deployment Ready (Vercel + Render + MongoDB Atlas)

<!-- ---

# 📌 Live Demo

* **Frontend (Vercel):** *(Add Link Here)*
* **Backend (Render):** *(Add Link Here)* -->

---

# 📷 UI Preview

TaskPlanet-inspired clean UI:

* Social Feed
* Create Post Card
* Like / Comment / Share Footer
* Floating + Button
* Bottom Navigation Bar
* Profile Dropdown Logout

---

# 🛠 Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React + React Bootstrap + CSS |
| Backend        | Node.js + Express.js          |
| Database       | MongoDB Atlas                 |
| Authentication | JWT (JSON Web Token)          |
| Media Upload   | Cloudinary + Multer           |
| Deployment     | Vercel (FE), Render (BE)      |

---

# 📂 Folder Structure

```
TaskPlanet-Social/

├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── server.js
│   └── package.json

├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── FloatingButton.jsx
│   │   │   ├── CreatePostBox.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── CommentBox.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Feed.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json

└── README.md
```

---

# ⚙️ Features

## ✅ Authentication

* User Signup & Login
* JWT token generation
* Protected routes
* Logout from profile dropdown

## ✅ Social Feed

* Create text posts
* Upload image posts
* Like/unlike posts
* Add comments
* Instant UI updates

## ✅ Media Upload

* Image upload handled via **Cloudinary**
* Multer middleware for multipart/form-data

---

# 🧾 Database Schema (Only 2 Collections)

## 1. Users Collection

```js
{
  username: String,
  email: String,
  password: String (hashed)
}
```

## 2. Posts Collection

```js
{
  user: {
    username: String,
    userId: ObjectId
  },
  text: String,
  imageUrl: String,
  likes: [String],
  comments: [
    {
      username: String,
      text: String
    }
  ],
  createdAt: Date
}
```

---

# 🔥 API Endpoints

## Auth Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | Login user        |

---

## Post Routes

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| GET    | `/api/posts`             | Get all posts               |
| POST   | `/api/posts`             | Create new post (Protected) |
| PUT    | `/api/posts/:id/like`    | Like/unlike post            |
| POST   | `/api/posts/:id/comment` | Add comment                 |

---

# 🧑‍💻 Setup Instructions (Local)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/taskplanet-social.git
cd taskplanet-social
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret
```

### Start Backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# ☁️ Cloudinary Setup

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Create account → Dashboard
3. Copy:

   * Cloud Name
   * API Key
   * API Secret
4. Paste into backend `.env`

---

# 🔐 JWT Secret Key Generation

Run this command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy output and paste into:

```env
JWT_SECRET=generated_key_here
```

---

# 🚀 Deployment Guide

## Frontend → Vercel

1. Push frontend to GitHub
2. Import repo into Vercel
3. Set build command:

   ```
   npm run build
   ```
4. Add env:

   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

---

## Backend → Render

1. Push backend to GitHub
2. Create Web Service
3. Add env variables from `.env`
4. Start command:

   ```
   node server.js
   ```

---

## Database → MongoDB Atlas

1. Create cluster
2. Whitelist IP: `0.0.0.0/0`
3. Copy connection URI into backend `.env`

---

# ✅ Bonus Improvements (Future Scope)

* Real-time updates using Socket.IO
* Post sharing functionality
* User profiles
* Follow/unfollow system
* Better search/filter logic

---

# 👨‍💻 Author

**Yogesh Patel**
MERN Stack Developer (Internship Candidate)

* LinkedIn: [*linkedin.com/in/yogeshpatel01*](https://www.linkedin.com/in/yogeshpatel01/)
* GitHub: [*github.com/yogeshPatel9388*](https://github.com/yogeshPatel9388)

---

# 📌 Submission Note

This project is developed as part of the **Full Stack Internship Assignment**, following all constraints:

✅ MERN only
✅ JWT Auth
✅ Cloudinary Upload
✅ Only Users + Posts collections
✅ No Tailwind

---

⭐ If you like this project, feel free to star the repo!
