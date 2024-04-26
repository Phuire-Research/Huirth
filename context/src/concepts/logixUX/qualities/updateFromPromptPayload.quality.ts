/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DPO DataSet's prompt property by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualitySet, defaultMethodCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { promptID, selectTrainingDataIndex } from '../logixUX.model';

export const [logixUXUpdateFromPromptPayload, logixUXUpdateFromPromptPayloadType, logixUXUpdateFromPromptPayloadQuality] = createQualitySet(
  {
    type: 'Create logixUX update DPO Dataset from prompt payload target',
    reducer: (state: LogixUXState, action: Action): LogixUXState => {
      const target = userInterface_selectInputTarget(action);
      const index = selectTrainingDataIndex(target, promptID);
      const activeDPO = state.activeDPO;
      activeDPO[index].prompt = target.value;
      return {
        ...state,
        activeDPO,
      };
    },
    methodCreator: defaultMethodCreator,
  }
);
/*#>*/
