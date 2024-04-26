/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will set the DataSet at the specified index, the value of the html target supplied in the strategy data field.
$>*/
/*<#*/
import { Action, createQualitySetWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type LogixUXUpdateDataSetContentsPayload = {
  index: number;
  dataSetIndex: number;
};

export const [logixUXUpdateDataSetContents, logixUXUpdateDataSetContentsType, logixUXUpdateDataSetContentsQuality] =
  createQualitySetWithPayload<LogixUXUpdateDataSetContentsPayload>({
    type: 'Create logixUX UpdateDataSetContents',
    reducer: (state: LogixUXState, action: Action): LogixUXState => {
      const payload = selectPayload<LogixUXUpdateDataSetContentsPayload>(action);
      const target = userInterface_selectInputTarget(action);
      const trainingData = [...state.trainingData];
      const named = trainingData[payload.index];
      if (named && target) {
        named.dataSet[payload.dataSetIndex].content = target.value.trim();
      }
      return {
        ...state,
        trainingData,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
