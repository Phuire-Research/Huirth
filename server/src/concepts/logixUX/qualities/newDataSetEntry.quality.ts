/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality to add a new base data set entry to the training data at the target index.
$>*/
/*<#*/
import {
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateBaseDataSetEntry } from '../logixUX.model';

export type LogixUXNewDataSetEntryPayload = {
  index: number
};
export const [
  logixUXNewDataSetEntry,
  logixUXNewDataSetEntryType,
  logixUXNewDataSetEntryQuality
] = createQualitySetWithPayload<LogixUXNewDataSetEntryPayload>({
  type: 'Create logixUX create a new default DataSet entry at target index',
  reducer: (state: LogixUXState, action): LogixUXState => {
    const payload = selectPayload<LogixUXNewDataSetEntryPayload>(action);
    const trainingData = [...state.trainingData];
    trainingData[payload.index].dataSet.push(generateBaseDataSetEntry());
    return {
      ...state,
      trainingData,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/