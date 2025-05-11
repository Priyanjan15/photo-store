import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { photoApi } from '../services/api';
import { Photo, PhotoFormData } from '../types';
import PhotoForm from '../components/PhotoForm';

const EditPhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await photoApi.getPhotoById(id);
        if (response.success && response.data) {
          setPhoto(response.data);
        } else {
          setError(response.error || 'Failed to fetch photo');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await photoApi.updatePhoto(id, formData);
      
      if (response.success && response.data) {
        // Redirect to the photo detail page
        navigate(`/photos/${response.data._id}`);
      } else {
        setError(response.error || 'Failed to update photo');
      }
    } catch (err) {
      console.error('Error updating photo:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading photo data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-gray-800 font-medium">Failed to load photo</p>
            <p className="text-gray-600 mt-1">{error}</p>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Transform the photo data to match the form's input format
  const initialData: PhotoFormData = {
    title: photo.title,
    description: photo.description,
    tags: photo.tags,
    image: null // We don't need to provide the image when editing, as it already exists
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/photos/${photo._id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Photo
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Photo</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Update failed</p>
            <p>{error}</p>
          </div>
        )}
        
        <PhotoForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditPhotoPage;