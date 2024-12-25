/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add to a DataSet's Entries a new Contents entry.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export type huirthUpdateDataSetAddContentsEntryPayload = {
  index: number;
  dataSetIndex: number;
};

export const huirthUpdateDataSetAddContentsEntry = createQualityCardWithPayload<huirthState, huirthUpdateDataSetAddContentsEntryPayload>({
  type: 'huirth update DataSet Add Contents Entry',
  reducer: (state, action) => {
    const payload = selectPayload<huirthUpdateDataSetAddContentsEntryPayload>(action);
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    if (named && target) {
      named.dataSet[payload.dataSetIndex].contents.push({
        role: 'unset',
        text: '',
      });
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
