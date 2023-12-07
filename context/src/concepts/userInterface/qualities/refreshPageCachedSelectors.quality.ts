/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will refresh the current cached bound selectors and the associated semaphores to enable safe atomic operations.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { BoundSelectors } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const userInterfaceRefreshCachedSelectorsType: ActionType = 'User Interface refresh cached selectors';
export const userInterfaceRefreshCachedSelectors = prepareActionCreator(userInterfaceRefreshCachedSelectorsType);

function userInterfaceRefreshCachedSelectorsReducer(state: UserInterfaceState, action: Action): UserInterfaceState {
  if (action.strategy) {
    const newPages = { ...state.pages };
    for (const [i, p] of newPages.entries()) {
      const cachedSelectors: BoundSelectors[] = [];
      for (const [compIndex, comp] of p.compositions.entries()) {
        for (const bound of comp.boundSelectors) {
          if (!comp.universal) {
            cachedSelectors.push({
              ...bound,
              semaphore: [i, compIndex],
            });
          }
        }
      }
      p.cachedSelectors = cachedSelectors;
    }
    return {
      ...state,
      pages: newPages,
    };
  }
  return {
    ...state,
  };
}

export const userInterfaceRefreshCachedSelectorsQuality = createQuality(
  userInterfaceRefreshCachedSelectorsType,
  userInterfaceRefreshCachedSelectorsReducer,
  defaultMethodCreator
);
/*#>*/
