# PhotoStore

A professional photo storage application built with React, TypeScript, and MongoDB Atlas. This project demonstrates enterprise-scale Micro SaaS development with advanced DevOps practices.

![PhotoStore Screenshot](https://via.placeholder.com/800x400?text=PhotoStore+Screenshot)

## Features

- 📸 Upload and store images with metadata
- 🔍 Search and filter photos by title, description, and tags
- ✏️ Edit photo details and update images
- 🗑️ Delete unwanted photos
- 📱 Responsive design for all devices
- 🔒 Secure MongoDB Atlas integration

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Testing**: Vitest, Testing Library, Cypress
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/photo-store.git
   cd photo-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

   For the API server, create a `.env` file in the `api` directory:
   ```
   MONGODB_URI=mongodb+srv://malikwanigasinghe00:A5QWKTUvJ5C1PLra@cluster0.mpvq5q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=3001
   ```

### Running the Application

1. Start the API server:
   ```bash
   cd api
   npm install
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Running Tests

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Project Structure

```
├── api/               # Backend API server
├── doc/               # Project documentation
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages
│   ├── services/      # API and service functions
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── tests/             # Test files
│   ├── unit/          # Unit tests
│   └── integration/   # Integration tests
└── .github/           # GitHub workflows and templates
```

## Deployment

The application is configured for deployment on Vercel. The CI/CD pipeline handles:

1. Code linting and testing
2. Building the application
3. Deploying to Vercel

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Documentation

Comprehensive documentation is available in the `doc` directory, including:

- Architecture diagrams
- API specifications
- Deployment guides
- Market research

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.