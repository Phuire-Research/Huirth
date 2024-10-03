/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will update a specified universal component based on the incoming bound selector.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceUpdateUniversalComponentPayload = {
  bound: BoundSelectors;
};

export const userInterfaceUpdateUniversalComponent = createQualityCardWithPayload<
  UserInterfaceState,
  UserInterfaceUpdateUniversalComponentPayload
>({
  type: 'User Interface update universal component',
  reducer: (state, action) => {
    const { payload } = action;
    if (action.strategy) {
      const pageData = userInterface_selectPage(action.strategy);
      const composition = pageData.compositions.filter((comp) => comp.id === payload.bound.id)[0];
      const newComponents = [...state.components];
      const newPages = [...state.pages];
      composition.componentSemaphore = payload.bound.semaphore[1];
      composition.boundSelectors.forEach((bound) => {
        bound.semaphore = payload.bound.semaphore;
      });
      newComponents[payload.bound.semaphore[1]] = composition;
      newPages.forEach((page) =>
        page.compositions.forEach((comp, i) => {
          if (comp.action.type === composition.action.type && comp.universal) {
            page.compositions[i] = composition;
          }
        })
      );
      return {
        ...state,
        components: newComponents,
        pages: newPages,
      };
    }
    return {
      ...state,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
