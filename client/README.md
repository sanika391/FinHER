# FemFund Client

This is the frontend application for FemFund, a financial empowerment platform designed specifically for women entrepreneurs.

## Features

- User authentication and profile management
- Dashboard for financial overview
- Funding options exploration and application
- Financial learning center
- Application status tracking

## Technologies Used

- React 19.x
- React Router 6.x
- Tailwind CSS for styling
- Vite for fast development and building
- Axios for API requests
- Chart.js for data visualization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
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

2. Create a `.env` file in the client directory with necessary environment variables:

```
VITE_API_URL=http://localhost:5000/api
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

The application will be available at http://localhost:3000.

### Building for Production

Build the application for production:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

or with yarn:

```bash
yarn preview
```

## Project Structure

```
client/
├── public/               # Static assets
│   ├── index.html        # HTML template
│   ├── favicon.ico       # Favicon
│   └── assets/           # Images and other static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Common UI elements
│   │   ├── dashboard/    # Dashboard components
│   │   ├── auth/         # Authentication components
│   │   ├── funding/      # Funding-related components
│   │   └── learning/     # Financial literacy components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.