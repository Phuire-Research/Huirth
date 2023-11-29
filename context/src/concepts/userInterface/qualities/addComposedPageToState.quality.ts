/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will add a page and its compositions to the state, while update the cached selectors to enable atomic operations.
$>*/
/*<#*/
import { Action, ActionType, createMethod, createQuality, prepareActionCreator, strategySuccess } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const userInterfaceAddComposedPageToStateType: ActionType = 'User Interface add composed Page to State';
export const userInterfaceAddComposedPageToState = prepareActionCreator(userInterfaceAddComposedPageToStateType);

const addComposedPageMethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      const { strategy } = action;
      return strategySuccess(strategy);
    } else {
      return action;
    }
  });

function addComposedPageToState(state: UserInterfaceState, action: Action): UserInterfaceState {
  if (action.strategy) {
    const page = userInterface_selectPage(action.strategy);
    const newPages = state.pages.filter((_page) => {
      return page.title !== _page.title;
    });
    newPages.push(page);
    for (const [i, p] of newPages.entries()) {
      const cachedSelectors: BoundSelectors[] = [];
      for (const [compIndex, comp] of p.compositions.entries()) {
        if (comp.boundSelectors) {
          for (const bound of comp.boundSelectors) {
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
      pagesCached: true,
    };
  }
  return {
    ...state,
  };
}

export const userInterfaceAddComposedPageToStateQuality = createQuality(
  userInterfaceAddComposedPageToStateType,
  addComposedPageToState,
  addComposedPageMethodCreator
);
/*#>*/
