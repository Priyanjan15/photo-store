import axios from 'axios';
import { Photo, ApiResponse } from '../types';

// Base API URL - replace with your actual API URL in production
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Photos API
export const photoApi = {
  // Get all photos
  getPhotos: async (): Promise<ApiResponse<Photo[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Photo[]>>('/photos');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Failed to fetch photos' 
        };
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  },

  // Get photo by ID
  getPhotoById: async (id: string): Promise<ApiResponse<Photo>> => {
    try {
      const response = await apiClient.get<ApiResponse<Photo>>(`/photos/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Failed to fetch photo' 
        };
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  },

  // Create new photo
  createPhoto: async (formData: FormData): Promise<ApiResponse<Photo>> => {
    try {
      const response = await apiClient.post<ApiResponse<Photo>>('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Failed to create photo' 
        };
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  },

  // Update photo
  updatePhoto: async (id: string, formData: FormData): Promise<ApiResponse<Photo>> => {
    try {
      const response = await apiClient.put<ApiResponse<Photo>>(`/photos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Failed to update photo' 
        };
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  },

  // Delete photo
  deletePhoto: async (id: string): Promise<ApiResponse<boolean>> => {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(`/photos/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Failed to delete photo' 
        };
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  },
};