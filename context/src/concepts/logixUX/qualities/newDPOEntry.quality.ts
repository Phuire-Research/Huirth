import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDPOTrainingData, generateDefaultTrainingData } from '../logixUX.model';

export const logixUXNewDPOEntryType: ActionType = 'Create logixUX NewDPOEntry';
export const logixUXNewDPOEntry = prepareActionCreator(logixUXNewDPOEntryType);

function logixUXNewDPOEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const activeDPO = [...state.activeDPO];
  activeDPO.push(generateDPOTrainingData());
  return {
    ...state,
    activeDPO,
  };
}

export const logixUXNewDPOEntryQuality = createQuality(logixUXNewDPOEntryType, logixUXNewDPOEntryReducer, defaultMethodCreator);
