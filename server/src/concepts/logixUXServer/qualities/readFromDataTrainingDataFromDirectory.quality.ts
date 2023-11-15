import {
  Action,
  ActionType,
  createAsyncMethod,
  createQuality,
  defaultMethodCreator,
  defaultReducer,
  prepareActionCreator,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import fs from 'fs';
import { DPO_DataSet } from '../../../model/logixUX';
import { logixUXServerFailureConditions } from '../logixUXServer.model';

export const logixUXServerReadFromDataTrainingDataFromDirectoriesType: ActionType =
  'logixUX Server read from File System Data, Directories and Files';
export const logixUXServerReadFromDataTrainingDataFromDirectories =
  prepareActionCreator(logixUXServerReadFromDataTrainingDataFromDirectoriesType);
export type ReadFromDataTrainingDataFromDirectoriesField = {
  trainingData: DPO_DataSet
}

export const logixUXServerReadFromDataTrainingDataFromDirectoriesMethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
      if (data.directories) {
        const contents = fs.readFileSync(data.directories[0]);
        try {
          const trainingData = JSON.parse(`${contents}`);
          controller.fire(strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {
          // TEMP
            trainingData,
          })));
        } catch (error) {
          controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
            action.strategy,
            logixUXServerFailureConditions.failedParsingTrainingData
          )));
        }
      }
    } else {
      controller.fire(action);
    }
  });

export const logixUXServerReadFromDataTrainingDataFromDirectoriesQuality = createQuality(
  logixUXServerReadFromDataTrainingDataFromDirectoriesType,
  defaultReducer,
  logixUXServerReadFromDataTrainingDataFromDirectoriesMethodCreator,
);
