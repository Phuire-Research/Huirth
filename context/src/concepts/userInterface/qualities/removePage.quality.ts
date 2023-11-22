/*<$
For the framework Stratimux and the User Interface Concept, generate a quality that will remove a page and page strategy creator from state based on the provided name in the payload.
$>*/
/*<#*/
import { Action, ActionType, createMethod, createQuality, prepareActionCreator, selectPayload, strategySuccess } from 'stratimux';
import { Page, PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceRemovePagePayload = {
  name: string;
};
export const userInterfaceRemovePageType: ActionType = 'User Interface Remove Page';
export const userInterfaceRemovePage = prepareActionCreator(userInterfaceRemovePageType);

const userInterfaceRemovePageMethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(action.strategy);
    } else {
      return action;
    }
  });

const userInterfaceRemovePageReducer = (state: UserInterfaceState, action: Action): UserInterfaceState => {
  const payload = selectPayload<UserInterfaceRemovePagePayload>(action);
  const { pageStrategies, pages } = state;
  const newPageStrategies: PageStrategyCreators[] = [];
  const newPages: Page[] = [];
  for (const [i, page] of pages.entries()) {
    if (page.title !== payload.name) {
      newPageStrategies.push(pageStrategies[i]);
      newPages.push(page);
    }
  }
  return {
    ...state,
    pageStrategies,
  };
};

export const userInterfaceRemovePageQuality = createQuality(
  userInterfaceRemovePageType,
  userInterfaceRemovePageReducer,
  userInterfaceRemovePageMethodCreator
);
/*#>*/
