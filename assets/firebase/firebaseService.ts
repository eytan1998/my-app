import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/assets/firebase/firebaseConfig';
import { MonthMetadata, UserData } from '@/assets/Models/UserData';
import { EventType } from '../Models/Events/Events';
import { log, LogLevel } from '@/app/utils/Logger';

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
    log(LogLevel.INFO, `User data saved for user ${userId}`, 'firebaseService.ts');
  } catch (error) {
    log(LogLevel.ERROR, `Error saving user data for user ${userId}: ${error}`, 'firebaseService.ts');
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, USERS_COLLECTION, userId);
  try {
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      log(LogLevel.INFO, `User data retrieved for user ${userId}`, 'firebaseService.ts');
      const data = docSnap.data();
      return new UserData(data.months || {});
    } else {
      log(LogLevel.INFO, `No user data found for user ${userId}`, 'firebaseService.ts');
      return null;
    }
  } catch (error) {
    log(LogLevel.ERROR, `Error retrieving user data for user ${userId}: ${error}`, 'firebaseService.ts');
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
    log(LogLevel.INFO, `Events for ${month} saved successfully for user ${userId}`, 'firebaseService.ts');
  } catch (error) {
    log(LogLevel.ERROR, `Error saving events for ${month}: ${error}`, 'firebaseService.ts');
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
      log(LogLevel.INFO, `Events for ${month} loaded successfully for user ${userId}`, 'firebaseService.ts');
      return docSnap.data() as MonthMetadata;
    } else {
      log(LogLevel.INFO, `No events found for ${month} for user ${userId}`, 'firebaseService.ts');
      return {};
    }
  } catch (error) {
    log(LogLevel.ERROR, `Error loading events for ${month}: ${error}`, 'firebaseService.ts');
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
    log(LogLevel.INFO, `Event added/updated for ${day} in ${month} for user ${userId}`, 'firebaseService.ts');
  } catch (error: any) {
    if (error.code === 'not-found') {
      // If the document doesn't exist, create it
      await setDoc(monthDoc, {
        [day]: { eventType },
      });
      log(LogLevel.INFO, `Document created and event added for ${day} in ${month} for user ${userId}`, 'firebaseService.ts');
    } else {
      log(LogLevel.ERROR, `Error adding/updating event for ${day} in ${month}: ${error}`, 'firebaseService.ts');
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
      log(LogLevel.INFO, `Event removed for ${day} in ${month} for user ${userId}`, 'firebaseService.ts');
    } else {
      log(LogLevel.INFO, `No event found for ${day} in ${month} for user ${userId}`, 'firebaseService.ts');
    }
  } catch (error) {
    log(LogLevel.ERROR, `Error removing event for ${day} in ${month}: ${error}`, 'firebaseService.ts');
  }
};