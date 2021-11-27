import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export interface User {
  id: string;
  displayName: string;
  photoURL: string | null;
}

export function createUser(user: User) {
  return usersCollection.doc(user.id).set(user);
}

export async function getUser(id: string): Promise<User> {
  const doc = await usersCollection.doc(id).get();
  return doc.data() as User;
}
