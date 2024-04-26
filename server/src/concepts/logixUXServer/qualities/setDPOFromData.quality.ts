/*<$
For the graph programming framework Stratimux and a Concept logixUXServer, generate a quality that parses a DPO data set from the incoming data field and adds such into state.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
  strategyData_select,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { convertSaveFormatDPOToDPO } from '../logixUXServer.model';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';
import { DataSetTypes } from '../../logixUX/logixUX.model';

export const [
  logixUXServerSetDPOFromData,
  logixUXServerSetDPOFromDataType,
  logixUXServerSetDPOFromDataQuality
] = createQualitySet({
  type: 'logixUXServer set DPO after parsing Training Data from passed Data',
  reducer: (
    state: LogixUXServerState,
    action: Action
  ): LogixUXServerState => {
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
  },
  methodCreator: defaultMethodCreator
});
/*#>*/