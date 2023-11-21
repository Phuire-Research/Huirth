import {
  ActionType,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyData_select,
  strategySuccess,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { TrainingData } from '../../logixUX/logixUX.model';
import { ReadFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';

export type LogixUXServerParseFileFromDataPayload = {
  dataSetName: string,
}
export const logixUXServerParseFileFromDataType: ActionType =
  'logixUXServer parse file from data';
export const logixUXServerParseFileFromData =
  prepareActionCreator(logixUXServerParseFileFromDataType);
export type ParseFileFromDataField = {
  trainingData: TrainingData
}

const logixUXServerParseFileFromDataMethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
      if (data.filesAndDirectories) {
        console.log('CHECK DIRENT DIRECTORY CONTENTS', data.dirent, data.content);
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
