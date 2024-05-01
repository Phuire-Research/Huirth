/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add new default DPO Training Data Entry to huirth's state.
$>*/
/*<#*/
import { createQualitySet, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { generateDPOTrainingData } from '../huirth.model';

export const [huirthNewDPOEntry, huirthNewDPOEntryType, huirthNewDPOEntryQuality] = createQualitySet({
  type: 'Create huirth NewDPOEntry',
  reducer: (state: huirthState): huirthState => {
    const activeDPO = [...state.activeDPO];
    activeDPO.push(generateDPOTrainingData());
    return {
      ...state,
      activeDPO,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
