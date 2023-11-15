import {
  Action,
  ActionType,
  createMethod,
  createQuality,
  prepareActionCreator,
  strategyData_appendFailure,
  strategyData_select,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { LogixUXServerState } from '../../logixUXServer/logixUXServer.concept';
// import { logixUXServerReadFromDataTrainingDataFromDirectories } from './readFromDataTrainingDataFromDirectory.quality';
import { convertSaveFormatToTrainingData, logixUXServerFailureConditions } from '../logixUXServer.model';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';

export const logixUXServerSetTrainingDataFromDataType: ActionType =
  'User Interface Server parse Training Data from passed Data';
export const logixUXServerSetTrainingDataFromData =
  prepareActionCreator(logixUXServerSetTrainingDataFromDataType);

const logixUXServerSetTrainingDataFromDataMethodCreator = () =>
  createMethod((action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
      if (data.trainingData && Object.keys(data.trainingData).length === 0) {
        return strategySuccess(action.strategy);
      } else {
        return strategyFailed(action.strategy, strategyData_appendFailure(
          action.strategy,
          logixUXServerFailureConditions.noTrainingData
        ));
      }
    } else {
      return action;
    }
  });

function logixUXServerSetTrainingDataFromDataReducer(
  state: LogixUXServerState,
  action: Action
): LogixUXServerState {
  if (action.strategy && action.strategy.data) {
    const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
    const trainingData = convertSaveFormatToTrainingData(data.trainingData);
    if (trainingData) {
      return {
        ...state,
        trainingData,
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
  logixUXServerSetTrainingDataFromDataMethodCreator,
);