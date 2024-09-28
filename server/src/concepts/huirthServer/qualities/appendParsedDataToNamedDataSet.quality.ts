/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality will add an entry or create a specified named data set to state, then remove the first entry from the filesAndData field.
$>*/
/*<#*/
import {
  createMethod,
  createQualityCardWithPayload,
  strategyData_select,
  strategyData_muxifyData,
  strategySuccess,
} from '@phuire/stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { ParsedFileFromDataField } from './parseFileFromData.quality';
import { huirthServerState } from '../huirthServer.concept';
import { DataSetTypes } from '../../huirth/huirth.model';

export type huirthServerAppendParsedDataToNamedDataSetPayload = {
  name: string;
  type: DataSetTypes;
};

export const huirthServerAppendParsedDataToNamedDataSet =
  createQualityCardWithPayload<huirthServerState, huirthServerAppendParsedDataToNamedDataSetPayload>({
    type: 'huirthServer append parsed data to named data set, then remove its path from fileAndDirectories field',
    reducer: (state, action) => {
      const { name, type } = action.payload;
      if (action.strategy) {
        const { strategy } = action;
        const { dataSetSelection } = state;
        const data = strategyData_select<ParsedFileFromDataField>(strategy);
        if (data) {
          const { parsed } = data;
          const { trainingData } = state;
          let added = false;
          for (const set of trainingData) {
            if (set.name === name) {
              set.dataSet = [...set.dataSet, ...parsed];
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
              index: 0,
            });
            dataSetSelection.push(false);
          }
          return {
            trainingData,
            dataSetSelection,
          };
        }
      }
      return {
      };
    },
    methodCreator: () =>
      createMethod(({action}) => {
        if (action.strategy && action.strategy.data) {
          const strategy = action.strategy;
          const data = strategyData_select(action.strategy) as ReadDirectoryField;
          data.filesAndDirectories.shift();
          return strategySuccess(strategy, strategyData_muxifyData(strategy, data));
        } else {
          return action;
        }
      }),
  });
/*#>*/
