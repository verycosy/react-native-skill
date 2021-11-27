import firestore from '@react-native-firebase/firestore';
import {User} from './users';

const postsCollection = firestore().collection('posts');

interface CreatePost {
  user: User;
  photoURL: string;
  description: string;
}

export interface Post extends CreatePost {
  id: string;
  createdAt: {_seconds: number};
}

export function createPost({user, photoURL, description}: CreatePost) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts() {
  const snapshot = await postsCollection.get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
}
