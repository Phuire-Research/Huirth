/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's prompt by index and set by event target value.
$>*/
/*<#*/
import { Action, createQualitySetWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type huirthUpdateDataSetPromptPayload = {
  index: number;
  dataSetIndex: number;
};

export const [huirthUpdateDataSetPrompt, huirthUpdateDataSetPromptType, huirthUpdateDataSetPromptQuality] =
  createQualitySetWithPayload<huirthUpdateDataSetPromptPayload>({
    type: 'Create huirth UpdateDataSetPrompt',
    reducer: (state: huirthState, action: Action): huirthState => {
      const payload = selectPayload<huirthUpdateDataSetPromptPayload>(action);
      const target = userInterface_selectInputTarget(action);
      const trainingData = [...state.trainingData];
      const named = trainingData[payload.index];
      if (named && target) {
        named.dataSet[payload.dataSetIndex].prompt = target.value;
      }
      return {
        ...state,
        trainingData,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
