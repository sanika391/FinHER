# FinHER: AI-Powered Financial Empowerment for Women Entrepreneurs 🚀💰

## 📌 Project Overview
**FinHER** is an AI-driven platform that provides **alternative financing models, AI-powered credit evaluation, and financial literacy programs** for women entrepreneurs.

---

## 🌟 Features & Functionalities
### 🔹 **AI-Powered Credit Evaluation**
- **Bias-free Credit Assessment** using AI.
- **Alternative Data Analysis** for fair credit scoring.

### 🔹 **Alternative Financing Models**
- **Crowdfunding**, **Microfinance**, **Impact Investments**.

### 🔹 **Financial Literacy & Mentorship**
- **Personalized Learning Modules** and **Expert Mentorship**.

---

## 📊 Dummy Dashboard UI
![FinHER Dashboard](dashboard_image.png)

---

## 🏆 Hackathon Details
- **Event**: Udyam Mahila Ideathon Challenge
- **Start Date**: March 11, 2025
- **End Date**: April 01, 2025

---

## 🏆 Impact
✅ **More financial access for women entrepreneurs**  
✅ **Increased business success rates**  
✅ **Reduced gender finance gap**


## Technology Stack

- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **AI Integration**: OpenAI for credit evaluation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker and Docker Compose (optional)

### Installation and Setup

#### Option 1: Manual Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/femfund.git
   cd femfund
   ```

2. Install dependencies:
   ```
   npm run install:all
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/femfund
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:3000
   ```

4. Start the development servers:
   ```
   npm start
   ```

#### Option 2: Docker Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/femfund.git
   cd femfund
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_ROOT_USER=admin
   MONGO_ROOT_PASSWORD=password
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the containers:
   ```
   docker-compose up -d
   ```

4. Access the application at http://localhost:3000

## Project Structure

```
femfund/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # React components and logic
│   └── Dockerfile          # Frontend Docker configuration
│
├── server/                 # Backend Node.js/Express application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── Dockerfile          # Backend Docker configuration
│
├── .gitignore
├── docker-compose.yml      # Docker configuration
└── README.md 
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all women entrepreneurs who inspired this platform
- Thanks to contributors and community members who helped shape this project# femfund project
