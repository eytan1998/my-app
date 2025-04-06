import { Translations } from '@/assets/translations';

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
  actions: Action[]; // Possible actions for the event
}
// Enum for possible actions
export enum Action {
  ADD_DAY_VESET = 'ADD_DAY_VESET',
  ADD_NIGHT_VESET = 'ADD_NIGHT_VESET',
  ADD_STAIN = 'ADD_STAIN',
  DELETE = 'DELETE',
  HAPSEK_TAHOR_VEST = 'HAPSEK_TAHOR_VEST',
  HAPSEK_TAHOR_STAIN = 'HAPSEK_TAHOR_STAIN',
  HAPSEK_TAMEI_VEST = 'HAPSEK_TAMEI_VEST',
  HAPSEK_TAMEI_STAIN = 'HAPSEK_TAMEI_STAIN',
  ADD_MORE_VESET = 'ADD_MORE_VESET',
}
// Default event metadata for days without events
const DEFAULT_EVENT_METADATA: EventMetadata = {
  icon: '',
  actions: [Action.ADD_DAY_VESET, Action.ADD_NIGHT_VESET, Action.ADD_STAIN],
};
// Events class to manage event metadata
export class Events {
  // Map of events to their metadata
  private static eventDetails: Record<EventType, EventMetadata> = {
    [EventType.FIRST_DAY_OF_VESET_IN_DAY]: {
      icon: require('@/assets/images/veset_day.png'),
      actions: [Action.DELETE],
    },
    [EventType.FIRST_DAY_OF_VESET_IN_NIGHT]: {
      icon: require('@/assets/images/veset_night.png'),
      actions: [Action.DELETE],
    },
    [EventType.STAIN]: {
      icon: require('@/assets/images/stain.png'),
      actions: [Action.DELETE, Action.HAPSEK_TAHOR_STAIN, Action.HAPSEK_TAMEI_STAIN],
    },
    [EventType.VESET]: {
      icon: require('@/assets/images/veset.png'),
      actions: [Action.HAPSEK_TAHOR_VEST],
    },
    [EventType.VESET_TO_STAIN]: {
      icon: require('@/assets/images/veset_to_stain.png'),
      actions: [Action.DELETE],
    },
    [EventType.VESET_TO_CLEAN]: {
      icon: require('@/assets/images/veset_to_clean.png'),
      actions: [Action.DELETE],
    },
    [EventType.CLEAN]: {
      icon: require('@/assets/images/clean.png'),
      actions: [Action.DELETE, Action.ADD_DAY_VESET, Action.ADD_NIGHT_VESET, Action.ADD_STAIN],
    },
    [EventType.MIKVE]: {
      icon: require('@/assets/images/mikve.png'),
      actions: [Action.DELETE, Action.ADD_DAY_VESET, Action.ADD_NIGHT_VESET, Action.ADD_STAIN],
    },
    [EventType.STAIN_TO_CLEAN]: {
      icon: require('@/assets/images/stain_to_clean.png'),
      actions: [Action.DELETE],
    },
  };

  // Get actions for a specific event
  static getActionsForEvent(eventType: EventType): Action[] {
    const eventMetadata = this.eventDetails[eventType];
    return eventMetadata ? eventMetadata.actions : [];
  }
  // Get icon for a specific event
  static getIconForEvent(eventType: EventType): any {
    return this.eventDetails[eventType]?.icon;
}
}