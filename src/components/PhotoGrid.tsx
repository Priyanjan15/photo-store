import React from 'react';
import { Photo } from '../types';
import PhotoCard from './PhotoCard';
import { ImageOff } from 'lucide-react';

interface PhotoGridProps {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => Promise<void>;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ 
  photos, 
  loading, 
  error, 
  onDelete 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-gray-800 font-medium">Failed to load photos</p>
          <p className="text-gray-600 mt-1">{error}</p>
          <button 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <ImageOff className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800">No photos found</h3>
        <p className="text-gray-600 mt-1">Upload some photos to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard 
          key={photo._id} 
          photo={photo} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default PhotoGrid;