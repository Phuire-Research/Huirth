/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate the model file contents that will handle Data Sets, Failure Conditions, and Tokens.
$>*/
/*<#*/
import { DPO_DataSet } from '../../model/logixUX';
import { Active_DPO, BaseDataSet, DataSetTypes, NamedDataSet, TrainingData } from '../logixUX/logixUX.model';

// eslint-disable-next-line no-shadow
export enum logixUXServerFailureConditions {
  noTrainingData = 'noTrainingData',
  failedParsingTrainingData = 'failedParsingTrainingData',
}

// eslint-disable-next-line no-shadow
export enum dataDirectories {
  gitRepo = 'repositories',
  sets = 'sets'
}

export const convertDPOToSaveFormatDPO = (trainingData: Active_DPO[]) => {
  const saveFormat: SavedFormat = {};
  trainingData.forEach((entry) => {
    saveFormat[entry.prompt] = {
      type: DataSetTypes.dpo,
      content: '',
      chosen: entry.chosen,
      rejected: entry.chosen,
    };
  });
  return saveFormat;
};

export type SavedFormat = {
  [prompt: string]: ({
    type: string
    content: string
  } & Record<string, string>)
}

export const convertNamedDataSetToSaveFormat = (named: NamedDataSet) => {
  const saveFormat: SavedFormat = {};
  named.dataSet.forEach((entry) => {
    saveFormat[entry.prompt] = {
      type: named.type,
      content: entry.content
    };
    const keys = Object.keys(entry);
    for (const key of keys) {
      if (key !== 'prompt' && key !== 'content' && key !== 'type') {
        saveFormat.prompt[key] = entry[key];
      }
    }
  });
  return saveFormat;
};

export const convertSavedFormatToNamedDataSet = (saved: SavedFormat, name: string) => {
  const named: NamedDataSet = {
    name,
    type: DataSetTypes.general,
    dataSet: []
  };
  const keys = Object.keys(saved);
  for (const key of keys) {
    const final: BaseDataSet = {
      prompt: key,
      content: ''
    };
    const data = saved[key];
    const dataKeys = Object.keys(data);
    for (const d of dataKeys) {
      if (d === 'type') {
        named.type = data[d] as DataSetTypes;
      } else {
        final[d] = data[d];
      }
    }
    named.dataSet.push(final);
  }
  return named;
};

export const convertSaveFormatDPOToDPO = (named: NamedDataSet) => {
  const DPO: Active_DPO[] = [];
  for (const set of named.dataSet) {
    DPO.push({
      prompt: set.prompt,
      chosen: set.chosen !== undefined ? set.chosen : '',
      rejected: set.rejected !== undefined ? set.rejected : '',
    });
  }
  return DPO;
};

/*#>*/
/*<!!>*/
// eslint-disable-next-line no-shadow
export enum ParsingTokens {
  promptBegin = '/*<$',
  promptEnd = '$>*/',
  contentBegin = '/*<#*/',
  contentEnd = '/*#>*/',
  importBegin = '/*<@',
  importEnd = '@>*/',
  includeBegin = '/*<%',
  includeEnd = '%>*/',
  excludeBegin = '/*<!*/',
  excludeEnd = '/*!>*/',
  stop = '/*<!!>*/'
}