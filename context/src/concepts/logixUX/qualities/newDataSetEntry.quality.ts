import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDefaultTrainingData } from '../logixUX.model';

export const logixUXNewDataSetEntryType: ActionType = 'Create logixUX NewDataSetEntry';
export const logixUXNewDataSetEntry =
  prepareActionCreator(logixUXNewDataSetEntryType);

function logixUXNewDataSetEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const trainingData = [...state.trainingData];
  trainingData.push(generateDefaultTrainingData());
  return {
    ...state,
    trainingData,
  };
}

export const logixUXNewDataSetEntryQuality = createQuality(
  logixUXNewDataSetEntryType,
  logixUXNewDataSetEntryReducer,
  defaultMethodCreator
);