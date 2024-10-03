/*<$
For the graph programming framework Stratimux and a Concept huirthServer, generate a quality that parses a series of data sets from the incoming data field and adds such into state's trainingData.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator, strategyData_select } from 'stratimux';
import { huirthServerState } from '../huirthServer.concept';
import { ReadFromDataTrainingDataFromDirectoriesField } from './readFromDataTrainingDataFromDirectory.quality';

export const huirthServerSetTrainingDataFromData = createQualityCard<huirthServerState>({
  type: 'huirthServer set parsed Training Data from passed Data',
  reducer: (_, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadFromDataTrainingDataFromDirectoriesField;
      if (data.trainingData) {
        const trainingData = data.trainingData;
        return {
          trainingData,
          dataSetSelection: new Array(data.trainingData.length).fill(false),
        };
      }
    }
    return {};
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
