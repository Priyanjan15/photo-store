import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Photo } from '../types';
import { photoApi } from '../services/api';
import PhotoGrid from '../components/PhotoGrid';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await photoApi.getPhotos();
        if (response.success && response.data) {
          setPhotos(response.data);
          setFilteredPhotos(response.data);
        } else {
          setError(response.error || 'Failed to fetch photos');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPhotos(photos);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = photos.filter(
      (photo) =>
        photo.title.toLowerCase().includes(lowercaseQuery) ||
        photo.description.toLowerCase().includes(lowercaseQuery) ||
        photo.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    setFilteredPhotos(filtered);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await photoApi.deletePhoto(id);
      if (response.success) {
        // Update local state after successful deletion
        const updatedPhotos = photos.filter(photo => photo._id !== id);
        setPhotos(updatedPhotos);
        setFilteredPhotos(
          filteredPhotos.filter(photo => photo._id !== id)
        );
      } else {
        alert(response.error || 'Failed to delete photo');
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
      alert('An unexpected error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Photo Gallery</h1>
          <p className="text-gray-600 mt-1">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} {searchQuery && `matching "${searchQuery}"`}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex-grow">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Photo
          </Link>
        </div>
      </div>

      <PhotoGrid
        photos={filteredPhotos}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HomePage;