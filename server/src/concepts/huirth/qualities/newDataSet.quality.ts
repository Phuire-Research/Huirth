/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { generateDefaultNamedDataSet } from '../huirth.model';

export const [
  huirthNewDataSet,
  huirthNewDataSetType,
  huirthNewDataSetQuality
] = createQualitySet({
  type: 'Create huirth create a new default DataSet',
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
  methodCreator: defaultMethodCreator
});
/*#>*/