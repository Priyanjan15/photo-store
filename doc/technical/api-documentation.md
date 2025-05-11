# API Documentation

This document provides detailed information about the PhotoStore API endpoints, request/response formats, and authentication requirements.

## Base URL

```
http://localhost:3001/api
```

In production:

```
https://your-production-domain.com/api
```

## Authentication

*Note: Authentication is not implemented in the current version but will be added in future releases.*

## API Endpoints

### Photos

#### Get All Photos

Retrieves a list of all photos.

- **URL**: `/photos`
- **Method**: `GET`
- **Auth required**: No

**Success Response**:
- **Code**: 200 OK
- **Content example**:

```json
{
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Mountain Landscape",
      "description": "Beautiful mountain view",
      "imageUrl": "http://localhost:3001/uploads/image-1234567890.jpg",
      "tags": ["mountains", "landscape", "nature"],
      "createdAt": "2025-06-22T18:30:00.000Z",
      "updatedAt": "2025-06-22T18:30:00.000Z"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "title": "Ocean Sunset",
      "description": "Sunset at the beach",
      "imageUrl": "http://localhost:3001/uploads/image-0987654321.jpg",
      "tags": ["ocean", "sunset", "beach"],
      "createdAt": "2025-06-21T15:00:00.000Z",
      "updatedAt": "2025-06-21T15:00:00.000Z"
    }
  ]
}
```

**Error Response**:
- **Code**: 500 Internal Server Error
- **Content example**:

```json
{
  "success": false,
  "error": "Failed to fetch photos"
}
```

#### Get Photo by ID

Retrieves a single photo by its ID.

- **URL**: `/photos/:id`
- **Method**: `GET`
- **URL Params**: 
  - `id`: Photo ID
- **Auth required**: No

**Success Response**:
- **Code**: 200 OK
- **Content example**:

```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Mountain Landscape",
    "description": "Beautiful mountain view",
    "imageUrl": "http://localhost:3001/uploads/image-1234567890.jpg",
    "tags": ["mountains", "landscape", "nature"],
    "createdAt": "2025-06-22T18:30:00.000Z",
    "updatedAt": "2025-06-22T18:30:00.000Z"
  }
}
```

**Error Responses**:
- **Code**: 404 Not Found
- **Content example**:

```json
{
  "success": false,
  "error": "Photo not found"
}
```

- **Code**: 500 Internal Server Error
- **Content example**:

```json
{
  "success": false,
  "error": "Failed to fetch photo"
}
```

#### Create a New Photo

Creates a new photo.

- **URL**: `/photos`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Auth required**: No
- **Form Data**:
  - `image`: Image file (required)
  - `title`: Photo title (required)
  - `description`: Photo description (optional)
  - `tags`: JSON string array of tags (optional)

**Success Response**:
- **Code**: 201 Created
- **Content example**:

```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "New Photo",
    "description": "A newly uploaded photo",
    "imageUrl": "http://localhost:3001/uploads/image-2468135790.jpg",
    "tags": ["new", "upload"],
    "createdAt": "2025-06-23T10:15:00.000Z",
    "updatedAt": "2025-06-23T10:15:00.000Z"
  }
}
```

**Error Responses**:
- **Code**: 400 Bad Request
- **Content example**:

```json
{
  "success": false,
  "error": "No image uploaded"
}
```

- **Code**: 500 Internal Server Error
- **Content example**:

```json
{
  "success": false,
  "error": "Failed to create photo"
}
```

#### Update a Photo

Updates an existing photo.

- **URL**: `/photos/:id`
- **Method**: `PUT`
- **Content-Type**: `multipart/form-data`
- **URL Params**: 
  - `id`: Photo ID
- **Auth required**: No
- **Form Data**:
  - `image`: New image file (optional)
  - `title`: Updated photo title (required)
  - `description`: Updated photo description (optional)
  - `tags`: JSON string array of updated tags (optional)

**Success Response**:
- **Code**: 200 OK
- **Content example**:

```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Mountain Landscape",
    "description": "Beautiful updated mountain view",
    "imageUrl": "http://localhost:3001/uploads/image-1234567890.jpg",
    "tags": ["mountains", "landscape", "nature", "updated"],
    "createdAt": "2025-06-22T18:30:00.000Z",
    "updatedAt": "2025-06-23T12:00:00.000Z"
  }
}
```

**Error Responses**:
- **Code**: 404 Not Found
- **Content example**:

```json
{
  "success": false,
  "error": "Photo not found"
}
```

- **Code**: 500 Internal Server Error
- **Content example**:

```json
{
  "success": false,
  "error": "Failed to update photo"
}
```

#### Delete a Photo

Deletes a photo.

- **URL**: `/photos/:id`
- **Method**: `DELETE`
- **URL Params**: 
  - `id`: Photo ID
- **Auth required**: No

**Success Response**:
- **Code**: 200 OK
- **Content example**:

```json
{
  "success": true,
  "data": true
}
```

**Error Responses**:
- **Code**: 404 Not Found
- **Content example**:

```json
{
  "success": false,
  "error": "Photo not found"
}
```

- **Code**: 500 Internal Server Error
- **Content example**:

```json
{
  "success": false,
  "error": "Failed to delete photo"
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

## File Upload Constraints

- Supported file types: JPEG, JPG, PNG, GIF
- Maximum file size: 10MB
- Files are stored in the `/uploads` directory on the server
- Files are served at `/uploads/{filename}`

## Rate Limiting

*Note: Rate limiting is not implemented in the current version but will be added in future releases.*

## Pagination

*Note: Pagination is not implemented in the current version but will be added in future releases.*

## Versioning

This is the first version (v1) of the API. Future versions will be available at `/api/v2`, etc.