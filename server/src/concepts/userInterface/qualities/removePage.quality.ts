import {
  Action,
  ActionType,
  createMethod,
  createMethodDebounce,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';
import { Page, PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceRemovePagePayload = {
  name: string,
  // pageStrategy: PageStrategyCreators,
}
export const userInterfaceRemovePageType: ActionType =
  'User Interface Remove Page';
export const userInterfaceRemovePage = prepareActionCreator(userInterfaceRemovePageType);

const userInterfaceRemovePageMethodCreator = () => createMethod((action) => {
  if (action.strategy) {
    return strategySuccess(action.strategy);
  } else {
    return action;
  }
});

const userInterfaceRemovePageReducer = (state: UserInterfaceState, action: Action): UserInterfaceState => {
  const payload = selectPayload<UserInterfaceRemovePagePayload>(action);
  const {pageStrategies, pages} = state;
  const newPageStrategies: PageStrategyCreators[] = [];
  const newPages: Page[] = [];
  for (const [i, page] of pages.entries()) {
    if (page.title !== payload.name) {
      newPageStrategies.push(pageStrategies[i]);
      // Need to update semaphores
      newPages.push(page);
    }
  }
  // pageStrategies.push(payload.pageStrategy);
  return {
    ...state,
    pageStrategies
  };
};

export const userInterfaceRemovePageQuality = createQuality(
  userInterfaceRemovePageType,
  userInterfaceRemovePageReducer,
  userInterfaceRemovePageMethodCreator
);
