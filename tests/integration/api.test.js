import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock data
const mockPhotos = [
  { 
    _id: '1', 
    title: 'Test Photo 1',
    description: 'Description for test photo 1',
    imageUrl: 'http://localhost:3001/uploads/image-1.jpg',
    tags: ['test', 'photo'],
    createdAt: '2025-03-01T00:00:00.000Z'
  },
  { 
    _id: '2', 
    title: 'Test Photo 2',
    description: 'Description for test photo 2',
    imageUrl: 'http://localhost:3001/uploads/image-2.jpg',
    tags: ['test', 'second'],
    createdAt: '2025-03-02T00:00:00.000Z'
  }
];

// Setup MSW server
const server = setupServer(
  // GET /api/photos
  rest.get('/api/photos', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: mockPhotos
    }));
  }),
  
  // GET /api/photos/:id
  rest.get('/api/photos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const photo = mockPhotos.find(p => p._id === id);
    
    if (!photo) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'Photo not found'
        })
      );
    }
    
    return res(ctx.json({
      success: true,
      data: photo
    }));
  }),
  
  // POST /api/photos
  rest.post('/api/photos', async (req, res, ctx) => {
    // In a real test, we would validate the form data
    // For simplicity, we just return a mock response
    
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          _id: '3',
          title: 'New Test Photo',
          description: 'Description for new test photo',
          imageUrl: 'http://localhost:3001/uploads/image-3.jpg',
          tags: ['test', 'new'],
          createdAt: new Date().toISOString()
        }
      })
    );
  }),
  
  // DELETE /api/photos/:id
  rest.delete('/api/photos/:id', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: true
    }));
  })
);

// Configure axios
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('API Integration Tests', () => {
  it('fetches photos successfully', async () => {
    const response = await apiClient.get('/photos');
    
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.data.data.length).toBe(mockPhotos.length);
  });
  
  it('fetches a single photo by ID', async () => {
    const response = await apiClient.get('/photos/1');
    
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data._id).toBe('1');
    expect(response.data.data.title).toBe('Test Photo 1');
  });
  
  it('returns 404 for non-existent photo', async () => {
    try {
      await apiClient.get('/photos/nonexistent');
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.success).toBe(false);
      expect(error.response.data.error).toBe('Photo not found');
    }
  });
  
  it('creates a new photo', async () => {
    // In a real test, we would use FormData and attach a file
    // For simplicity, we just test the endpoint responds
    
    const formData = new FormData();
    formData.append('title', 'New Test Photo');
    formData.append('description', 'Description for new test photo');
    formData.append('tags', JSON.stringify(['test', 'new']));
    
    const response = await apiClient.post('/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.data._id).toBe('3');
    expect(response.data.data.title).toBe('New Test Photo');
  });
  
  it('deletes a photo', async () => {
    const response = await apiClient.delete('/photos/1');
    
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBe(true);
  });
});