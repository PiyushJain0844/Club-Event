# 🚀 CampusConnect — College Club Event Management Platform

> **Tagline:** *"Connect. Create. Celebrate."*

**CampusConnect** is a modern, production-ready, full-stack web application designed for college recruitment, hackathon submissions, and campus event organization. It enables students to discover exciting campus activities and register with real-time capacity tracking while empowering college club administrators with a rich dashboard to manage events and student registrations.

---

## 🌟 Major Features

### 🎓 Student / User Experience
- **Home Page Hero & Spotlight**: Dynamic banner spotlight for featured events, club overview cards, live registration statistics, and modern navigation.
- **Dynamic Event Discovery**: Filter events by category (*Technical, Cultural, Sports, Workshop, Competition, Entrepreneurship, Social*), search dynamically by title or venue, and filter by upcoming or past dates.
- **Detailed Event Pages**: View event schedules, venue locations, organizer details, seat allocation meter, and live registration status.
- **Student Registration**: Streamlined form with client-side and backend validation (email format, 10-digit Indian phone number formatting).
- **Duplicate Registration Prevention**: Automatically blocks duplicate sign-ups using a compound check (`eventId` + `email`).
- **Capacity Control**: Live seat availability meter; automatically disables registration when capacity is reached.
- **About & Contact Pages**: Complete club information, contact details, and interactive feedback forms.

### 🛡️ Admin Management Console
- **Secure JWT Authentication**: Protected admin routes using JSON Web Tokens (JWT).
- **Dashboard Overview**: Metrics overview featuring Total Events, Upcoming Events, Total Registrations, and Featured Events.
- **Full Event CRUD**:
  - **Create Event**: Add new campus events with custom categories, dates, venues, banner images, organizers, capacity, and featured flags.
  - **Read/List Events**: Grid/Table view with quick status indicators and previews.
  - **Update Event**: Prefilled form for updating event details.
  - **Delete Event**: Safe modal confirmation before deleting an event and cascading deletion of associated registrations.
- **Registration Management**: Search student registrations by student name, email, college, or event title; filter by event; remove registrations.

---

## 🛠️ Technology Stack

| Domain | Technology |
|---|---|
| **Frontend** | React.js (v18), Vite, React Router DOM (v6), CSS3 (Flexbox/Grid), Axios, Lucide React |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ORM, JSONWebToken (JWT), CORS, dotenv |
| **Database** | MongoDB (Supports local instance, MongoDB Atlas URI, or built-in automatic fallback) |

---

## 📁 Project Structure

```text
c:\Users\HP\OneDrive\Desktop\Event Management/
│
├── client/                     # Frontend React Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin Sidebar, StatCard, EventForm
│   │   │   ├── common/         # Navbar, Footer, Badge, Modal, SkeletonLoader
│   │   │   └── events/         # EventCard
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/
│   │   │   ├── admin/          # Admin Login, Dashboard, Events, Add/Edit Event, Registrations
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── EventDetailsPage.jsx
│   │   │   ├── EventRegistrationPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/           # Axios instance with auth interceptor
│   │   ├── App.jsx             # React Router configuration
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global CSS design system
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── server/                     # Backend Node.js Express REST API
│   ├── config/
│   │   └── db.js               # Database connector (with auto in-memory fallback)
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication protection
│   ├── models/
│   │   ├── Event.js            # Mongoose Event schema
│   │   └── Registration.js     # Mongoose Registration schema
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── seed.js                 # Realistic seed data populator
│   ├── server.js               # Main Express app initialization
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** (v16+ installed)
- **npm** (v8+ installed)

---

### 2. Backend Setup & Run

1. Open terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure `.env` exists (created automatically):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/campusconnect
   JWT_SECRET=campusconnect_super_secret_jwt_key_2026
   ADMIN_EMAIL=admin@campusconnect.com
   ADMIN_PASSWORD=admin123
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development mode:
   npm run dev
   ```
   *Note: If local MongoDB is not running, the server automatically boots an in-memory MongoDB instance and seeds realistic sample events so everything works seamlessly out of the box!*

---

### 3. Frontend Setup & Run

1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` (or the URL provided by Vite).

---

## 🔐 Demo Admin Login Credentials

To access the Admin Panel (`/admin/login` or click **Admin** in the header):

- **Email**: `admin@campusconnect.com`
- **Password**: `admin123`

*(You can also click the "Auto-fill Demo Admin Credentials" button on the login screen for 1-click access!)*

---

## 📡 REST API Documentation Endpoints

### 📅 Event Endpoints
- `GET /api/events` — Get all events (supports `?search=`, `?category=`, `?dateFilter=`, `?featured=`)
- `GET /api/events/:id` — Get single event by ID with registration count
- `POST /api/events` — Create new event *(Protected Admin)*
- `PUT /api/events/:id` — Update event details *(Protected Admin)*
- `DELETE /api/events/:id` — Delete event and associated registrations *(Protected Admin)*

### 📝 Registration Endpoints
- `POST /api/registrations` — Register student for an event (prevents duplicate email registration & enforces capacity)
- `GET /api/registrations` — Get all registrations *(Protected Admin, supports `?search=`, `?eventId=`)*
- `GET /api/registrations/event/:eventId` — Get registrations for a specific event
- `DELETE /api/registrations/:id` — Delete registration record *(Protected Admin)*

### 🔑 Admin Endpoints
- `POST /api/admin/login` — Admin authentication & JWT token issuance
- `GET /api/admin/stats` — Dashboard overview analytics & recent registrations *(Protected Admin)*

---

## 🔮 Future Improvements
- QR Code generation for registered student tickets.
- Automated email notification on registration using Nodemailer.
- CSV export for admin registration tables.

---

## 📄 License
This project is open-source and available for educational, college club, and hackathon use.
