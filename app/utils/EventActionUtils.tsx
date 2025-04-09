import DateUtils from '@/app/utils/DateUtils';
import { addEventToDay, removeEventFromDay } from '@/assets/firebase/firebaseService';
import { Action, EventType } from '@/assets/Models/Events/Events';
/**
 * Handles an action for a given date by invoking the corresponding function.
 * @param date The date to process.
 * @param action The action to perform.
 */
export const handleAction = (userId: string, date: DateUtils, action: Action) => {
    const actionHandlers: Record<Action, (userId: string, date: DateUtils) => void> = {
        [Action.ADD_DAY_VESET]: handleAddDayVeset,
        [Action.ADD_NIGHT_VESET]: handleAddNightVeset,
        [Action.ADD_STAIN]: handleAddStain,
        [Action.DELETE]: handleDelete,
        [Action.HAPSEK_TAHOR_VEST]: handleHapsekTahorVest,
        [Action.HAPSEK_TAHOR_STAIN]: handleHapsekTahorStain,
        [Action.HAPSEK_TAMEI_VEST]: handleHapsekTameiVest,
        [Action.HAPSEK_TAMEI_STAIN]: handleHapsekTameiStain,
        [Action.ADD_MORE_VESET]: handleAddMoreVeset,
    };

    const handler = actionHandlers[action];
    if (handler) {
        handler(userId, date);
    } else {
        console.error(`No handler found for action: ${action}`);
    }
};

/**
 * Handles adding a day veset.
 * @param date The date to process.
 */
const handleAddDayVeset = (userId: string, date: DateUtils) => {
    console.log('Handling ADD_DAY_VESET for user:', userId, 'date:', date);
    addEventToDay(userId, date.currentDate, EventType.FIRST_DAY_OF_VESET_IN_DAY);
};

/**
 * Handles adding a night veset.
 * @param date The date to process.
 */
const handleAddNightVeset = (userId: string, date: DateUtils) => {
    console.log('Handling ADD_NIGHT_VESET for user:', userId, 'date:', date);
    addEventToDay(userId, date.currentDate, EventType.FIRST_DAY_OF_VESET_IN_NIGHT);
};

/**
 * Handles adding a stain.
 * @param date The date to process.
 */
const handleAddStain = (userId: string, date: DateUtils) => {
    console.log('Handling ADD_STAIN for user:', userId, 'date:', date);
    addEventToDay(userId, date.currentDate, EventType.STAIN);
};

/**
 * Handles deleting an event.
 * @param date The date to process.
 */
const handleDelete = (userId: string, date: DateUtils) => {
    console.log('Handling DELETE for user:', userId, 'date:', date);
    removeEventFromDay(userId, date.currentDate);
};

/**
 * Handles Hapsek Tahor for a vest.
 * @param date The date to process.
 */
const handleHapsekTahorVest = (userId: string, date: DateUtils) => {
    console.log('Handling HAPSEK_TAHOR_VEST for user:', userId, 'date:', date);
    addEventToDay(userId, date.currentDate, EventType.VESET_TO_CLEAN);
};

/**
 * Handles Hapsek Tahor for a stain.
 * @param date The date to process.
 */
const handleHapsekTahorStain = (userId: string, date: DateUtils) => {
    console.log('Handling HAPSEK_TAHOR_STAIN for user:', userId, 'date:', date);
    addEventToDay(userId, date.currentDate, EventType.STAIN_TO_CLEAN);
};

/**
 * Handles Hapsek Tamei for a vest.
 * @param date The date to process.
 */
const handleHapsekTameiVest = (userId: string, date: DateUtils) => {
    console.log('Handling HAPSEK_TAMEI_VEST for user:', userId, 'date:', date);
    // addEventToDay(userId, date.currentDate, EventType.);
};

/**
 * Handles Hapsek Tamei for a stain.
 * @param date The date to process.
 */
const handleHapsekTameiStain = (userId: string, date: DateUtils) => {
    console.log('Handling HAPSEK_TAMEI_STAIN for user:', userId, 'date:', date);
    // addEventToDay(userId, date.currentDate, EventType.HAPSEK_TAMEI_STAIN);
};

/**
 * Handles adding more veset.
 * @param date The date to process.
 */
const handleAddMoreVeset = (userId: string, date: DateUtils) => {
    console.log('Handling ADD_MORE_VESET for user:', userId, 'date:', date);
    // addEventToDay(userId, date.currentDate, EventType.MORE_VESET);
};

// Export all handlers and the main function as a default export
export default {
    handleAction,
};