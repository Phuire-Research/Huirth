import { ActionType, createMethodDebounce, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

export const userInterfaceDebouncePageCreationType: ActionType = 'User Interface Debounce Page Creation Strategies';
export const userInterfaceDebouncePageCreation = prepareActionCreator(userInterfaceDebouncePageCreationType);

const userInterfaceDebouncePageCreationMethodCreator = () =>
  createMethodDebounce((action) => {
    if (action.strategy) {
      return strategySuccess(action.strategy);
    } else {
      return action;
    }
  }, 100);

export const userInterfaceDebouncePageCreationQuality = createQuality(
  userInterfaceDebouncePageCreationType,
  defaultReducer,
  userInterfaceDebouncePageCreationMethodCreator
);
