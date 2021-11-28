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

interface GetPosts {
  mode?: 'newer' | 'older';
  id?: string;
  userId?: string;
}

export const PAGE_SIZE = 3;
export async function getPosts({userId, mode, id}: GetPosts = {}) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();

    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
}

export async function getOlderPosts(id: string, userId?: string) {
  return getPosts({id, mode: 'older', userId});
}

export async function getNewerPosts(id: string, userId?: string) {
  return getPosts({id, mode: 'newer', userId});
}
