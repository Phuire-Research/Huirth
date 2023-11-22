/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that reads a data set based on the incoming data field and unifies such back into the ActionStrategy data.
$>*/
/*<#*/
import {
  ActionType,
  createAsyncMethod,
  createQuality,
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
import path from 'path';

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
        if (data.directories.length !== 0) {
          const contents = fs.readFileSync(path.join(data.directories[0].path + '/' + data.directories[0].name));
          try {
            const trainingData = JSON.parse(`${contents}`);
            controller.fire(strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {
              // Temp
              trainingData,
            })));
          } catch (error) {
            controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
              action.strategy,
              logixUXServerFailureConditions.failedParsingTrainingData
            )));
          }
        } else {
          controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
            action.strategy,
            logixUXServerFailureConditions.noTrainingData
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
/*#>*/