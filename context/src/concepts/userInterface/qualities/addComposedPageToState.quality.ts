/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will add a page and its compositions to the state, while update the cached selectors to enable atomic operations.
$>*/
/*<#*/
import { Action, ActionType, createMethod, createQuality, prepareActionCreator, strategySuccess } from 'stratimux';
import { BoundSelectors, Composition, userInterface_selectPage } from '../../../model/userInterface';
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
    const newComponents = [...state.components];
    const cachedComponentSelectors: BoundSelectors[] = [];
    const isUnique: Record<string, boolean> = {};
    const newPages = state.pages.filter((_page) => {
      return page.title !== _page.title;
    });
    newPages.push(page);
    for (const [i, p] of newPages.entries()) {
      const cachedSelectors: BoundSelectors[] = [];
      for (const [compIndex, comp] of p.compositions.entries()) {
        if (comp.boundSelectors && !comp.universal) {
          for (const bound of comp.boundSelectors) {
            cachedSelectors.push({
              ...bound,
              semaphore: [i, compIndex],
            });
          }
        } else if (comp.boundSelectors && comp.universal) {
          let unique = true;
          let possibleSemaphore = -1;
          for (const [index, cmp] of state.components.entries()) {
            // eslint-disable-next-line max-depth
            // eslint-disable-next-line max-depth
            if (cmp.action.type === comp.action.type) {
              unique = false;
              possibleSemaphore = index;
            }
          }
          if (unique && isUnique[comp.action.type] === undefined) {
            isUnique[comp.action.type] = false;
            const setIndex = newComponents.length;
            comp.componentSemaphore = setIndex;
            // eslint-disable-next-line max-depth
            if (comp.boundSelectors) {
              comp.boundSelectors.forEach((bound) => {
                // -1 to throw error if this is ever improperly handled
                bound.semaphore = [-1, setIndex];
                cachedComponentSelectors.push(bound);
              });
            }
            const composition: Composition = { ...comp };
            newComponents.push(composition);
          } else {
            p.compositions[compIndex] = {
              ...state.components[possibleSemaphore],
            };
            p.compositions[compIndex].boundSelectors.forEach((bound) => {
              cachedComponentSelectors.push(bound);
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
      components: newComponents,
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
