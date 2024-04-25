/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will refresh the current cached bound selectors and the associated semaphores to enable safe atomic operations.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { BoundSelectors } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const [
  userInterfaceRefreshCachedSelectors,
  userInterfaceRefreshCachedSelectorsType,
  userInterfaceRefreshCachedSelectorsQuality
] = createQualitySet({
  type: 'User Interface refresh cached selectors',
  reducer: (state: UserInterfaceState, action: Action): UserInterfaceState => {
    if (action.strategy) {
      const newPages = {...state.pages};
      for (const [i, p] of newPages.entries()) {
        const cachedSelectors: BoundSelectors[] = [];
        const cachedComponentSelectors: BoundSelectors[] = [];
        for (const [compIndex, comp] of p.compositions.entries()) {
          for (const bound of comp.boundSelectors) {
            if (!comp.universal) {
              cachedSelectors.push({
                ...bound,
                semaphore: [i, compIndex]
              });
            } else {
              state.components.forEach(c => {
                if (comp.action.type === c.action.type) {
                  comp.boundSelectors.forEach(b => {
                    cachedComponentSelectors.push(b);
                  });
                }
              });
            }
          }
        }
        p.cachedSelectors = cachedSelectors;
        p.cachedComponentSelectors = cachedComponentSelectors;
      }
      return {
        ...state,
        pages: newPages,
      };
    }
    return {
      ...state,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/