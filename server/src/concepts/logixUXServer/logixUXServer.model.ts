/*<$
For the framework Stratimux and a Concept logixUX Server, generate the model file contents that will handle Data Sets, Failure Conditions, and Tokens.
$>*/
/*<#*/
import { DPO_DataSet } from '../../model/logixUX';
import { Active_DPO, NamedDataSet } from '../logixUX/logixUX.model';

// eslint-disable-next-line no-shadow
export enum logixUXServerFailureConditions {
  noTrainingData = 'noTrainingData',
  failedParsingTrainingData = 'failedParsingTrainingData',
}

// eslint-disable-next-line no-shadow
export enum dataDirectories {
  gitRepo = 'repositories'
}

export const convertDPOToSaveFormatDPO = (trainingData: Active_DPO[]) => {
  const saveFormat: DPO_DataSet = {};
  trainingData.forEach((entry, i) => {
    saveFormat[entry.prompt + i] = {
      chosen: [{content: entry.chosen}],
      rejected: [{content: entry.chosen}],
    };
  });
  return saveFormat;
};

export type SavedFormat = {
  [prompt: string]: string
}

export const convertNamedDataSetToSaveFormat = (named: NamedDataSet) => {
  const saveFormat: SavedFormat = {};
  named.dataSet.forEach((entry) => {
    saveFormat[entry.prompt] = entry.content;
  });
  return saveFormat;
};

export const convertSaveFormatDPOToDPO = (saveFormat: DPO_DataSet) => {
  const trainingData: Active_DPO[] = [];
  const saveKeys = Object.keys(saveFormat);
  for (const key of saveKeys) {
    trainingData.push({
      prompt: key,
      chosen: saveFormat[key].chosen[0].content,
      rejected: saveFormat[key].rejected[0].content,
    });
  }
  return trainingData;
};

/*<!*/
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
  ignoreBegin = '/*<!*/',
  ignoreEnd = '/*!>*/'
}
/*!>*/
/*#>*/