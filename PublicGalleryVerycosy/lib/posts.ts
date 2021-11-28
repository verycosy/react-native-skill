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

export const PAGE_SIZE = 3;
export async function getPosts(userId?: string) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
}

export async function getOlderPosts(id: string, userId?: string) {
  const cursorDoc = await postsCollection.doc(id).get();

  let query = postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
}

export async function getNewerPosts(id: string, userId?: string) {
  const cursorDoc = await postsCollection.doc(id).get();

  let query = postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
}
