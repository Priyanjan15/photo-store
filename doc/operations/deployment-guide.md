# Deployment Guide

This document provides comprehensive instructions for deploying the PhotoStore application to production environments.

## Deployment Architecture

The PhotoStore application uses a modern deployment architecture:

1. **Frontend**: Static assets deployed to Vercel
2. **Backend API**: Node.js Express server deployed to a serverless environment
3. **Database**: MongoDB Atlas cloud database
4. **File Storage**: Image files stored in the server's filesystem (future enhancement: move to cloud storage)

## Prerequisites

Before deployment, ensure you have:

1. A Vercel account
2. A MongoDB Atlas account and cluster
3. Node.js v16+ and npm installed locally
4. Git installed locally

## Environment Variables

### Frontend Environment Variables

Create a `.env` file in the root directory with these variables:

```
VITE_API_URL=https://your-api-domain.com/api
```

### Backend Environment Variables

Create a `.env` file in the `api` directory with these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/photostore
PORT=3001
NODE_ENV=production
```

## Deployment Steps

### 1. Database Setup

1. Create a MongoDB Atlas cluster:
   - Log in to MongoDB Atlas
   - Create a new project (if needed)
   - Build a new cluster (the free tier is sufficient for starting)
   - Choose your preferred cloud provider and region

2. Set up database access:
   - Create a database user with read/write permissions
   - Add your IP address to the IP access list (for development)
   - For production, set up network access according to your hosting provider

3. Connect to your cluster:
   - Get your connection string from the MongoDB Atlas dashboard
   - Replace `<username>`, `<password>`, and `<dbname>` with your values

### 2. Backend Deployment

#### Option A: Vercel Serverless Functions

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Configure for serverless deployment:
   Create a `vercel.json` file in the root directory:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "api/index.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/api/(.*)", "dest": "api/index.js" }
     ]
   }
   ```

3. Set up environment variables in Vercel:
   - Log in to the Vercel dashboard
   - Navigate to your project
   - Go to Settings > Environment Variables
   - Add your MongoDB connection string and other variables

4. Deploy:
   ```
   vercel
   ```

#### Option B: Traditional Node.js Hosting (e.g., DigitalOcean, Heroku)

1. Prepare your application:
   - Ensure `package.json` includes start script: `"start": "node index.js"`
   - Create a `Procfile` for Heroku: `web: node index.js`

2. Deploy:
   - Follow your hosting provider's specific deployment instructions
   - Set up environment variables in your hosting platform's dashboard

### 3. Frontend Deployment

The frontend is deployed to Vercel:

1. Connect your GitHub repository to Vercel:
   - Log in to Vercel
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project (build settings should be auto-detected)

2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. Add environment variables:
   - Add `VITE_API_URL` pointing to your API endpoint

4. Deploy:
   - Click "Deploy"
   - Vercel will build and deploy your application

### 4. Continuous Deployment

Set up continuous deployment with GitHub Actions:

1. GitHub Actions workflow is already configured in `.github/workflows/cd.yml`

2. Add secrets to your GitHub repository:
   - Go to Settings > Secrets > Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `VERCEL_ORG_ID`: Your Vercel organization ID

3. Push changes to the main branch to trigger automatic deployment

## Post-Deployment Verification

After deployment, verify:

1. Frontend is accessible and loads correctly
2. API endpoints are reachable from the frontend
3. Photos can be uploaded, viewed, edited, and deleted
4. Error handling works as expected
5. MongoDB connections are established properly

## Scaling Considerations

As your application grows:

1. **Database scaling**:
   - MongoDB Atlas offers automatic scaling
   - Consider upgrading your cluster as usage increases

2. **API scaling**:
   - Implement caching strategies
   - Consider moving to a Kubernetes-based deployment for larger scale

3. **Image storage**:
   - Migrate from filesystem storage to a CDN or object storage solution (AWS S3, Google Cloud Storage)
   - Implement image optimization and resizing services

4. **Performance optimization**:
   - Add CDN for static assets
   - Implement server-side rendering for improved SEO and initial load

## Troubleshooting

Common deployment issues:

1. **MongoDB connection failures**:
   - Check connection string
   - Verify network access settings
   - Ensure credentials are correct

2. **CORS errors**:
   - Verify CORS configuration in Express
   - Check frontend API URL configuration

3. **Image upload issues**:
   - Check upload directory permissions
   - Verify Multer configuration
   - Check file size limits

## Backup and Disaster Recovery

1. **Database backups**:
   - MongoDB Atlas provides automatic backups
   - Configure backup schedule in MongoDB Atlas dashboard

2. **Application recovery**:
   - Document recovery procedures
   - Test restore process periodically

3. **Monitoring**:
   - Set up alerts for application health
   - Monitor API response times and error rates