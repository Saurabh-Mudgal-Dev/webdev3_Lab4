# Lab 4: Secure Connect and Communication Platform

**Course:** Web Dev III — Unit 4
**Name:** Saurabh
**Roll No.:** 2501010045

---

## Overview

A secure Node.js backend built from scratch featuring JWT authentication, role-based access control, a protected Notes API, real-time chat via Socket.IO, and event-driven logging using Node.js EventEmitter.

---

## Tech Stack

| Package | Purpose |
|---|---|
| Express | HTTP server and routing |
| Mongoose | MongoDB ODM |
| bcrypt | Password hashing |
| jsonwebtoken | JWT auth tokens |
| dotenv | Environment variable management |
| Socket.IO | Real-time bidirectional chat |

---

## Project Structure

```
webdev3_lab4/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Signup, login logic
│   ├── noteController.js  # Notes CRUD logic
│   └── protectedController.js
├── events/
│   └── emitter.js         # Node.js EventEmitter
├── middleware/
│   ├── auth.js            # JWT verification
│   └── role.js            # Role-based access control
├── models/
│   ├── User.js            # User schema
│   └── Note.js            # Note schema
├── routes/
│   ├── auth.js            # /api/auth
│   ├── notes.js           # /api/notes
│   └── protected.js       # /api/protected, /api/admin
├── socket/
│   └── chat.js            # Socket.IO chat handler
├── .env.example
├── server.js
└── package.json
```

---

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1d
   ```

3. Start the server:
   ```bash
   npm start
   ```

---

## API Reference

### Auth

| Method | Endpoint | Body | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | `{ name, email, password, role? }` | No |
| POST | `/api/auth/login` | `{ email, password }` | No |

### Protected Routes

| Method | Endpoint | Auth | Role |
|---|---|---|---|
| GET | `/api/protected` | JWT | Any |
| GET | `/api/admin` | JWT | admin |

### Notes

| Method | Endpoint | Body | Auth |
|---|---|---|---|
| POST | `/api/notes` | `{ title, content }` | JWT |
| GET | `/api/notes` | — | JWT |
| PUT | `/api/notes/:id` | `{ title?, content? }` | JWT |
| DELETE | `/api/notes/:id` | — | JWT |

> All `/api/notes` routes return only the authenticated user's own notes.

---

## Real-Time Chat (Socket.IO)

Connect a Socket.IO client to `http://localhost:3000`.

```js
// Client-side example
const socket = io('http://localhost:3000');

socket.emit('chat message', 'Hello!');

socket.on('chat message', (data) => {
  console.log(data.from, ':', data.msg);
});
```

**Events:**

| Event | Direction | Payload |
|---|---|---|
| `chat message` | client → server | `string` |
| `chat message` | server → all clients | `{ from, msg }` |

---

## Event-Driven Features

The app uses Node.js `EventEmitter` (`events/emitter.js`) to log internal actions:

| Event | Triggered by | Console output |
|---|---|---|
| `userLoggedIn` | Successful login | `[event] userLoggedIn: <userId>` |
| `noteCreated` | Note creation | `[event] noteCreated: "<title>"` |

---

## Sample Console Output

```
Server running on port 3000
MongoDB connected
[event] userLoggedIn: 6b091e0c979735fccb786435
[event] noteCreated: "My first note"
[socket] connected: -xsL5gPjlgx1UxqHAAAA
[socket] message from -xsL5gPjlgx1UxqHAAAA: Hello!
[socket] disconnected: -xsL5gPjlgx1UxqHAAAA
```
