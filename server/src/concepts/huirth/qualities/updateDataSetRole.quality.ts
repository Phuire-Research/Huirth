/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's role by index and set by event target value.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type huirthUpdateDataSetRolePayload = {
  index: number;
  dataSetIndex: number;
  dataSetEntry: number;
};

export const huirthUpdateDataSetRole = createQualityCardWithPayload<huirthState, huirthUpdateDataSetRolePayload>({
  type: 'huirth update DataSet Role',
  reducer: (state, action) => {
    const payload = action.payload;
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named && target) {
      named.dataSet[payload.dataSetIndex].contents[payload.dataSetEntry].role = target.value;
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
