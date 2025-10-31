import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}