/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's SystemInstruction by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type huirthUpdateDataSetSystemInstructionsPayload = {
  index: number;
  dataSetIndex: number;
};

export const huirthUpdateDataSetSystemInstructions = createQualityCardWithPayload<
  huirthState,
  huirthUpdateDataSetSystemInstructionsPayload
>({
  type: 'huirth update DataSet SystemInstructions',
  reducer: (state, action) => {
    const payload = action.payload;
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named && target) {
      named.dataSet[payload.dataSetIndex].systemInstructions = target.value;
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
