/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that merges a DataSet's selection within state by index by toggling the boolean value.
$>*/
/*<#*/
import { createActionNode, createMethodWithState, createQualityCard, createStrategy, defaultMethodCreator, strategyBegin } from 'stratimux';
import { HuirthDeck, huirthState } from '../huirth.concept';
import { DataSetTypes, NamedDataSet, TrainingData } from '../huirth.model';

export const huirthMergeShuffleDataSetSelection = createQualityCard<huirthState, HuirthDeck>({
  type: 'huirth merge shuffle DataSet Selection',
  reducer: (state) => {
    const dataSetSelection = [...state.dataSetSelection];
    const trainingData = [...state.trainingData];
    const selected: TrainingData = [];
    const newSet: NamedDataSet = {
      name: '',
      dataSet: [],
      index: 0,
      type: DataSetTypes.general,
    };
    const onCount: number[] = [];
    const currentCount: number[] = [];
    let longest = 0;
    dataSetSelection.forEach((valid, i) => {
      if (valid) {
        newSet.name += trainingData[i].name;
        selected.push(trainingData[i]);
        if (trainingData[i].dataSet.length > longest) {
          longest = trainingData[i].dataSet.length;
        }
        onCount.push(Math.floor(longest / trainingData[i].dataSet.length));
        currentCount.push(0);
      }
    });
    console.log(onCount);
    if (newSet.name !== '') {
      for (let i = 0; i < longest; i++) {
        selected.forEach((entry, n) => {
          if (entry.dataSet[currentCount[n]] && i % onCount[n] === 0) {
            newSet.dataSet.push(entry.dataSet[currentCount[n]]);
            currentCount[n] += 1;
          }
        });
      }
      trainingData.push(newSet);
    }
    return {
      dataSetSelection: new Array(dataSetSelection.length + 1).fill(false),
      trainingData,
    };
  },
  methodCreator: () =>
    createMethodWithState(({ state, deck, action }) => {
      const dataSetSelection = [...state.dataSetSelection];
      const trainingData = [...state.trainingData];
      let name = '';

      dataSetSelection.forEach((valid, i) => {
        if (valid) {
          name += trainingData[i].name;
        }
      });
      if (name !== '') {
        const send = createActionNode(deck.huirth.e.huirthSendAddTrainingPageStrategy({ name }));
        const kick = createActionNode(deck.muxium.e.muxiumKick(), {
          successNode: send,
        });
        const sendAddTrainingDataPage = createStrategy({
          topic: 'Send to server to trigger add training data page strategy',
          initialNode: kick,
        });
        return strategyBegin(sendAddTrainingDataPage);
      }
      return action;
    }),
});
/*#>*/
