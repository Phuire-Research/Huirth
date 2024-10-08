/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DPO DataSet's prompt property by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { promptID, selectTrainingDataIndex } from '../huirth.model';

export const huirthUpdateFromPromptPayload = createQualityCard<huirthState>({
  type: 'Create huirth update DPO Dataset from prompt payload target',
  reducer: (state, action) => {
    const target = userInterface_selectInputTarget(action);
    const index = selectTrainingDataIndex(target, promptID);
    const activeDPO = state.activeDPO;
    activeDPO[index].prompt = target.value;
    return {
      activeDPO,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
