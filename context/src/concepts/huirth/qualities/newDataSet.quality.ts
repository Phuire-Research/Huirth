/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  Concepts,
  axiumKick,
  createActionNode,
  createMethodWithConcepts,
  createQualityCard,
  createStrategy,
  selectUnifiedState,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { generateDefaultNamedDataSet } from '../huirth.model';
import { Subject } from 'rxjs';
import { huirthSendAddTrainingPageStrategy } from './sendTriggerAddTrainingPageStrategy.quality';

export const [huirthNewDataSet, huirthNewDataSetType, huirthNewDataSetQuality] = createQualityCard({
  type: 'Huirth create a new default DataSet',
  reducer: (state: huirthState): huirthState => {
    const dataSetSelection: boolean[] = [];
    const trainingData = [...state.trainingData];
    let { trainingDataCounter } = state;
    if (trainingDataCounter === -1) {
      trainingDataCounter = trainingData.length;
    }
    console.log('CHECK DATA SET SELECTION', dataSetSelection);
    trainingData.push(generateDefaultNamedDataSet('newDataSet' + trainingDataCounter));
    trainingData.forEach((_) => {
      dataSetSelection.push(false);
    });
    trainingDataCounter++;
    return {
      ...state,
      trainingData,
      dataSetSelection,
      trainingDataCounter,
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodWithConcepts(
      (_, concepts) => {
        let { trainingDataCounter } = selectUnifiedState(concepts, semaphore as number) as huirthState;
        const { trainingData } = selectUnifiedState(concepts, semaphore as number) as huirthState;
        if (trainingDataCounter === -1) {
          trainingDataCounter = trainingData.length;
        }
        const name = 'newDataSet' + trainingDataCounter;
        const send = createActionNode(huirthSendAddTrainingPageStrategy({ name }));
        const kick = createActionNode(axiumKick(), {
          successNode: send,
        });
        const sendAddTrainingDataPage = createStrategy({
          topic: 'Send to server to trigger add training data page strategy',
          initialNode: kick,
        });
        return strategyBegin(sendAddTrainingDataPage);
      },
      concepts$ as Subject<Concepts>,
      semaphore as number
    ),
});
/*#>*/
