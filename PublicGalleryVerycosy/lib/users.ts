import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

interface User {
  id: string;
  displayName: string;
  photoURL: string | null;
}

export function createUser(user: User) {
  return usersCollection.doc('id').set(user);
}

export async function getUser(id: string) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
