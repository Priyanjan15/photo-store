# System Architecture

This document outlines the architecture of the PhotoStore application, following the C4 model (Context, Containers, Components, Code).

## 1. Context Diagram

![Context Diagram](./assets/1.png)

The PhotoStore application serves end users who want to upload, manage, and view their photos. It interfaces with MongoDB Atlas for data storage.

## 2. Container Diagram

![Container Diagram](./assets/2.png)

The system consists of three main containers:

1. **React Frontend**: A single-page application built with React, TypeScript, and Tailwind CSS. It provides the user interface for interacting with photos.

2. **Express API**: A Node.js/Express server providing RESTful API endpoints for the frontend. It handles photo uploads, retrievals, updates, and deletions.

3. **MongoDB Atlas**: A cloud database service storing photo metadata and references to uploaded image files.

## 3. Component Diagram

### React Frontend Components



Key components:

1. **Router**: Handles navigation between different pages (React Router)
2. **Pages**: Main application pages (Home, Upload, Photo Detail, Edit)
3. **Components**: Reusable UI components (PhotoCard, PhotoForm, SearchBar)
4. **API Services**: Handles API calls to the backend

### Express API Components

![Component Diagram](./assets/3.png)


Key components:

1. **Route Handlers**: Define API endpoints and route incoming requests
2. **Controllers**: Contain business logic for handling requests
3. **Models**: Mongoose models defining data schema
4. **Database Connection**: Manages connection to MongoDB Atlas

## 4. Code Level

### Frontend Architecture

- **src/components/**: Reusable UI components
- **src/pages/**: Page components with routing
- **src/services/**: API service functions
- **src/types/**: TypeScript type definitions
- **src/App.tsx**: Main application component
- **src/main.tsx**: Application entry point

### Backend Architecture

- **api/index.js**: Main Express application
- **api/models/**: Mongoose models
- **api/controllers/**: Request handlers
- **api/middleware/**: Express middleware
- **api/utils/**: Utility functions

## 5. Data Flow

1. User interacts with the React Frontend
2. Frontend makes API calls to the Express backend
3. Backend processes requests, interacts with MongoDB
4. Backend returns responses to the Frontend
5. Frontend updates UI based on responses

## 6. Security Considerations

- CORS configuration to restrict API access
- Input validation and sanitization
- Secure file upload handling
- Environment variable protection
- Error handling without exposing sensitive information

## 7. Scalability Considerations

- Stateless API design for horizontal scaling
- MongoDB Atlas scaling capabilities
- CDN integration for image delivery
- Performance optimization for image handling
