/*<$
For the framework Stratimux and a Concept logixUXServer, generate a quality that parses a DPO data set from the incoming data field and adds such into state.
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
import { convertSaveFormatDPOToDPO } from '../logixUXServer.model';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';
import { DataSetTypes } from '../../logixUX/logixUX.model';

export const logixUXServerSetDPOFromDataType: ActionType =
  'logixUXServer set DPO after parsing Training Data from passed Data';
export const logixUXServerSetDPOFromData =
  prepareActionCreator(logixUXServerSetDPOFromDataType);

function logixUXServerSetDPOFromDataReducer(
  state: LogixUXServerState,
  action: Action
): LogixUXServerState {
  if (action.strategy && action.strategy.data) {
    const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
    const convert = data.trainingData.filter(set => set.type === DataSetTypes.dpo);
    const activeDPO = convert.map(set => convertSaveFormatDPOToDPO(set)).flatMap(set => set);
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
  defaultMethodCreator
);
/*#>*/