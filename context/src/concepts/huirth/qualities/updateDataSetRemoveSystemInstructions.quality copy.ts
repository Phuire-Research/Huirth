/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet to remove a SystemInstruction property.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export type huirthUpdateDataSetRemoveSystemInstructionsPayload = {
  index: number;
  dataSetIndex: number;
};

export const huirthUpdateDataSetRemoveSystemInstructions = createQualityCardWithPayload<
  huirthState,
  huirthUpdateDataSetRemoveSystemInstructionsPayload
>({
  type: 'huirth update DataSet Remove System Instructions',
  reducer: (state, action) => {
    const payload = action.payload;
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named) {
      named.dataSet[payload.dataSetIndex].systemInstructions = undefined;
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
