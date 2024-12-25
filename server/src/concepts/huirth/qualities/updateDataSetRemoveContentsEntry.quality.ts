/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will remove a DataSet's Entry at the specified index.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { BaseDataSet, DataSetEntry } from '../huirth.model';

export type huirthUpdateDataSetRemoveContentsEntryPayload = {
  index: number;
  dataSetIndex: number;
  dataSetEntry: number;
};

export const huirthUpdateDataSetRemoveContentsEntry = createQualityCardWithPayload<
  huirthState,
  huirthUpdateDataSetRemoveContentsEntryPayload
>({
  type: 'huirth update DataSet Remove Contents Entry',
  reducer: (state, action) => {
    const payload = selectPayload<huirthUpdateDataSetRemoveContentsEntryPayload>(action);
    const trainingData = [...state.trainingData];
    const named = trainingData[payload.index];
    const newDataSet: DataSetEntry[] = [];
    if (named) {
      if (named.dataSet[payload.dataSetIndex].contents.length !== 1) {
        named.dataSet[payload.dataSetIndex].contents.forEach((entry, i) => {
          if (i !== payload.dataSetEntry) {
            newDataSet.push(entry);
          }
        });
        named.dataSet[payload.dataSetIndex].contents = newDataSet;
      } else {
        const newBase: BaseDataSet[] = [];
        named.dataSet.forEach((entry, i) => {
          if (i !== payload.dataSetIndex) {
            newBase.push(entry);
          }
        });
        named.dataSet = newBase;
      }
    }
    return {
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
