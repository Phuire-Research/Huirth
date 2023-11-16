import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { chosenID, selectTrainingDataIndex } from '../logixUX.model';

export const logixUXUpdateFromChosenPayloadType: ActionType = 'Create logixUX UpdateFromChosenPayload';
export const logixUXUpdateFromChosenPayload =
  prepareActionCreator(logixUXUpdateFromChosenPayloadType);

function logixUXUpdateFromChosenPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  if (target) {
    const index = selectTrainingDataIndex(target, chosenID);
    const activeDPO = state.activeDPO;
    activeDPO[index].chosen = target.value;
    return {
      ...state,
      activeDPO,
    };
  }
  return {
    ...state
  };
}

export const logixUXUpdateFromChosenPayloadQuality = createQuality(
  logixUXUpdateFromChosenPayloadType,
  logixUXUpdateFromChosenPayloadReducer,
  defaultMethodCreator
);