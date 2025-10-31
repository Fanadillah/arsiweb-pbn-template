import { db } from '@/lib/firebaseClient';
import { Post } from '@/types/post';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  where,
  increment,
  Timestamp 
} from 'firebase/firestore';



// Create new post
export async function createPost(data: Omit<Post, 'id' | 'views'>) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...data,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Get all posts
export async function getPosts() {
  try {
    const q = query(
      collection(db, 'posts'), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
}

// Get single post
export async function getPost(id: string) {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Post not found');
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
}

// Update post
export async function updatePost(id: string, data: Partial<Post>) {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Delete post
export async function deletePost(id: string) {
  try {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Increment view count
export async function incrementPostView(id: string) {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, {
      views: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing view:', error);
    throw error;
  }
}