import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDefaultNamedDataSet } from '../logixUX.model';

export const logixUXNewDataSetType: ActionType = 'Create logixUX NewDataSet';
export const logixUXNewDataSet = prepareActionCreator(logixUXNewDataSetType);

function logixUXNewDataSetReducer(state: LogixUXState, action: Action): LogixUXState {
  const trainingData = [...state.trainingData];
  trainingData.push(generateDefaultNamedDataSet('newDataSet' + trainingData.length));
  return {
    ...state,
    trainingData,
  };
}

export const logixUXNewDataSetQuality = createQuality(logixUXNewDataSetType, logixUXNewDataSetReducer, defaultMethodCreator);
