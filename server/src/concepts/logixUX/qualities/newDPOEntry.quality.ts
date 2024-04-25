/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will add new default DPO Training Data Entry to logixUX's state.
$>*/
/*<#*/
import {
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDPOTrainingData } from '../logixUX.model';

export const [
  logixUXNewDPOEntry,
  logixUXNewDPOEntryType,
  logixUXNewDPOEntryQuality
] = createQualitySet({
  type: 'Create logixUX NewDPOEntry',
  reducer: (state: LogixUXState): LogixUXState => {
    const activeDPO = [...state.activeDPO];
    activeDPO.push(generateDPOTrainingData());
    return {
      ...state,
      activeDPO,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/