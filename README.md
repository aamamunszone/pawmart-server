<div align="center">

# 🐾 PawMart Server

### Backend API for Pet Adoption & Supply Platform

🌐 [Live API](https://pawmart-server-xi.vercel.app) | 🐛 [Report Bug](https://github.com/aamamunszone/pawmart-server/issues) | ✨ [Request Feature](https://github.com/aamamunszone/pawmart-server/issues)

</div>

---

## 📋 Table of Contents

- 🐾 [PawMart Server](#-pawmart-server)
  - [Backend API for Pet Adoption \& Supply Platform](#backend-api-for-pet-adoption--supply-platform)
  - 📋 [Table of Contents](#-table-of-contents)
  - 🎯 [About The Project](#-about-the-project)
    - [Purpose](#purpose)
  - ✨ [Core Features](#-core-features)
    - 🧩 [API Functionality](#-api-functionality)
    - 🔐 [Security \& Performance](#-security--performance)
    - 💻 [Developer Experience](#-developer-experience)
  - 🛠 [Tech Stack](#-tech-stack)
    - [Core Technologies](#core-technologies)
    - [Additional Tools](#additional-tools)
  - 🚀 [Getting Started](#-getting-started)
    - 🔧 [Prerequisites](#-prerequisites)
    - 🪄 [Installation](#-installation)

---

## 🎯 About The Project

**PawMart Server** is the backend REST API for the PawMart platform.  
It handles all server-side operations including **authentication**, **pet/product listings**, **order management**, and **database operations** using **Node.js**, **Express.js**, and **MongoDB**.

### Purpose

- Provide secure API endpoints for the PawMart client application
- Manage pet listings, product catalog, and orders
- Handle user authentication and authorization
- Store and retrieve data from MongoDB database

---

## ✨ Core Features

### 🧩 API Functionality

✅ RESTful API – Clean, organized endpoint structure  
✅ CRUD Operations – Full Create, Read, Update, Delete  
✅ Order Management – Handle adoptions & product orders  
✅ Category Filtering – Filter by Pets, Food, Accessories, Care Products  
✅ User-specific Data – Retrieve user listings & orders

### 🔐 Security & Performance

✅ CORS Enabled – Secure cross-origin requests  
✅ Environment Variables – Protected secrets with dotenv  
✅ MongoDB Connection – Stable with error handling  
✅ Firebase Admin (Optional) – Server-side auth support

### 💻 Developer Experience

✅ Hot Reload – Auto restart with Nodemon  
✅ Clean Code – Modular & maintainable  
✅ Error Handling – Comprehensive API responses

---

## 🛠 Tech Stack

### Core Technologies

- **Node.js** – JavaScript runtime
- **Express.js 5** – Web framework
- **MongoDB 7** – NoSQL database

### Additional Tools

- **CORS** – Cross-Origin Resource Sharing
- **dotenv** – Environment variable management
- **Firebase Admin SDK (Optional)** – Auth management
- **Nodemon** – Development auto-reload

---

## 🚀 Getting Started

### 🔧 Prerequisites

```
node >= 18.0.0
npm >= 9.0.0
mongodb >= 6.0.0
```

### 🪄 Installation

**1. Clone the repository**

```bash
git clone https://github.com/aamamunszone/pawmart-server.git
cd pawmart-server
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment variables**

Create `.env` in the project root:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
PORT=3000

# Optional: Firebase Admin SDK
FIREBASE_ADMIN_SDK_PATH=./firebase-admin-sdk.json
```

**4. Start development server**

```bash
npm run dev
```

**5. Server will run on**

```
http://localhost:3000
```

## 🔗 API Endpoints

## Base URL

```
Production: https://pawmart-server-xi.vercel.app
Development: http://localhost:3000
```

### 🐶 Listings Endpoints

Get All Listings

```
GET /listings
```

Get Recent Listings

```
GET /listings/recent
```

Get Single Listing

```
GET /listings/:listingId
```

Get Listings by Category

```
GET /listings/category/:name
```

Get User's Listings

```
GET /listings?email=user@example.com
```

Create Listing

```
POST /listings
```

Sample Request Body:

```json
{
  "name": "Golden Retriever Puppy",
  "category": "Pets",
  "price": 0,
  "location": "Dhaka",
  "description": "Friendly 2-month-old puppy",
  "image": "https://example.com/image.jpg",
  "email": "owner@example.com",
  "date": "2025-01-15"
}
```

Update Listing

```
PUT /listings/:listingId
```

Delete Listing

```
DELETE /listings/:listingId
```

### 📦 Orders Endpoints

Get User's Orders

```
GET /orders?email=user@example.com
```

Create Order

```
POST /orders
```

Sample Request Body:

```json
{
  "productId": "507f1f77bcf86cd799430002",
  "productName": "Golden Retriever Puppy",
  "buyerName": "John Doe",
  "email": "buyer@example.com",
  "quantity": 1,
  "price": 0,
  "address": "Dhaka, Bangladesh",
  "phone": "01712345678",
  "date": "2025-01-20",
  "additionalNotes": "Please call before delivery"
}
```

## 📂 Project Structure

```
pawmart-server/
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## 📦 NPM Packages

Core Dependencies

```json
{
  "express": "^5.1.0",
  "mongodb": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

Optional Dependencies

```json
{
  "firebase-admin": "^13.6.0"
}
```

Dev Dependencies

```json
{
  "nodemon": "^3.0.0"
}
```

## 🌐 Deployment (Vercel)

1. Install Vercel CLI

```bash
npm install -g vercel
```

2.  Login

```bash
vercel login
```

3.  Create vercel.json

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

4.  Deploy

```bash
vercel --prod
```

5.  Add Environment Variables

- Go to Vercel Dashboard → Settings → Environment Variables
- Add MONGODB_URI and any Firebase keys if used

## 🔒 Example .env

```env
# MongoDB

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pawmartDB

# Server

PORT=3000
NODE_ENV=production

# Optional Firebase

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

## 🧪 Testing the API

Using cURL

```bash
# Get all listings

curl https://pawmart-server-xi.vercel.app/listings

# Get listings by category

curl https://pawmart-server-xi.vercel.app/listings/category/Pets

# Create a new listing

curl -X POST https://pawmart-server-xi.vercel.app/listings \
 -H "Content-Type: application/json" \
 -d '{"name":"Test Pet","category":"Pets","price":0}'
```

Using Postman

- Import the API endpoints
- Set base URL: https://pawmart-server-xi.vercel.app
- Test each route with example data

## 👨‍💻 Developer

<div align="center">

### Abdullah Al Mamun

**Full Stack Developer | MERN Stack**

[![GitHub](https://img.shields.io/badge/GitHub-aamamunszone-181717?style=flat&logo=github)](https://github.com/aamamunszone)
[![Email](https://img.shields.io/badge/Email-aamamunszone@gmail.com-D14836?style=flat&logo=gmail)](mailto:aamamunszone@gmail.com)

</div>

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ and 🐾 by Abdullah Al Mamun
⭐ Star this repo if you like it!

</div>
