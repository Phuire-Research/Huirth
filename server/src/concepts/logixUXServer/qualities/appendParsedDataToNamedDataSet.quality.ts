/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality will add an entry or create a specified named data set to state, then remove the first entry from the filesAndData field.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createMethod,
  createQuality,
  createQualitySetWithPayload,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_select,
  strategyData_unifyData,
  strategySuccess,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { ParsedFileFromDataField } from './parseFileFromData.quality';
import { LogixUXServerState } from '../logixUXServer.concept';
import { DataSetTypes } from '../../logixUX/logixUX.model';

export type LogixUXServerAppendParsedDataToNamedDataSetPayload = {
  name: string,
  type: DataSetTypes
}

export const [
  logixUXServerAppendParsedDataToNamedDataSet,
  logixUXServerAppendParsedDataToNamedDataSetType,
  logixUXServerAppendParsedDataToNamedDataSetQuality
] = createQualitySetWithPayload<LogixUXServerAppendParsedDataToNamedDataSetPayload>({
  type: 'logixUXServer append parsed data to named data set, then remove its path from fileAndDirectories field',
  reducer: (state: LogixUXServerState, action: Action): LogixUXServerState => {
    const {name, type} = selectPayload<LogixUXServerAppendParsedDataToNamedDataSetPayload>(action);
    if (action.strategy) {
      const {strategy} = action;
      const {dataSetSelection} = state;
      const data = strategyData_select<ParsedFileFromDataField>(strategy);
      if (data) {
        const {parsed} = data;
        const {trainingData} = state;
        let added = false;
        for (const set of trainingData) {
          if (set.name === name) {
            set.dataSet = [
              ...set.dataSet,
              ...parsed
            ];
            added = true;
            console.log(set.dataSet.length, parsed.length);
            break;
          }
        }
        if (!added) {
          trainingData.push({
            name,
            type,
            dataSet: parsed,
            index: 0
          });
          dataSetSelection.push(false);
        }
        return {
          ...state,
          trainingData,
          dataSetSelection
        };
      }
    }
    return {
      ...state,
    };
  },
  methodCreator: () =>
    createMethod((action) => {
      if (action.strategy && action.strategy.data) {
        const strategy = action.strategy;
        const data = strategyData_select(action.strategy) as ReadDirectoryField;
        data.filesAndDirectories.shift();
        return strategySuccess(strategy, strategyData_unifyData(strategy, data));
      } else {
        return action;
      }
    })
});
/*#>*/