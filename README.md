# 🎓 HashField — Where Skills Grow

> A full-stack **Learning Management System (LMS)** built with **Next.js 16 + Tailwind v4** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 📁 Project Structure

```
LMS_DEVWEEKENDS/
├── client/          # Next.js 16 Frontend (React 19 + Tailwind v4)
└── server/          # Node.js + Express Backend (TypeScript + MongoDB)
```

---

## 🖥️ Client (Frontend)

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · `next-themes`

### Features
- 🌙 **Dark / Light Mode** via `next-themes` with class-based strategy
- 🔤 **Custom Fonts** — Poppins & Josefin Sans via `next/font/google`
- 🎨 **Tailwind v4** with `@custom-variant dark` for theme switching

### Setup

```bash
cd client
npm install
npm run dev
```

App runs at → `http://localhost:3000`

---

## ⚙️ Server (Backend)

**Stack:** Node.js · Express 5 · TypeScript · MongoDB (Mongoose) · Redis (ioredis) · Cloudinary · JWT · Nodemailer

---

### 🚀 Getting Started

```bash
cd server
npm install
npm run dev
```

Server runs at → `http://localhost:8000`

Test endpoint: `GET /test` → `{ success: true, message: "Api is working" }`

---

### 🔑 Environment Variables

Create a `.env` file in `/server`:

```env
# Server
PORT=8000
NODE_ENV=development
ORIGIN=http://localhost:3000

# MongoDB
DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/lms

# Redis (Upstash or local)
REDIS_URL=redis://localhost:6379

# JWT
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=300        # in hours
REFRESH_TOKEN_EXPIRE=1200      # in days

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_SECRET_KEY=your_secret_key

# Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
SMTP_MAIL=your@gmail.com
```

---

### 📡 API Reference

All routes are prefixed with `/api/v1`

---

#### 👤 User Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/register` | ❌ | — | Register new user (sends activation email) |
| `POST` | `/activate` | ❌ | — | Activate account with OTP token |
| `POST` | `/login` | ❌ | — | Login user, returns JWT cookies |
| `POST` | `/logout` | ✅ | user | Logout & clear cookies |
| `GET` | `/refresh` | ❌ | — | Refresh access token via refresh token cookie |
| `GET` | `/me` | ✅ | user | Get current logged-in user info |
| `POST` | `/socialAuth` | ❌ | — | Social login (Google / GitHub) |
| `PUT` | `/update-user-info` | ✅ | user | Update name / email |
| `PUT` | `/update-user-avatar` | ✅ | user | Upload / update profile picture (Cloudinary) |
| `PUT` | `/update-password` | ✅ | user | Change password |
| `GET` | `/get-all-users` | ✅ | admin | Get list of all users |
| `PUT` | `/update-role` | ✅ | admin | Change a user's role |
| `DELETE` | `/delete-user/:id` | ✅ | admin | Delete a user by ID |

---

#### 📚 Course Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/create-course` | ✅ | admin | Create a new course (with Cloudinary thumbnail) |
| `PUT` | `/edit-course/:id` | ✅ | admin | Edit an existing course |
| `GET` | `/get-all-courses` | ❌ | — | Get all courses (public preview, no video content) |
| `GET` | `/get-course/:id` | ❌ | — | Get single course details (no content) |
| `GET` | `/get-course-content/:id` | ✅ | user | Get full course content (must be enrolled) |
| `POST` | `/add-question` | ✅ | user | Ask a question on a course section |
| `POST` | `/add-question-answer` | ✅ | user | Reply to a question (sends email notification) |
| `POST` | `/add-review/:courseId` | ✅ | user | Add a review & rating to a course |
| `POST` | `/add-reply-to-review` | ✅ | admin | Admin reply to a course review |
| `GET` | `/get-all-courses-for-admin` | ✅ | admin | Get all courses with full data (admin panel) |
| `DELETE` | `/delete-course/:id` | ✅ | admin | Delete a course + Cloudinary thumbnail |

---

#### 🛒 Order Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/create-order` | ✅ | user | Purchase a course (adds to user enrolled list) |
| `GET` | `/get-orders` | ✅ | admin | Get all orders |

---

#### 🔔 Notification Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/get-all-notifications` | ✅ | admin | Get all notifications |
| `PUT` | `/update-notification-status/:id` | ✅ | admin | Mark notification as read |

> Unread notifications older than 30 days are auto-deleted via a `node-cron` job.

---

