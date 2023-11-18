import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type LogixUXUpdateDataSetContentsPayload = {
  index: number;
  dataSetIndex: number;
};
export const logixUXUpdateDataSetContentsType: ActionType = 'Create logixUX UpdateDataSetContents';
export const logixUXUpdateDataSetContents =
  prepareActionWithPayloadCreator<LogixUXUpdateDataSetContentsPayload>(logixUXUpdateDataSetContentsType);

function logixUXUpdateDataSetContentsReducer(state: LogixUXState, action: Action): LogixUXState {
  const payload = selectPayload<LogixUXUpdateDataSetContentsPayload>(action);
  const target = userInterface_selectInputTarget(action);
  const trainingData = [...state.trainingData];
  const named = trainingData[payload.index];
  if (named && target) {
    named.dataSet[payload.dataSetIndex].content = target.value;
  }
  return {
    ...state,
    trainingData,
  };
}

export const logixUXUpdateDataSetContentsQuality = createQuality(
  logixUXUpdateDataSetContentsType,
  logixUXUpdateDataSetContentsReducer,
  defaultMethodCreator
);
