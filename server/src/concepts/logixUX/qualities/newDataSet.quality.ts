/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { generateDefaultNamedDataSet } from '../logixUX.model';

export const [
  logixUXNewDataSet,
  logixUXNewDataSetType,
  logixUXNewDataSetQuality
] = createQualitySet({
  type: 'Create logixUX create a new default DataSet',
  reducer: (state: LogixUXState): LogixUXState => {
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