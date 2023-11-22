/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that parses a DPO data set from the incoming data field and adds such into state.
$>*/
/*<#*/
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
import { LogixUXServerState } from '../logixUXServer.concept';
import { convertSaveFormatDPOToDPO, logixUXServerFailureConditions } from '../logixUXServer.model';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';

export const logixUXServerSetDPOFromDataType: ActionType =
  'User Interface Server parse Training Data from passed Data';
export const logixUXServerSetDPOFromData =
  prepareActionCreator(logixUXServerSetDPOFromDataType);

const logixUXServerSetDPOFromDataMethodCreator = () =>
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

function logixUXServerSetDPOFromDataReducer(
  state: LogixUXServerState,
  action: Action
): LogixUXServerState {
  if (action.strategy && action.strategy.data) {
    const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
    const activeDPO = convertSaveFormatDPOToDPO(data.trainingData);
    if (activeDPO) {
      return {
        ...state,
        activeDPO,
      };
    }
  }
  return {
    ...state,
  };
}

export const logixUXServerSetDPOFromDataQuality = createQuality(
  logixUXServerSetDPOFromDataType,
  logixUXServerSetDPOFromDataReducer,
  logixUXServerSetDPOFromDataMethodCreator,
);
/*#>*/