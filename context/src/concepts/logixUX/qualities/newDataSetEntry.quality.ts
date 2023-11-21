import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateBaseDataSetEntry } from '../logixUX.model';

export type LogixUXNewDataSetEntryPayload = {
  index: number;
};
export const logixUXNewDataSetEntryType: ActionType = 'Create logixUX NewDataSetEntry';
export const logixUXNewDataSetEntry = prepareActionWithPayloadCreator<LogixUXNewDataSetEntryPayload>(logixUXNewDataSetEntryType);

function logixUXNewDataSetEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const payload = selectPayload<LogixUXNewDataSetEntryPayload>(action);
  const trainingData = [...state.trainingData];
  console.log('CHECK TRAINING DATA INDEX', trainingData, payload);
  trainingData[payload.index].dataSet.push(generateBaseDataSetEntry());
  return {
    ...state,
    trainingData,
  };
}

export const logixUXNewDataSetEntryQuality = createQuality(logixUXNewDataSetEntryType, logixUXNewDataSetEntryReducer, defaultMethodCreator);
