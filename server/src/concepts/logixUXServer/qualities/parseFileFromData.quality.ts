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
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';

export const logixUXServerParseFileFromDataType: ActionType =
  'logixUXServer parse file from data';
export const logixUXServerParseFileFromData =
  prepareActionCreator(logixUXServerParseFileFromDataType);
export type ParseFileFromDataField = {
  trainingData: DPO_DataSet
}

const logixUXServerParseFileFromDataMethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadDirectoryField;
      if (data.filesAndDirectories) {
        console.log('CHECK DIRENT DIRECTORY CONTENTS', data.filesAndDirectories);
        controller.fire(strategySuccess(action.strategy));
        // FIGURE OUT DIRENT
        // if (data.directories.length !== 0) {
        //   const contents = fs.readFileSync(path.join(data.directories[0].path + '/' + data.directories[0].name));
        //   try {
        //     const trainingData = JSON.parse(`${contents}`);
        //     controller.fire(strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {
        //     // TEMP
        //       trainingData,
        //     })));
        //   } catch (error) {
        //     controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
        //       action.strategy,
        //       logixUXServerFailureConditions.failedParsingTrainingData
        //     )));
        //   }
        // } else {
        //   controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
        //     action.strategy,
        //     logixUXServerFailureConditions.noTrainingData
        //   )));
        // }
      }
    } else {
      controller.fire(action);
    }
  });

export const logixUXServerParseFileFromDataQuality = createQuality(
  logixUXServerParseFileFromDataType,
  defaultReducer,
  logixUXServerParseFileFromDataMethodCreator,
);
