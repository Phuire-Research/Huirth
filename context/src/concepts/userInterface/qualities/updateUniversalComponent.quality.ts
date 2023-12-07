/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will update a specified universal component based on the incoming bound selector.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { BoundSelectors, userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceUpdateUniversalComponentPayload = {
  bound: BoundSelectors;
};
export const userInterfaceUpdateUniversalComponentType: ActionType = 'User Interface update universal component';
export const userInterfaceUpdateUniversalComponent = prepareActionWithPayloadCreator<UserInterfaceUpdateUniversalComponentPayload>(
  userInterfaceUpdateUniversalComponentType
);

function userInterfaceUpdateUniversalComponentReducer(state: UserInterfaceState, action: Action): UserInterfaceState {
  const payload = selectPayload<UserInterfaceUpdateUniversalComponentPayload>(action);
  if (action.strategy) {
    const pageData = userInterface_selectPage(action.strategy);
    const composition = pageData.compositions.filter((comp) => comp.id === payload.bound.id)[0];
    const newComponents = [...state.components];
    composition.componentSemaphore = payload.bound.semaphore[1];
    composition.boundSelectors.forEach((bound) => {
      bound.semaphore = payload.bound.semaphore;
    });
    newComponents[payload.bound.semaphore[1]] = composition;
    return {
      ...state,
      components: newComponents,
    };
  }
  return {
    ...state,
  };
}

export const userInterfaceUpdateUniversalComponentQuality = createQuality(
  userInterfaceUpdateUniversalComponentType,
  userInterfaceUpdateUniversalComponentReducer,
  defaultMethodCreator
);
/*#>*/
