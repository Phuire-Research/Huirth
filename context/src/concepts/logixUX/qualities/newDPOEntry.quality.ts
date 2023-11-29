/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will add new default DPO Training Data Entry to logixUX's state.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDPOTrainingData } from '../logixUX.model';

export const logixUXNewDPOEntryType: ActionType = 'Create logixUX NewDPOEntry';
export const logixUXNewDPOEntry =
  prepareActionCreator(logixUXNewDPOEntryType);

function logixUXNewDPOEntryReducer(state: LogixUXState, action: Action): LogixUXState {
  const activeDPO = [...state.activeDPO];
  activeDPO.push(generateDPOTrainingData());
  return {
    ...state,
    activeDPO,
  };
}

export const logixUXNewDPOEntryQuality = createQuality(
  logixUXNewDPOEntryType,
  logixUXNewDPOEntryReducer,
  defaultMethodCreator
);
/*#>*/