import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this photo?')) {
      onDelete(photo._id || '');
    }
  };

  return (
    <div className="group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={photo.imageUrl} 
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3 bg-white p-2 rounded-full shadow-md">
            <Link 
              to={`/edit/${photo._id}`}
              className="p-1.5 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
              title="Edit photo"
            >
              <Edit2 size={16} />
            </Link>
            <button 
              onClick={handleDelete}
              className="p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
              title="Delete photo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/photos/${photo._id}`}>
          <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">{photo.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{photo.description}</p>
        
        {photo.tags && photo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {photo.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-500 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;