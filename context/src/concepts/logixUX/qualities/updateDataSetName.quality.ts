/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that updates a DataSet's name by index and set by event target value.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type LogixUXUpdateDataSetNamePayload = {
  index: number;
};
export const logixUXUpdateDataSetNameType: ActionType = 'Create logixUX UpdateDataSetName';
export const logixUXUpdateDataSetName = prepareActionWithPayloadCreator(logixUXUpdateDataSetNameType);

function logixUXUpdateDataSetNameReducer(state: LogixUXState, action: Action): LogixUXState {
  const payload = selectPayload<LogixUXUpdateDataSetNamePayload>(action);
  const target = userInterface_selectInputTarget(action);
  const trainingData = [...state.trainingData];
  const dataSet = trainingData[payload.index];
  if (dataSet && target) {
    dataSet.name = target.value;
  }
  return {
    ...state,
    trainingData,
  };
}

export const logixUXUpdateDataSetNameQuality = createQuality(
  logixUXUpdateDataSetNameType,
  logixUXUpdateDataSetNameReducer,
  defaultMethodCreator
);
/*#>*/
