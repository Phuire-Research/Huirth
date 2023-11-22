/*<$
For the framework Stratimux and the User Interface Concept, generate a quality that will update a specific page and composition based on the incoming payload. And set by the data field supplied by the strategy.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceAtomicUpdatePageCompositionPayload = {
  bound: BoundSelectors;
};
export const userInterfaceAtomicUpdatePageCompositionType: ActionType = 'User Interface atomic update composition to State';
export const userInterfaceAtomicUpdatePageComposition = prepareActionWithPayloadCreator<UserInterfaceAtomicUpdatePageCompositionPayload>(
  userInterfaceAtomicUpdatePageCompositionType
);

function userInterfaceAtomicUpdatePageCompositionReducer(state: UserInterfaceState, action: Action): UserInterfaceState {
  const payload = selectPayload<UserInterfaceAtomicUpdatePageCompositionPayload>(action);
  if (action.strategy) {
    const pageData = userInterface_selectPage(action.strategy);
    const composition = pageData.compositions.filter((comp) => comp.id === payload.bound.id)[0];
    const newPages = state.pages;
    newPages[payload.bound.semaphore[0]].compositions[payload.bound.semaphore[1]] = composition;
    return {
      ...state,
      pages: newPages,
    };
  }
  return {
    ...state,
  };
}

export const userInterfaceAtomicUpdatePageCompositionQuality = createQuality(
  userInterfaceAtomicUpdatePageCompositionType,
  userInterfaceAtomicUpdatePageCompositionReducer,
  defaultMethodCreator
);
/*#>*/
