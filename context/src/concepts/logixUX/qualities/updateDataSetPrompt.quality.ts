/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DataSet's prompt by index and set by event target value.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type LogixUXUpdateDataSetPromptPayload = {
  index: number;
  dataSetIndex: number;
};
export const logixUXUpdateDataSetPromptType: ActionType = 'Create logixUX UpdateDataSetPrompt';
export const logixUXUpdateDataSetPrompt =
  prepareActionWithPayloadCreator<LogixUXUpdateDataSetPromptPayload>(logixUXUpdateDataSetPromptType);

function logixUXUpdateDataSetPromptReducer(state: LogixUXState, action: Action): LogixUXState {
  const payload = selectPayload<LogixUXUpdateDataSetPromptPayload>(action);
  const target = userInterface_selectInputTarget(action);
  const trainingData = [...state.trainingData];
  const named = trainingData[payload.index];
  if (named && target) {
    named.dataSet[payload.dataSetIndex].prompt = target.value;
  }
  return {
    ...state,
    trainingData,
  };
}

export const logixUXUpdateDataSetPromptQuality = createQuality(
  logixUXUpdateDataSetPromptType,
  logixUXUpdateDataSetPromptReducer,
  defaultMethodCreator
);
/*#>*/
