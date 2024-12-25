/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet to have a SystemInstruction property.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export type huirthUpdateDataSetAddSystemInstructionsPayload = {
  index: number;
  dataSetIndex: number;
};

export const huirthUpdateDataSetAddSystemInstructions = createQualityCardWithPayload<
  huirthState,
  huirthUpdateDataSetAddSystemInstructionsPayload
>({
  type: 'huirth update DataSet Add System Instructions',
  reducer: (state, action) => {
    const payload = action.payload;
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named) {
      named.dataSet[payload.dataSetIndex].systemInstructions = '';
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
