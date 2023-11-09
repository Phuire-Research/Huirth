import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceAtomicUpdatePageCompositionPayload = {
  bound: BoundSelectors
}
export const userInterfaceAtomicUpdatePageCompositionType: ActionType =
  'User Interface add composed Page to State';
export const userInterfaceAtomicUpdatePageComposition =
  prepareActionWithPayloadCreator<UserInterfaceAtomicUpdatePageCompositionPayload>(userInterfaceAtomicUpdatePageCompositionType);

function userInterfaceAtomicUpdatePageCompositionReducer(state: UserInterfaceState, action: Action): UserInterfaceState {
  const payload = selectPayload<UserInterfaceAtomicUpdatePageCompositionPayload>(action);
  if (action.strategy) {
    const pageData = userInterface_selectPage(action.strategy);
    const composition = pageData.compositions[0];
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
  defaultMethodCreator,
);
