import React from 'react';
import { Server, Image, Shield, GitFork } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About PhotoStore</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
          <p className="text-gray-600 mb-4">
            The Photo Store Interface is a backend API layer responsible for managing user-uploaded photos within the application. 
            This interface is crucial for maintaining photo metadata and handling file uploads efficiently in a decoupled architecture.
          </p>
          
          <p className="text-gray-600">
            The application allows users to upload, store, manage, and share photos with robust features 
            for organization and retrieval. Built with a focus on security, performance, and reliability.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Photo Management</h3>
            </div>
            <p className="text-gray-600">
              Upload, organize, and manage your photos with ease. Add metadata, tags, and descriptions to make your photos searchable.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">MongoDB Atlas Integration</h3>
            </div>
            <p className="text-gray-600">
              Powered by MongoDB Atlas for reliable, scalable, and secure database storage with automatic backups and monitoring.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Security First</h3>
            </div>
            <p className="text-gray-600">
              Built with security best practices including secure data storage, input validation, and protection against common web vulnerabilities.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <GitFork className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">DevOps Integration</h3>
            </div>
            <p className="text-gray-600">
              Comprehensive CI/CD pipeline, automated testing, and deployment processes for reliable and consistent delivery.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Technology Stack</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-32 font-medium">Frontend:</span>
              <span>React, TypeScript, Tailwind CSS</span>
            </li>
            <li className="flex items-center">
              <span className="w-32 font-medium">Backend:</span>
              <span>Node.js, Express</span>
            </li>
            <li className="flex items-center">
              <span className="w-32 font-medium">Database:</span>
              <span>MongoDB Atlas</span>
            </li>
            <li className="flex items-center">
              <span className="w-32 font-medium">Testing:</span>
              <span>Vitest, Testing Library, Cypress</span>
            </li>
            <li className="flex items-center">
              <span className="w-32 font-medium">CI/CD:</span>
              <span>GitHub Actions</span>
            </li>
            <li className="flex items-center">
              <span className="w-32 font-medium">Deployment:</span>
              <span>Railway</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;