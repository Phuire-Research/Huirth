/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add new default DPO Training Data Entry to huirth's state.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { generateDPOTrainingData } from '../huirth.model';

export const huirthNewDPOEntry = createQualityCard<huirthState>({
  type: 'Create huirth NewDPOEntry',
  reducer: (state) => {
    const activeDPO = [...state.activeDPO];
    activeDPO.push(generateDPOTrainingData());
    return {
      activeDPO,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
