import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/assets/firebase/firebaseConfig';
import { MonthMetadata, UserData } from '@/assets/Models/UserData';
import { EventType } from '../Models/Events/Events';

const USERS_COLLECTION = 'users';
const MONTHS_COLLECTION = 'months';

// Helper function to get the full month name
const getMonthName = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}${month}`;
};

// Helper function to get the day of the month as a string
const getDayString = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

export const saveUserData = async (userId: string, userData: UserData) => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  try {
    await setDoc(userDoc, { months: userData.months });
    console.log(`User data saved for user ${userId}`);
  } catch (error) {
    console.error(`Error saving user data for user ${userId}:`, error);
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  try {
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      console.log(`User data retrieved for user ${userId}`);
      const data = docSnap.data();
      return new UserData(data.months || {});
    } else {
      console.log(`No user data found for user ${userId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving user data for user ${userId}:`, error);
    return null;
  }
};
export const saveMonthEvents = async (
  userId: string,
  month: string,
  monthData: MonthMetadata
) => {
  const monthDoc = doc(db, USERS_COLLECTION, `${userId}/${MONTHS_COLLECTION}/${month}`);
  try {
    await setDoc(monthDoc, monthData, { merge: true }); // Merge ensures only updated fields are written
    console.log(`Events for ${month} saved successfully for user ${userId}`);
  } catch (error) {
    console.error(`Error saving events for ${month}:`, error);
  }
};

export const loadMonthEvents = async (
  userId: string,
  month: string
): Promise<MonthMetadata> => {
  const monthDoc = doc(db, USERS_COLLECTION, `${userId}/${MONTHS_COLLECTION}/${month}`);
  try {
    const docSnap = await getDoc(monthDoc);
    if (docSnap.exists()) {
      console.log(`Events for ${month} loaded successfully for user ${userId}`);
      return docSnap.data() as MonthMetadata;
    } else {
      console.log(`No events found for ${month} for user ${userId}`);
      return {};
    }
  } catch (error) {
    console.error(`Error loading events for ${month}:`, error);
    return {};
  }
};



export const addEventToDay = async (
  userId: string,
  date: Date,
  eventType: EventType
) => {
  const month = getMonthName(date);
  const day = getDayString(date);
  const monthDoc = doc(db, USERS_COLLECTION, `${userId}/${MONTHS_COLLECTION}/${month}`);
  try {
    await updateDoc(monthDoc, {
      [day]: { eventType },
    });
    console.log(`Event added/updated for ${day} in ${month} for user ${userId}`);
  } catch (error: any) {
    if (error.code === 'not-found') {
      // If the document doesn't exist, create it
      await setDoc(monthDoc, {
        [day]: { eventType },
      });
      console.log(`Document created and event added for ${day} in ${month} for user ${userId}`);
    } else {
      console.error(`Error adding/updating event for ${day} in ${month}:`, error);
    }
  }
};

export const removeEventFromDay = async (
  userId: string,
  date: Date
) => {
  const month = getMonthName(date);
  const day = getDayString(date);
  const monthDoc = doc(db, USERS_COLLECTION, `${userId}/${MONTHS_COLLECTION}/${month}`);
  try {
    const monthData = await loadMonthEvents(userId, month);
    if (monthData[day]) {
      delete monthData[day]; // Remove the specific day

      // Save the updated month data
      if (Object.keys(monthData).length > 0) {
        await saveMonthEvents(userId, month, monthData);
      } else {
        // If the month is empty, delete the document
        await deleteDoc(monthDoc);
      }
      console.log(`Event removed for ${day} in ${month} for user ${userId}`);
    } else {
      console.log(`No event found for ${day} in ${month} for user ${userId}`);
    }
  } catch (error) {
    console.error(`Error removing event for ${day} in ${month}:`, error);
  }
};