/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will add a page and its compositions to the state, while update the cached selectors to enable atomic operations.
$>*/
/*<#*/
import {
  Action,
  KeyedSelector,
  createMethod,
  createQualitySet,
  strategySuccess,
} from 'stratimux';
import { BoundSelectors, Composition, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const [
  userInterfaceAddComposedPageToState,
  userInterfaceAddComposedPageToStateType,
  userInterfaceAddComposedPageToStateQuality
] = createQualitySet({
  type: 'User Interface add composed Page to State',
  reducer: (state: UserInterfaceState, action: Action): UserInterfaceState => {
    if (action.strategy) {
      const boundSelectors: Record<string, BoundSelectors[]> = {};
      const mapSelectors: Map<string, KeyedSelector> = new Map();
      const page = userInterface_selectPage(action.strategy);
      console.log('CHECK PAGE COUNT', state.pages.length);
      const newComponents = [...state.components];
      const cachedComponentSelectors: BoundSelectors[] = [];
      const isUnique: Record<string, boolean> = {};
      const newPages = state.pages.filter(_page => {
        return page.title !== _page.title;
      });
      newPages.push(page);
      for (const [i, p] of newPages.entries()) {
        const cachedSelectors: BoundSelectors[] = [];
        for (const [compIndex, comp] of p.compositions.entries()) {
          if (!comp.universal) {
            for (const bound of comp.boundSelectors) {
              bound.semaphore = [i, compIndex];
              console.log('SET', bound.action, bound.semaphore);
              comp.boundSelectors.forEach(b => {
                b.selectors.forEach(s => {
                  if (boundSelectors[s.keys]) {
                    boundSelectors[s.keys].push(b);
                  } else {
                    mapSelectors.set(s.keys, s);
                    boundSelectors[s.keys] = [b];
                  }
                });
              });
              cachedSelectors.push(bound);
            }
          } else if (comp.universal) {
            let unique = true;
            let possibleSemaphore = -1;
            for (const [index, cmp] of state.components.entries()) {
              // eslint-disable-next-line max-depth
              // eslint-disable-next-line max-depth
              if (cmp.action.type === comp.action.type) {
                possibleSemaphore = index;
                break;
              }
            }
            console.log('CHECK UNIQUE', comp.action.type, unique, isUnique[comp.action.type]);
            if (isUnique[comp.action.type] === undefined) {
              isUnique[comp.action.type] = false;
              const setIndex = newComponents.length;
              comp.componentSemaphore = setIndex;
              comp.boundSelectors.forEach((bound) => {
                // -1 to throw error if this is ever improperly handled
                bound.semaphore = [-1, setIndex];
                cachedComponentSelectors.push(bound);
                bound.selectors.forEach(s => {
                  if (boundSelectors[s.keys]) {
                    boundSelectors[s.keys].push(bound);
                  } else {
                    boundSelectors[s.keys] = [bound];
                  }

                  mapSelectors.set(s.keys, s);
                });
              });
              const composition: Composition = {...comp};
              newComponents.push(composition);
            } else if (possibleSemaphore !== -1) {
              p.compositions[compIndex] = {
                ...state.components[possibleSemaphore]
              };
              p.compositions[compIndex].boundSelectors.forEach(bound => {
                cachedComponentSelectors.push(bound);
              });
            }
          }
        }
        p.cachedSelectors = cachedSelectors;
        p.cachedComponentSelectors = cachedComponentSelectors;
      }
      const selectors: KeyedSelector[] = [];
      mapSelectors.forEach((keyed) => {
        selectors.push(keyed);
      });
      return {
        ...state,
        pages: newPages,
        components: newComponents,
        pagesCached: true,
        boundSelectors,
        selectors
      };
    }
    return {
      ...state,
    };
  },
  methodCreator: () => createMethod(action => {
    if (action.strategy) {
      const {strategy} = action;
      return strategySuccess(strategy);
    } else {
      return action;
    }
  })
});
/*#>*/