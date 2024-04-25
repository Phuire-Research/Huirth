/*<$
For the graph programming framework Stratimux and a Concept logixUXServer, generate a quality that parses a series of data sets from the incoming data field and adds such into state's trainingData.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
  strategyData_select,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';

export const [
  logixUXServerSetTrainingDataFromData,
  logixUXServerSetTrainingDataFromDataType,
  logixUXServerSetTrainingDataFromDataQuality
] = createQualitySet({
  type: 'logixUXServer set parsed Training Data from passed Data',
  reducer: (
    state: LogixUXServerState,
    action: Action
  ): LogixUXServerState => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
      if (data.trainingData) {
        const trainingData = data.trainingData;
        return {
          ...state,
          trainingData,
          dataSetSelection: new Array(data.trainingData.length).fill(false)
        };
      }
    }
    return {
      ...state,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/