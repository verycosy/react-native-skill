import firestore from '@react-native-firebase/firestore';
import {User} from './users';

const postsCollection = firestore().collection('posts');

export interface Post {
  user: User;
  photoURL: string;
  description: string;
}

export function createPost({user, photoURL, description}: Post) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}
