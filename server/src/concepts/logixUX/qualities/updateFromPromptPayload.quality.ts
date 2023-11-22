/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, generate a quality that updates a DPO DataSet's prompt property by index and set by event target value.
/*$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { promptID, selectTrainingDataIndex } from '../logixUX.model';

export const logixUXUpdateFromPromptPayloadType: ActionType = 'Create logixUX update DPO Dataset from prompt payload target';
export const logixUXUpdateFromPromptPayload =
  prepareActionCreator(logixUXUpdateFromPromptPayloadType);

function logixUXUpdateFromPromptPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  const index = selectTrainingDataIndex(target, promptID);
  const activeDPO = state.activeDPO;
  activeDPO[index].prompt = target.value;
  return {
    ...state,
    activeDPO,
  };
}

export const logixUXUpdateFromPromptPayloadQuality = createQuality(
  logixUXUpdateFromPromptPayloadType,
  logixUXUpdateFromPromptPayloadReducer,
  defaultMethodCreator
);
/*#>*/