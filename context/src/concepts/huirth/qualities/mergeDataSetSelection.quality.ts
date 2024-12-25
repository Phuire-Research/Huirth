/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that merges a DataSet's selection within state by index by toggling the boolean value.
$>*/
/*<#*/
import { createActionNode, createMethodWithState, createQualityCard, createStrategy, defaultMethodCreator, strategyBegin } from 'stratimux';
import { HuirthDeck, huirthState } from '../huirth.concept';
import { DataSetTypes, NamedDataSet } from '../huirth.model';

export const huirthMergeDataSetSelection = createQualityCard<huirthState, HuirthDeck>({
  type: 'huirth merge DataSet Selection',
  reducer: (state) => {
    const dataSetSelection = [...state.dataSetSelection];
    const trainingData = [...state.trainingData];
    const newSet: NamedDataSet = {
      name: '',
      dataSet: [],
      index: 0,
      type: DataSetTypes.general,
    };

    dataSetSelection.forEach((valid, i) => {
      if (valid) {
        newSet.name += trainingData[i].name;
        newSet.dataSet = [...newSet.dataSet, ...trainingData[i].dataSet];
      }
    });
    if (newSet.name !== '') {
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
