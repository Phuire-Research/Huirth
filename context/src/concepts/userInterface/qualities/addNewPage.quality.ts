import {
  Action,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createMethod,
  createMethodDebounce,
  createMethodWithConcepts,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
  strategySuccess,
} from 'stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';
import { userInterfacePageToStateStrategy } from '../strategies.ts/pageToState.strategy';

export type UserInterfaceAddNewPagePayload = {
  // name: string,
  pageStrategy: PageStrategyCreators;
};
export const userInterfaceAddNewPageType: ActionType = 'User Interface Add New Page';
export const userInterfaceAddNewPage = prepareActionWithPayloadCreator<UserInterfaceAddNewPagePayload>(userInterfaceAddNewPageType);

const userInterfaceAddNewPageMethodCreator: MethodCreator = (concepts$, semaphore) =>
  createMethodWithConcepts(
    (action, concepts) => {
      const payload = selectPayload<UserInterfaceAddNewPagePayload>(action);
      return strategyBegin(userInterfacePageToStateStrategy(payload.pageStrategy(concepts)));
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );

const userInterfaceAddNewPageStateReducer = (state: UserInterfaceState, action: Action): UserInterfaceState => {
  const payload = selectPayload<UserInterfaceAddNewPagePayload>(action);
  const { pageStrategies } = state;
  pageStrategies.push(payload.pageStrategy);
  return {
    ...state,
    pageStrategies,
  };
};

export const userInterfaceAddNewPageQuality = createQuality(
  userInterfaceAddNewPageType,
  userInterfaceAddNewPageStateReducer,
  userInterfaceAddNewPageMethodCreator
);
