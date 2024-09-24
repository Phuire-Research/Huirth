/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set incoming data set into the currently loaded training data.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { NamedDataSet, TrainingData } from '../huirth.model';

export type huirthSetDataSetPayload = {
  named: NamedDataSet;
};

export const huirthSetDataSet = createQualityCardWithPayload<huirthState, huirthSetDataSetPayload>({
  type: 'huirth set data set to the current training data',
  reducer: (state, action) => {
    const { trainingData } = state;
    const newTrainingData: TrainingData = [];
    const { named } = selectPayload<huirthSetDataSetPayload>(action);
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
