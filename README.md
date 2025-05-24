# 🎯 InterviewDB - Interview Question Bank Platform



> A comprehensive platform for students to share, discover, and manage company-specific interview questions with an interactive voting system.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)

## ✨ Features

### 🔐 **Authentication**
- **Google OAuth** integration via Firebase Authentication
- Secure user sessions and protected routes
- User profile management

### 📝 **Question Management**
- Submit interview questions with company, role, and category details
- **Categories**: DSA (Data Structures & Algorithms), HR (Human Resources), MCQ (Multiple Choice Questions)
- Tag-based organization for better searchability
- User attribution with optional personal details

### 🔍 **Advanced Search & Filtering**
- **Real-time search** across question content
- **Filter by company** - dedicated company pages
- **Filter by tags** and categories
- **Sort by date** (newest first) or **popularity** (most voted)

### 👍 **Interactive Voting System**
- Upvote/downvote questions based on relevance
- Real-time vote counting
- User authentication required for voting



## 🛠️ Tech Stack

### **Frontend**
- **React.js** - Component-based UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Firebase Auth** - Authentication service

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Authentication**: Firebase

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project for authentication

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/InterviewDB.git
cd InterviewDB
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Start Development Servers

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://interviewdb-backend.onrender.com`

### Endpoints

#### **Health Check**
```http
GET /
GET /health
```

#### **Questions**
```http
GET    /api/questions              # Get all questions with optional filters
POST   /api/questions              # Create a new question
POST   /api/questions/:id/upvote   # Upvote a question
POST   /api/questions/:id/downvote # Downvote a question
```

#### **Query Parameters for GET /api/questions**
- `company` - Filter by company name
- `search` - Search in question content
- `sort` - Sort by 'date' or 'votes'
- `tag` - Filter by tag

#### **Example API Calls**
```javascript
// Get all questions
GET /api/questions

// Get questions from specific company
GET /api/questions?company=Google

// Search questions
GET /api/questions?search=binary%20tree

// Get most voted questions
GET /api/questions?sort=votes

// Filter by tag
GET /api/questions?tag=algorithms
```

