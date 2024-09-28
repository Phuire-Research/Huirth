/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DPO DataSet's chosen property by index and set by event target value.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { chosenID, selectTrainingDataIndex } from '../huirth.model';

export const huirthUpdateFromChosenPayload = createQualityCard<huirthState>({
  type: 'Create huirth update DPO Dataset from chosen payload target',
  reducer: (state, action) => {
    const target = userInterface_selectInputTarget(action);
    if (target) {
      const index = selectTrainingDataIndex(target, chosenID);
      const activeDPO = state.activeDPO;
      activeDPO[index].chosen = target.value;
      return {
        activeDPO,
      };
    }
    return {
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
