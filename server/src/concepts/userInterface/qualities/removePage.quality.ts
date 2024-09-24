/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will remove a page and page strategy creator from state based on the provided name in the payload.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { BoundSelectors, Page, PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceRemovePagePayload = {
  name: string;
};

export const userInterfaceRemovePage =
  createQualityCardWithPayload<UserInterfaceState, UserInterfaceRemovePagePayload>({
    type: 'User Interface Remove Page',
    reducer: (state, action) => {
      const payload = selectPayload<UserInterfaceRemovePagePayload>(action);
      const { pageStrategies, pages } = state;
      const newPageStrategies: PageStrategyCreators[] = [];
      const newPages: Page[] = [];
      for (const [i, page] of pages.entries()) {
        if (page.title !== payload.name) {
          const cachedSelectors: BoundSelectors[] = [];
          for (const [compIndex, comp] of page.compositions.entries()) {
            if (comp.boundSelectors) {
              for (const bound of comp.boundSelectors) {
                cachedSelectors.push({
                  ...bound,
                  semaphore: [i, compIndex],
                });
              }
            }
          }
          page.cachedSelectors = cachedSelectors;
          newPageStrategies.push(pageStrategies[i]);
          newPages.push(page);
        }
      }
      return {
        pages: newPages,
        pageStrategies: newPageStrategies,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
