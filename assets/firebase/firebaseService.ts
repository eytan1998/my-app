import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/assets/firebase/firebaseConfig';
import { UserData } from '@/assets/Models/UserData';

const USERS_COLLECTION = 'users';

// Save user data to Firestore
export const saveUserData = async (userId: string, userData: UserData) => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  await setDoc(userDoc, userData.toDatabaseObject());
};

// Get user data from Firestore
export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    return UserData.fromDatabaseObject(docSnap.data());
  } else {
    console.log('No such user data!');
    return null;
  }
};

// Update specific fields in user data
export const updateUserData = async (userId: string, data: Partial<UserData>) => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userDoc, data);
};