import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDPOTrainingData, generateDefaultTrainingData } from '../logixUX.model';

export const logixUXNewDataSetEntryType: ActionType = 'Create logixUX NewDataSetEntry';
export const logixUXNewDataSetEntry = prepareActionCreator(logixUXNewDataSetEntryType);

function logixUXNewDataSetEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const activeDPO = [...state.activeDPO];
  activeDPO.push(generateDPOTrainingData());
  return {
    ...state,
    activeDPO,
  };
}

export const logixUXNewDataSetEntryQuality = createQuality(logixUXNewDataSetEntryType, logixUXNewDataSetEntryReducer, defaultMethodCreator);
