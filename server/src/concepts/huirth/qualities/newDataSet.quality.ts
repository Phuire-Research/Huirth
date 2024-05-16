/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  Concepts,
  createActionNode,
  createMethodWithConcepts,
  createQualitySet,
  createStrategy,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { generateDefaultNamedDataSet } from '../huirth.model';
import { Subject } from 'rxjs';
import { huirthSendAddTrainingPageStrategy } from './sendTriggerAddTrainingPageStrategy.quality';

export const [
  huirthNewDataSet,
  huirthNewDataSetType,
  huirthNewDataSetQuality
] = createQualitySet({
  type: 'Huirth create a new default DataSet',
  reducer: (state: huirthState): huirthState => {
    const {dataSetSelection} = state;
    const trainingData = [...state.trainingData];
    let {trainingDataCounter} = state;
    if (trainingDataCounter === -1) {
      trainingDataCounter = trainingData.length;
    }
    dataSetSelection.push(false);
    console.log('CHECK DATA SET SELECTION', dataSetSelection);
    trainingData.push(generateDefaultNamedDataSet('newDataSet' + trainingDataCounter));
    trainingDataCounter++;
    return {
      ...state,
      trainingData,
      dataSetSelection,
      trainingDataCounter
    };
  },
  methodCreator: (concepts$, semaphore) => createMethodWithConcepts((_, concepts) => {
    let {trainingDataCounter} = selectUnifiedState(concepts, semaphore as number) as huirthState;
    const {trainingData} = selectUnifiedState(concepts, semaphore as number) as huirthState;
    if (trainingDataCounter === -1) {
      trainingDataCounter = trainingData.length;
    }
    const name = 'newDataSet' + trainingDataCounter;
    const sendAddTrainingDataPage = createStrategy({
      topic: 'Send to server to trigger add training data page strategy',
      initialNode: createActionNode(huirthSendAddTrainingPageStrategy({name}))
    });
    return strategyBegin(sendAddTrainingDataPage);
  }, concepts$ as Subject<Concepts>, semaphore as number)
});
/*#>*/