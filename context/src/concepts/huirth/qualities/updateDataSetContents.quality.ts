/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will set the DataSet at the specified index, the value of the html target supplied in the strategy data field.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type huirthUpdateDataSetContentsPayload = {
  index: number;
  dataSetIndex: number;
  dataSetEntry: number;
};

export const huirthUpdateDataSetContents = createQualityCardWithPayload<huirthState, huirthUpdateDataSetContentsPayload>({
  type: 'huirth update DataSet Contents',
  reducer: (state, action) => {
    const payload = selectPayload<huirthUpdateDataSetContentsPayload>(action);
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named && target) {
      named.dataSet[payload.dataSetIndex].contents[payload.dataSetEntry].text = target.value.trim();
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
