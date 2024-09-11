/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will add Directories and Files from that target location to ActionStrategy data.
$>*/
/*<#*/
import {
  createAsyncMethod,
  createAsyncMethodDebounce,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import fs from 'fs/promises';
import { FileDirent } from '../fileSystem.model';

export type GetDirectoriesAndFilesPayload = {
  path: string;
};
export type GetDirectoriesAndFilesDataField = {
  directories: FileDirent[];
};

export const [fileSystemGetDirectoriesAndFiles, fileSystemGetDirectoriesAndFilesType, fileSystemGetDirectoriesAndFilesQuality] =
  createQualityCardWithPayload<GetDirectoriesAndFilesPayload>({
    type: 'File System get target Directories and Files',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethodDebounce((controller, action) => {
        const payload = selectPayload<GetDirectoriesAndFilesPayload>(action);
        if (action.strategy) {
          const strategy = action.strategy;
          fs.readdir(payload.path, {
            withFileTypes: true,
          })
            .then((directories) => {
              console.log('DIRECTORIES AND FILES LENGTH', directories.length);
              const newStrategy = strategySuccess(strategy, strategyData_unifyData(strategy, { directories }));
              controller.fire(newStrategy);
            })
            .catch((error) => {
              console.error('CHECK ERROR', error);
              controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, `${error}`)));
            });
        } else {
          controller.fire(action);
        }
      }, 300),
  });
/*#>*/
