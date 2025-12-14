# 🎬 Binnys - Movie & TV Show Streaming Platform

A full-stack streaming platform built with React, Node.js, Express, and MongoDB. Binnys allows users to browse movies and TV shows, while providing administrators with comprehensive content management capabilities.

## 🚀 Features

### User Features

- **Browse Content**: View movies and TV shows with detailed information
- **Search Functionality**: Find content easily with search capabilities
- **Detailed Views**: Access comprehensive information about movies and TV shows including cast, ratings, plot, and more
- **Responsive Design**: Optimized for desktop and mobile devices
- **Featured Content**: Highlighted movies and shows on the homepage

### Admin Features

- **Admin Authentication**: Secure login system for administrators
- **Content Management**: Create, update, and manage movie/TV show listings
- **Featured Content Control**: Mark content as featured for homepage display
- **Dashboard**: Overview of platform statistics and content
- **Protected Routes**: Secure admin panel with authentication middleware

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library
- **React Router DOM v7** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend

- **Node.js** - JavaScript runtime
- **Express.js v5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing

### Development Tools

- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
Binnys/
├── apps/
│   ├── client/                 # React frontend application
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── services/       # API service functions
│   │   │   ├── store/          # Redux store configuration
│   │   │   └── App.jsx         # Main application component
│   │   └── package.json
│   └── server/                 # Express backend application
│       ├── src/
│       │   ├── configs/        # Configuration files
│       │   ├── controllers/    # Route controllers
│       │   ├── database/     # Database connection
│       │   ├── middlewares/  # Custom middlewares
│       │   ├── models/       # Mongoose models
│       │   ├── routes/       # API routes
│       │   ├── validations/  # Input validations
│       │   └── app.js        # Express app configuration
│       └── server.js         # Server entry point
├── packages/                   # Shared packages
│   ├── eslint-config/        # ESLint configurations
│   ├── typescript-config/    # TypeScript configurations
│   └── ui/                   # Shared UI components
├── turbo.json                # Turbo configuration
└── package.json              # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or cloud)
- npm >= 11.6.2

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Binnys
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `apps/server` directory:

   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/binnys
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   WINDOW_MS=900000
   MAX=100
   ```

4. **Database Setup**
   - Ensure MongoDB is running locally or configure a cloud instance
   - The application will automatically create the necessary collections

5. **Start Development Servers**

   ```bash
   # Start both client and server in development mode
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📋 Available Scripts

### Root Level

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications for production
- `npm run lint` - Run ESLint on all applications
- `npm run format` - Format code with Prettier
- `npm run check-types` - Run TypeScript type checking

### Client (Frontend)

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server (Backend)

- `npm run dev` - Start server with Nodemon

## 🔐 Authentication

The platform includes a secure admin authentication system:

- JWT-based authentication
- Password hashing with bcrypt.js
- Protected routes with authentication middleware
- Secure cookie handling

## 📊 API Endpoints

### Authentication

- `POST /api/users/login` - Admin login
- `POST /api/users/logout` - Admin logout
- `GET /api/users/profile` - Get admin profile

### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### TV Shows

- `GET /api/tvshows` - Get all TV shows
- `GET /api/tvshows/:id` - Get single TV show

### Search

- `GET /api/search?q=query` - Search content

## 🎨 Frontend Components

### Key Components

- **Home** - Landing page with featured content
- **MediaDetail** - Detailed view for movies/TV shows
- **TvShowList** - Browse TV shows
- **AdminDashboard** - Admin control panel
- **MovieManagement** - CRUD operations for movies
- **ProtectedRoute** - Authentication wrapper
- **HeaderConditionalRenderer** - Dynamic header based on route

## 🛡️ Security Features

- **Helmet** - Security headers
- **Rate Limiting** - API protection against abuse
- **CORS** - Cross-origin resource sharing configuration
- **MongoDB Sanitization** - Protection against NoSQL injection
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt.js for secure password storage

## 🔄 State Management

The frontend uses Redux Toolkit for state management:

- Centralized state for user authentication
- Efficient component updates
- Predictable state mutations
- DevTools integration for debugging

## 📱 Responsive Design

Built with Tailwind CSS for mobile-first responsive design:

- Grid and flexbox layouts
- Responsive breakpoints
- Mobile-optimized navigation
- Touch-friendly interfaces

## 🧪 Development Features

- **Hot Module Replacement** - Instant updates during development
- **ESLint Configuration** - Code quality enforcement
- **Prettier Integration** - Consistent code formatting
- **Turbo Caching** - Fast builds with intelligent caching
- **Monorepo Structure** - Shared packages and configurations

## 🚢 Deployment

### Frontend Build

```bash
cd apps/client
npm run build
```

### Backend Deployment

The server can be deployed to any Node.js hosting platform:

- Configure environment variables
- Set up MongoDB connection
- Run `npm run dev` for development or `node server.js` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Bug Reports and Feature Requests

Please use the issue tracker to report bugs or request features. Include as much detail as possible:

- Steps to reproduce (for bugs)
- Expected behavior
- Actual behavior
- Environment details

## 📞 Support

For support and questions:

- Check the documentation
- Search existing issues
- Create a new issue with detailed information

---

**Built with ❤️ using React, Node.js, and MongoDB**
