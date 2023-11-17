import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { rejectedID, selectTrainingDataIndex } from '../logixUX.model';

export const logixUXUpdateFromRejectedPayloadType: ActionType = 'Create logixUX UpdateFromRejectedPayload';
export const logixUXUpdateFromRejectedPayload = prepareActionCreator(logixUXUpdateFromRejectedPayloadType);

function logixUXUpdateFromRejectedPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  console.log('CHECK TARGET', target);
  const index = selectTrainingDataIndex(target, rejectedID);
  const activeDPO = state.activeDPO;
  activeDPO[index].rejected = target.value;
  return {
    ...state,
    activeDPO,
  };
}

export const logixUXUpdateFromRejectedPayloadQuality = createQuality(
  logixUXUpdateFromRejectedPayloadType,
  logixUXUpdateFromRejectedPayloadReducer,
  defaultMethodCreator
);
