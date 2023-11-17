import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const userInterfaceAddComposedPageToStateType: ActionType = 'User Interface add composed Page to State';
export const userInterfaceAddComposedPageToState = prepareActionCreator(userInterfaceAddComposedPageToStateType);

function addComposedPageToState(state: UserInterfaceState, action: Action): UserInterfaceState {
  console.log('HITTING COMPOSED PAGE TO STATE');
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
    // console.log('CHECK ADD COMPOSED PAGE TO STATE', newPages, page);
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
  defaultMethodCreator
);
