import {
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import { ReadDirectoryField } from './readDir.quality';

export type FilterFilesAndDirectoriesPayload = {
  token: string;
};
export const fileSystemFilterFilesAndDirectoriesType: ActionType = 'File System filter from Data Files and Directories field via token';
export const fileSystemFilterFilesAndDirectories =
  prepareActionWithPayloadCreator<FilterFilesAndDirectoriesPayload>(fileSystemFilterFilesAndDirectoriesType);

const createFilterFilesAndDirectoriesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy) {
      const strategy = action.strategy;
      const data = strategyData_select<ReadDirectoryField>(strategy);
      const {token} = selectPayload<FilterFilesAndDirectoriesPayload>(action);
      if (data && data.filesAndDirectories) {
        data.filesAndDirectories = data?.filesAndDirectories.filter(dirent => dirent.name.indexOf(token) !== -1);
        controller.fire(strategySuccess(strategy, strategyData_unifyData(strategy, data)));
      } else {
        controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndDirectories passed to quality')));
      }
    } else {
      controller.fire(axiumConclude());
    }
  });

export const fileSystemFilterFilesAndDirectoriesQuality = createQuality(
  fileSystemFilterFilesAndDirectoriesType,
  defaultReducer,
  createFilterFilesAndDirectoriesMethodCreator,
);
