# 🌍 WanderLust – Full Stack Travel & Stay Booking Platform

WanderLust is a modern full-stack web application inspired by Airbnb that allows users to discover, search, create, edit, and manage travel stay listings with a beautiful responsive UI.

The project focuses on providing a smooth booking-style experience with authentication, image uploads, map integration, category filtering, responsive design, and owner-based listing management.

---

# Live Demo

🔗 Live Website: https://wanderstay-ifia.onrender.com

---

# Features

## 🔐 Authentication & Authorization
- User Signup/Login
- Secure authentication using Passport.js
- Session-based authorization
- Owner-specific edit/delete permissions

---

## 🏡 Listing Management
- Create new listings
- Edit listings
- Delete listings
- View detailed listing pages
- Owner information display

---

## 📷 Image Uploads
- Upload listing images
- Cloudinary cloud storage integration
- Optimized image handling using Multer

---

## 🔎 Smart Search
Users can search listings by:
- Location
- Title
- Price

---

## 🗂️ Category Filters
Filter listings using categories like:
- Rooms
- Trending
- Mountains
- Castles
- Beach
- Camping
- Cabins
- Apartments
- Historical Homes
- And more...

---


---

## 💬 Reviews & Ratings
- Add reviews
- Delete reviews
- User-based review authorization

---

## 📱 Responsive Design
- Mobile responsive layout
- Modern royal-style UI
- Optimized for desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- Passport.js
- Express-session

### Cloud Services
- Cloudinary
- Multer

### Maps & Geolocation
- OpenStreetMap
- Leaflet.js

### Deployment
- GitHub
- Render

---

# 📂 Folder Structure

```bash
WanderLust/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
│   ├── css/
│   ├── js/
│
├── middleware/
├── utils/
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ankitakr9/wanderlust-app.git
```

---

## 2️⃣ Move Into Project Folder

```bash
cd wanderlust-app
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Create `.env` File

Add the following environment variables:

```env
ATLASDB_URL=your_mongodb_url

SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

```

---

## 5️⃣ Run Application

```bash
node app.js
```

OR

```bash
nodemon app.js
```

---

# ☁️ Deployment

This project is deployed using:

- GitHub for version control
- Render for cloud deployment

## Deployment Workflow
1. Push code changes to GitHub
2. Render automatically detects updates
3. Auto deployment starts
4. Updated version goes live instantly

---

# UI Highlights

- Royal modern UI design
- Gradient buttons
- Responsive cards
- Hover animations
- Premium navbar styling
- Interactive category filters
- Modern footer with social media integration

---

# Future Enhancements

- Wishlist Feature
- Online Payment Gateway
- Booking Availability Calendar
- Dark Mode
- Real-Time Notifications
- Email Verification
- AI-based Stay Recommendations
- Mobile Application
- Multi-language Support

---

# 📚 What I Learned

Through this project, I improved my understanding of:

- Full Stack Web Development
- RESTful Routing
- MVC Architecture
- Authentication & Authorization
- MongoDB Relationships
- Cloud Deployment
- Responsive UI Design
- Git & GitHub Workflow
- Backend Validation
- API Integration

---

# Challenges Faced

- Handling user authentication securely
- Managing image uploads with Cloudinary
- Fixing owner authorization issues
- Responsive card layouts
- Search optimization
- Deployment debugging on Render

---

# 👩‍💻 Developed By

## Ankita 

### Connect With Me

- GitHub: https://github.com/ankitakr9
- LinkedIn: https://linkedin.com/in/ankitakr9
- Email: ankita.kri.dev@gmail.com
