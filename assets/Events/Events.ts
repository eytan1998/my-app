import { Translations } from '../../assets/translations';

// Enum for all possible events
export enum EventType {
  FIRST_DAY_OF_VESET_IN_DAY = 'FIRST_DAY_OF_VESET_IN_DAY',
  FIRST_DAY_OF_VESET_IN_NIGHT = 'FIRST_DAY_OF_VESET_IN_NIGHT',
  STAIN = 'STAIN',
  VESET = 'VESET',
  VESET_TO_STAIN = 'VESET_TO_STAIN',
  VESET_TO_CLEAN = 'VESET_TO_CLEAN',
  CLEAN = 'CLEAN',
  MIKVE = 'MIKVE',
  STAIN_TO_CLEAN = 'STAIN_TO_CLEAN',
}

// Interface for event metadata
interface EventMetadata {
  icon: string; // Path to the icon or icon name
}

// Events class to manage event metadata
export class Events {
  // Map of events to their metadata
  private static eventDetails: Record<EventType, EventMetadata> = {
    [EventType.FIRST_DAY_OF_VESET_IN_DAY]: {
      icon: '/assets/Events/veset_day.png',
    },
    [EventType.FIRST_DAY_OF_VESET_IN_NIGHT]: {
      icon: '/assets/Events/veset_night.png',
    },
    [EventType.STAIN]: {
      icon: '/assets/Events/stain.png',
    },
    [EventType.VESET]: {
      icon: '/assets/Events/veset.png',
    },
    [EventType.VESET_TO_STAIN]: {
      icon: '/assets/Events/veset_to_stain.png',
    },
    [EventType.VESET_TO_CLEAN]: {
      icon: '/assets/Events/veset_to_clean.png',
    },
    [EventType.CLEAN]: {
      icon: '/assets/Events/clean.png',
    },
    [EventType.MIKVE]: {
      icon: '/assets/Events/mikve.png',
    },
    [EventType.STAIN_TO_CLEAN]: {
      icon: '/assets/Events/stain_to_clean.png',
    },
  };

  // Get metadata for a specific event
  static getEventDetails(eventType: EventType): EventMetadata {
    return this.eventDetails[eventType];
  }

  // Get all events and their metadata
  static getAllEvents(): Record<EventType, EventMetadata> {
    return this.eventDetails;
  }
}