import { ActionType, createQuality, defaultReducer, prepareActionCreator } from 'stratimux';

export const userInterfaceEndType: ActionType = 'User Interface End Strategy';
export const userInterfaceEnd = prepareActionCreator(userInterfaceEndType);

export const userInterfaceEndQuality = createQuality(userInterfaceEndType, defaultReducer);
