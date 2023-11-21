import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConclude,
  createActionController$,
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
import { Subject, map, switchMap } from 'rxjs';
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

const createGetDirectoriesAndFilesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<GetDirectoriesAndFilesPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      fs.readdir(payload.path, {
        withFileTypes: true
      }).then(directories => {
        console.log('DIRECTORIES AND FILES LENGTH', directories.length, strategy.topic);
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
  createGetDirectoriesAndFilesMethodCreator,
);
