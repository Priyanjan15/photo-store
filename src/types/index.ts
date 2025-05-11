export interface Photo {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type PhotoFormData = Omit<Photo, '_id' | 'imageUrl' | 'createdAt' | 'updatedAt'> & {
  image: File | null;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}