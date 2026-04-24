# CitySync Map - Development Guide

## Frontend Development

### Getting Started
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Folder Structure
- **components/** - Reusable React components
- **pages/** - Full page components
- **hooks/** - Custom React hooks
- **services/** - API calls and external services
- **store/** - Redux state management
- **utils/** - Helper functions
- **types/** - TypeScript types (if using TS)
- **routes/** - Routing configuration
- **contexts/** - React Context API

### Styling
- Using Tailwind CSS for styling
- Configure in `tailwind.config.js`
- Global styles in `src/index.css`

## Backend Development

### Getting Started
1. Navigate to the backend directory
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Start development server: `npm run dev`

### Folder Structure
- **models/** - Database schemas
- **controllers/** - Request handlers
- **routes/** - API endpoints
- **services/** - Business logic
- **middleware/** - Custom middleware
- **utils/** - Helper functions
- **config/** - Configuration files
- **jobs/** - Background tasks

### API Endpoints
- Base URL: `http://localhost:5000/api`
- Health Check: `GET /api/health`

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (.env)
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CORS_ORIGIN` - Frontend URL for CORS
