/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DPO DataSet's chosen property by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualitySet, defaultMethodCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { chosenID, selectTrainingDataIndex } from '../logixUX.model';

export const [logixUXUpdateFromChosenPayload, logixUXUpdateFromChosenPayloadType, logixUXUpdateFromChosenPayloadQuality] = createQualitySet(
  {
    type: 'Create logixUX update DPO Dataset from chosen payload target',
    reducer: (state: LogixUXState, action: Action): LogixUXState => {
      const target = userInterface_selectInputTarget(action);
      if (target) {
        const index = selectTrainingDataIndex(target, chosenID);
        const activeDPO = state.activeDPO;
        activeDPO[index].chosen = target.value;
        return {
          ...state,
          activeDPO,
        };
      }
      return {
        ...state,
      };
    },
    methodCreator: defaultMethodCreator,
  }
);
/*#>*/
