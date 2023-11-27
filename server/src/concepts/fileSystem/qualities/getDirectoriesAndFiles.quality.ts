/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will add Directories and Files from that target location to ActionStrategy data.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import fs  from 'fs/promises';
import { FileDirent } from '../fileSystem.model';

export type GetDirectoriesAndFilesPayload = {
  path: string
};
export const fileSystemGetDirectoriesAndFilesType: ActionType = 'File System get target Directories and Files';
export const fileSystemGetDirectoriesAndFiles =
  prepareActionWithPayloadCreator<GetDirectoriesAndFilesPayload>(fileSystemGetDirectoriesAndFilesType);
export type GetDirectoriesAndFilesDataField = {
  directories: FileDirent[]
}

const fileSystemGetDirectoriesAndFilesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<GetDirectoriesAndFilesPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      fs.readdir(payload.path, {
        withFileTypes: true
      }).then(directories => {
        console.log('DIRECTORIES AND FILES LENGTH', directories.length);
        const newStrategy =
          strategySuccess(strategy, strategyData_unifyData(strategy, {directories}));
        controller.fire(newStrategy);
      }).catch(error => {
        controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, `${error}`)));
      });
    } else {
      controller.fire(action);
    }
  });

export const fileSystemGetDirectoriesAndFilesQuality = createQuality(
  fileSystemGetDirectoriesAndFilesType,
  defaultReducer,
  fileSystemGetDirectoriesAndFilesMethodCreator,
);
/*#>*/