/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import { muxiumKick, createActionNode, createMethodWithState, createQualityCard, createStrategy, strategyBegin } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { generateDefaultNamedDataSet } from '../huirth.model';
import { huirthSendAddTrainingPageStrategy } from './sendTriggerAddTrainingPageStrategy.quality';

export const huirthNewDataSet = createQualityCard<huirthState>({
  type: 'Huirth create a new default DataSet',
  reducer: (state) => {
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
      trainingData,
      dataSetSelection,
      trainingDataCounter,
    };
  },
  methodCreator: () =>
    createMethodWithState(({ state }) => {
      let { trainingDataCounter } = state;
      const { trainingData } = state;
      if (trainingDataCounter === -1) {
        trainingDataCounter = trainingData.length;
      }
      const name = 'newDataSet' + trainingDataCounter;
      const send = createActionNode(huirthSendAddTrainingPageStrategy.actionCreator({ name }));
      const kick = createActionNode(muxiumKick.actionCreator(), {
        successNode: send,
      });
      const sendAddTrainingDataPage = createStrategy({
        topic: 'Send to server to trigger add training data page strategy',
        initialNode: kick,
      });
      return strategyBegin(sendAddTrainingDataPage);
    }),
});
/*#>*/
