
# Authentication System (JWT + Refresh Token + Google OAuth) – Node.js / Express / MongoDB

A complete authentication system built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **Google OAuth**.
Includes user registration, login, secure route access, role-based authorization, refresh token rotation, logout, and social login using Google.

---

##  **Features**

###  **User Authentication**

* User Signup
* User Login
* Encrypted password using bcrypt
* Login returns **Access Token** + **Refresh Token**

###  **JWT Token System**

* Access Token (short-lived)
* Refresh Token (rotated & stored in cookies)
* Generate new Access Token using Refresh Token
* Secure logout

###  **Protected Routes**

* Middleware to verify JWT
* Fetch logged-in user profile
* Dashboard route accessible only by **admin**

###  **Google OAuth 2.0 Login**

* Sign in using Google account
* Auto-create user if first login
* Returns JWT tokens
* Redirects to frontend with token

###  **Role-Based Authorization**

* Admin-only endpoints using middleware


## **Tech Stack**

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **Passport.js + Google OAuth2**
* **Cookie Parser**
* **CORS**

---

##  **Environment Variables**

Create a `.env` file:

```
PORT=
MONGO_URI=

JWT_SECRET=
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FRONTEND_URL=http://localhost:5000
```

---

##  **How to Run Locally**

### **1. Install dependencies**

```bash
npm install
```

### **2. Set environment variables**

Create `.env` with required variables.

### **3. Start the server**

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

##  **API Routes**

### **Auth Routes**

| Method | Route                 | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/auth/signup`    | Register user                    |
| POST   | `/api/auth/login`     | Login user & get tokens          |
| GET    | `/api/auth/refresh`   | Get new access token             |
| POST   | `/api/auth/logout`    | Logout user                      |
| GET    | `/api/auth/profile`   | Get logged-in user (protected)   |
| GET    | `/api/auth/dashboard` | Admin-only dashboard (protected) |

---

##  **Google OAuth Routes**

| Method | Route                       | Description           |
| ------ | --------------------------- | --------------------- |
| GET    | `/api/auth/google`          | Redirect to Google    |
| GET    | `/api/auth/google/callback` | Google redirects back |

After login, user is redirected to:

```
FRONTEND_URL/dashboard?token=ACCESS_TOKEN
```

---

##  **How OAuth Works (Short)**

1. User clicks **Login with Google**
2. Passport sends user to Google
3. Google sends user back to your backend
4. Backend verifies Google account
5. If new, creates user in DB
6. Generates JWT tokens
7. Redirects user to frontend with token

---

##  **Middlewares**

###  `protect`
* Checks JWT access token
* Attaches user to `req.user`

###  `authorize('admin')`

* Allows only admin users

---

##  **Future Improvements**

* Password reset (email OTP)
* Email verification
* Multi-role system
* Account deletion
* Logging & rate limiting

---

## 📄**License**

MIT License


