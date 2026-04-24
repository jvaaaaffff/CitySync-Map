# CitySync Map - Website

A full-stack MERN application for city synchronization and mapping services.

## Project Structure

```
Website/
├── frontend/                 # React.js Frontend Application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API communication layer
│   │   ├── store/            # Redux state management
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   ├── routes/           # Routing configuration
│   │   ├── contexts/         # React Context API
│   │   └── App.jsx           # Main app component
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
│
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   │   ├── models/           # Database schemas/models
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   ├── config/           # Configuration files
│   │   ├── jobs/             # Background tasks
│   │   └── server.js         # Main server file
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
│
├── docs/                     # Documentation
└── README.md                 # This file
```

## Tech Stack

### Frontend
- **React.js** - UI library
- **Redux** - State management
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Programming language
- **HTML5** - Markup
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB/PostgreSQL** - Database
- **JWT** - Authentication

## Installation

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `.env` files in both frontend and backend directories with necessary configuration.

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables
4. Run both frontend and backend development servers
5. Open `http://localhost:5173` for frontend (Vite default)
6. Backend runs on `http://localhost:5000` (configurable)

## Documentation

See the `docs/` folder for detailed documentation.
