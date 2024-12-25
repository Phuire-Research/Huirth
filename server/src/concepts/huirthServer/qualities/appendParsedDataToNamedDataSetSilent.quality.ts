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
  defaultMethodCreator,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { ParsedFileFromDataField } from './parseFileFromData.quality';
import { huirthServerState } from '../huirthServer.concept';
import { DataSetTypes } from '../../huirth/huirth.model';

export type huirthServerAppendParsedDataToNamedDataSetSilentPayload = {
  name: string;
  type: DataSetTypes;
};

export const huirthServerAppendParsedDataToNamedDataSetSilent = createQualityCardWithPayload<
  huirthServerState,
  huirthServerAppendParsedDataToNamedDataSetSilentPayload
>({
  type: 'huirthServer append parsed data to named data set',
  reducer: (state, action) => {
    const { name, type } = action.payload;
    if (action.strategy) {
      const { strategy } = action;
      const { dataSetSelection } = state;
      const data = strategyData_select<ParsedFileFromDataField>(strategy);
      if (data) {
        const { parsed } = data;
        const { trainingData } = state;
        console.log('CHECK PARSED', parsed);
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
    return {};
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
