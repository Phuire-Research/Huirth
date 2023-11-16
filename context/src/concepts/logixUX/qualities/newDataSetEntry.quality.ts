import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDefaultNamedDataSet } from '../logixUX.model';

export const logixUXNewDataSetEntryType: ActionType = 'Create logixUX NewDataSetEntry';
export const logixUXNewDataSetEntry = prepareActionCreator(logixUXNewDataSetEntryType);

function logixUXNewDataSetEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const trainingData = [...state.trainingData];
  trainingData.push(generateDefaultNamedDataSet('newDataSet' + trainingData.length));
  return {
    ...state,
    trainingData,
  };
}

export const logixUXNewDataSetEntryQuality = createQuality(logixUXNewDataSetEntryType, logixUXNewDataSetEntryReducer, defaultMethodCreator);
