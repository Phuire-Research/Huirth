/*<$
For the graph programming framework Stratimux and a Concept huirthServer, generate a quality that parses a DPO data set from the incoming data field and adds such into state.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator, strategyData_select } from '@phuire/stratimux';
import { huirthServerState } from '../huirthServer.concept';
import { convertSaveFormatDPOToDPO } from '../huirthServer.model';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';
import { DataSetTypes } from '../../huirth/huirth.model';

export const huirthServerSetDPOFromData = createQualityCard<huirthServerState>({
  type: 'huirthServer set DPO after parsing Training Data from passed Data',
  reducer: (state, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
      const convert = data.trainingData.filter((set) => set.type === DataSetTypes.dpo);
      const activeDPO = convert.map((set) => convertSaveFormatDPOToDPO(set)).flatMap((set) => set);
      if (activeDPO) {
        return {
          activeDPO,
        };
      }
    }
    return {
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
