import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { promptID, selectTrainingDataIndex } from '../logixUX.model';

export const logixUXUpdateFromPromptPayloadType: ActionType = 'Create logixUX UpdateFromPromptPayload';
export const logixUXUpdateFromPromptPayload = prepareActionCreator(logixUXUpdateFromPromptPayloadType);

function logixUXUpdateFromPromptPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  console.log('CHECK VALUE', selectTrainingDataIndex(target, promptID));
  return {
    ...state,
  };
}

export const logixUXUpdateFromPromptPayloadQuality = createQuality(
  logixUXUpdateFromPromptPayloadType,
  logixUXUpdateFromPromptPayloadReducer,
  defaultMethodCreator
);
