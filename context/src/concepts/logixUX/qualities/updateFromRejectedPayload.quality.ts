/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DPO DataSet's rejected property by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualitySet, defaultMethodCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { rejectedID, selectTrainingDataIndex } from '../logixUX.model';

export const [logixUXUpdateFromRejectedPayload, logixUXUpdateFromRejectedPayloadType, logixUXUpdateFromRejectedPayloadQuality] =
  createQualitySet({
    type: 'Create logixUX update DPO Dataset from rejected payload target',
    reducer: (state: LogixUXState, action: Action): LogixUXState => {
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
    methodCreator: defaultMethodCreator,
  });
/*#>*/