#### 📊 Analytics Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/get-users-analytics` | ✅ | admin | Users growth data (last 12 months) |
| `GET` | `/get-orders-analytics` | ✅ | admin | Orders growth data (last 12 months) |
| `GET` | `/get-courses-analytics` | ✅ | admin | Courses growth data (last 12 months) |

---

#### 🎨 Layout Routes — `/api/v1`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/create-layout` | ✅ | admin | Create layout (Banner / FAQ / Categories) |
| `PUT` | `/edit-layout` | ✅ | admin | Edit existing layout |
| `GET` | `/get-layout` | ❌ | — | Get layout by type |

---

### 🗃️ Database Models

#### 👤 User

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Unique, validated |
| `password` | String | Bcrypt hashed, min 6 chars, hidden by default |
| `avatar` | Object | `{ public_id, url }` from Cloudinary |
| `role` | String | `"user"` (default) or `"admin"` |
| `isVerified` | Boolean | Email verification status |
| `courses` | Array | Enrolled course ObjectIds |

#### 📚 Course

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `description` | String | Required |
| `price` | Number | Required, min 0 |
| `estimatedPrice` | Number | Original price (discount display) |
| `thumbnail` | Object | `{ public_id, url }` Cloudinary |
| `tags` | String[] | — |
| `level` | String | Beginner / Intermediate / Advanced |
| `demoUrl` | String | Preview video URL |
| `benefits` | Object[] | Array of `{ title }` |
| `prerequisites` | Object[] | Array of `{ title }` |
| `courseData` | Array | Sections with videos, links, questions |
| `reviews` | Array | User reviews with ratings (1–5) |
| `ratings` | Number | Average rating |
| `purchased` | Number | Purchase count |

#### 🛒 Order

| Field | Type | Notes |
|-------|------|-------|
| `courseId` | ObjectId | ref → Course |
| `userId` | ObjectId | ref → User |
| `payment_info` | Object | Payment gateway response |

---

### 🔐 Authentication Flow

```
Register → Email OTP → Activate → Login
                                     ↓
                          Access Token (15min) + Refresh Token (7d)
                          Stored in HTTP-only cookies
                                     ↓
                          User cached in Redis for fast auth lookup
```

- Auth middleware reads user from **Redis**, not MongoDB (fast!)
- Social auth (Google/GitHub) supported via `/socialAuth`
- Token refresh endpoint: `GET /api/v1/refresh`

---

### 📧 Email Templates (EJS)

| Template | When Sent |
|----------|-----------|
| `activation-mail.ejs` | User registration — OTP activation code |
| `order-confirmation.ejs` | Successful course purchase |
| `question-reply-email.ejs` | Someone replies to your Q&A question |

---

### 🏗️ Server Architecture

```
server/
├── app.ts                    # Express setup, middleware, all routes
├── server.ts                 # Entry point — DB, Cloudinary, listen
├── controllers/              # Business logic
│   ├── user.controller.ts
│   ├── course.controller.ts
│   ├── order.controller.ts
│   ├── notification.controller.ts
│   ├── analytics.controller.ts
│   └── layout.controller.ts
├── models/                   # Mongoose schemas & interfaces
│   ├── user.model.ts
│   ├── course.model.ts
│   ├── order.model.ts
│   ├── notification.model.ts
│   └── layout.model.ts
├── routes/                   # Express routers
├── middleware/
│   ├── auth.middleware.ts    # isAuthenticated + authorizeRoles
│   ├── catchAsyncErrors.ts   # Async error wrapper utility
│   └── error.ts              # Global error handler middleware
├── services/                 # Reusable DB layer
│   ├── user.service.ts
│   ├── course.service.ts
│   └── order.service.ts
├── utils/
│   ├── db.ts                 # MongoDB connection
│   ├── redis.ts              # ioredis client
│   ├── jwt.ts                # Token generation + cookie helper
│   ├── sendMail.ts           # Nodemailer + EJS email sender
│   ├── analytics.ts          # Last 12 months data aggregator
│   └── ErrorHandler.ts       # Custom AppError class
├── mails/                    # EJS email templates
└── @types/
    └── custom.d.ts           # Express Request augmentation (req.user)
```

---

### 🛠️ Full Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + TypeScript 7 |
| Framework | Express 5 |
| Database | MongoDB + Mongoose 9 |
| Cache / Session | Redis (ioredis 6) |
| Auth | JWT — access + refresh tokens |
| File Storage | Cloudinary v2 |
| Email | Nodemailer + EJS templates |
| Scheduler | node-cron |
| Dev Server | tsx watch |
| Frontend | Next.js 16 + React 19 + Tailwind v4 |

---

## 📜 License

MIT © HashField — DevWeekends
