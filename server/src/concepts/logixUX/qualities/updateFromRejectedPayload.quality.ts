import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { rejectedID, selectTrainingDataIndex } from '../logixUX.model';

export const logixUXUpdateFromRejectedPayloadType: ActionType = 'Create logixUX UpdateFromRejectedPayload';
export const logixUXUpdateFromRejectedPayload =
  prepareActionCreator(logixUXUpdateFromRejectedPayloadType);

function logixUXUpdateFromRejectedPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  console.log('CHECK VALUE', selectTrainingDataIndex(target, rejectedID));
  return {
    ...state
  };
}

export const logixUXUpdateFromRejectedPayloadQuality = createQuality(
  logixUXUpdateFromRejectedPayloadType,
  logixUXUpdateFromRejectedPayloadReducer,
  defaultMethodCreator
);