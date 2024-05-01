/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DPO DataSet's rejected property by index and set by event target value.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { rejectedID, selectTrainingDataIndex } from '../huirth.model';

export const [
  huirthUpdateFromRejectedPayload,
  huirthUpdateFromRejectedPayloadType,
  huirthUpdateFromRejectedPayloadQuality
] = createQualitySet({
  type: 'Create huirth update DPO Dataset from rejected payload target',
  reducer: (state: huirthState, action: Action): huirthState => {
    const target = userInterface_selectInputTarget(action);
    console.log('CHECK TARGET', target);
    const index = selectTrainingDataIndex(target, rejectedID);
    const activeDPO = state.activeDPO;
    activeDPO[index].rejected = target.value;
    return {
      ...state,
      activeDPO,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/