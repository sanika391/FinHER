# FemFund Server

This is the backend application for FemFund, providing APIs for user authentication, funding options, applications, and learning resources.

## Features

- User authentication and authorization
- Funding options management
- Application processing and tracking
- Learning resources management
- AI-powered credit evaluation
- Email notifications

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- OpenAI API for credit evaluation
- Nodemailer for email notifications

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

or with yarn:

```bash
yarn
```

2. Create a `.env` file in the server directory with necessary environment variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/femfund
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
EMAIL_FROM=FemFund <noreply@femfund.com>
OPENAI_API_KEY=your_openai_api_key
```

### Development

Start the development server:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The server will run on http://localhost:5000.

### Production

Start the server in production mode:

```bash
npm start
```

or with yarn:

```bash
yarn start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete account

### Funding

- `GET /api/funding/options` - Get all funding options
- `GET /api/funding/options/:id` - Get funding option by ID
- `POST /api/funding/apply/:id` - Submit funding application

### Applications

- `GET /api/applications` - Get user applications
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/:id` - Update application

### Learning

- `GET /api/learning/resources` - Get all learning resources
- `GET /api/learning/resources/:id` - Get learning resource by ID
- `POST /api/learning/resources/:id/complete` - Mark resource as completed
- `GET /api/learning/progress` - Get user learning progress

### Dashboard

- `GET /api/dashboard/summary` - Get financial summary
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/health-score` - Get financial health score

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/applications` - Get all applications (admin only)
- `PUT /api/admin/applications/:id` - Update application status (admin only)
- `POST /api/admin/funding/options` - Create funding option (admin only)
- `PUT /api/admin/funding/options/:id` - Update funding option (admin only)
- `DELETE /api/admin/funding/options/:id` - Delete funding option (admin only)
- `POST /api/admin/learning/resources` - Create learning resource (admin only)
- `PUT /api/admin/learning/resources/:id` - Update learning resource (admin only)
- `DELETE /api/admin/learning/resources/:id` - Delete learning resource (admin only)

## Project Structure

```
server/
├── controllers/          # Route controllers
├── middleware/           # Express middleware
├── models/               # Database models
├── routes/               # API routes
├── services/             # Business logic
│   └── ai/               # AI credit evaluation service
├── utils/                # Utility functions
├── templates/            # Email templates
│   └── emails/           # Email HTML templates
├── config/               # Configuration files
├── logs/                 # Log files
├── server.js             # Entry point
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.