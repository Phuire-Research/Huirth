/*<$
For the graph programming framework Stratimux and a Concept logixUXServer, generate a quality that parses a series of data sets from the incoming data field and adds such into state's trainingData.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
  strategyData_select,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';

export const logixUXServerSetTrainingDataFromDataType: ActionType =
  'logixUXServer set parsed Training Data from passed Data';
export const logixUXServerSetTrainingDataFromData =
  prepareActionCreator(logixUXServerSetTrainingDataFromDataType);

function logixUXServerSetTrainingDataFromDataReducer(
  state: LogixUXServerState,
  action: Action
): LogixUXServerState {
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
}

export const logixUXServerSetTrainingDataFromDataQuality = createQuality(
  logixUXServerSetTrainingDataFromDataType,
  logixUXServerSetTrainingDataFromDataReducer,
  defaultMethodCreator
);
/*#>*/