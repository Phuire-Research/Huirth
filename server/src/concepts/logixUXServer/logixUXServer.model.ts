import { DPO_DataSet } from '../../model/logixUX';
import { Active_DPO } from '../logixUX/logixUX.model';

// eslint-disable-next-line no-shadow
export enum logixUXServerFailureConditions {
  noTrainingData = 'noTrainingData',
  failedParsingTrainingData = 'failedParsingTrainingData',
}

export const convertTrainingDataToSaveFormat = (trainingData: Active_DPO[]) => {
  const saveFormat: DPO_DataSet = {};
  trainingData.forEach((entry, i) => {
    saveFormat[entry.prompt + i] = {
      chosen: [{content: entry.chosen}],
      rejected: [{content: entry.chosen}],
    };
  });
  return saveFormat;
};

export const convertSaveFormatToTrainingData = (saveFormat: DPO_DataSet) => {
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