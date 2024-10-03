/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will update a specific page and composition based on the incoming payload. And set by the data field supplied by the strategy.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceUpdateAtomicPageCompositionPayload = {
  bound: BoundSelectors;
};

export const userInterfaceUpdateAtomicPageComposition = createQualityCardWithPayload<
  UserInterfaceState,
  UserInterfaceUpdateAtomicPageCompositionPayload
>({
  type: 'User Interface atomic update composition to State',
  reducer: (state, action) => {
    const payload = selectPayload<UserInterfaceUpdateAtomicPageCompositionPayload>(action);
    if (action.strategy) {
      const pageData = userInterface_selectPage(action.strategy);
      const composition = pageData.compositions.filter((comp) => comp.id === payload.bound.id)[0];
      const newPages = [...state.pages];
      const target = newPages[payload.bound.semaphore[0]];
      if (target) {
        target.compositions[payload.bound.semaphore[1]] = composition;
      }
      return {
        pages: newPages,
      };
    }
    return {};
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
