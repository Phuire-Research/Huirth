/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that set incoming data set into the currently loaded training data.
$>*/
/*<#*/
import { Action, createQualitySetWithPayload, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { NamedDataSet, TrainingData } from '../logixUX.model';

export type LogixUXSetDataSetPayload = {
  named: NamedDataSet;
};

export const [logixUXSetDataSet, logixUXSetDataSetType, logixUXSetDataSetQuality] = createQualitySetWithPayload<LogixUXSetDataSetPayload>({
  type: 'logixUX set data set to the current training data',
  reducer: (state: LogixUXState, action: Action) => {
    const { trainingData } = state;
    const newTrainingData: TrainingData = [];
    const { named } = selectPayload<LogixUXSetDataSetPayload>(action);
    // eslint-disable-next-line no-useless-escape
    let exists = false;
    for (const data of trainingData) {
      if (data.name === named.name) {
        newTrainingData.push(named);
        exists = true;
        break;
      } else {
        newTrainingData.push(data);
      }
    }
    if (!exists) {
      trainingData.push(named);
    }
    return {
      ...state,
      trainingData: newTrainingData,
    };
  },
});
/*#>*/
