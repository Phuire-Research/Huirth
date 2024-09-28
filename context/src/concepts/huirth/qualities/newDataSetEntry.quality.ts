/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality to add a new base data set entry to the training data at the target index.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { generateBaseDataSetEntry } from '../huirth.model';

export type huirthNewDataSetEntryPayload = {
  index: number;
};
export const huirthNewDataSetEntry =
  createQualityCardWithPayload<huirthState, huirthNewDataSetEntryPayload>({
    type: 'Huirth create a new default DataSet entry at target index',
    reducer: (state, action) => {
      const payload = action.payload;
      const trainingData = [...state.trainingData];
      trainingData[payload.index].dataSet.push(generateBaseDataSetEntry());
      return {
        trainingData,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
