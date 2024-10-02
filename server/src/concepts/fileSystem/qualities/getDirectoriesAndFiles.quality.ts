/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will add Directories and Files from that target location to ActionStrategy data.
$>*/
/*<#*/
import {
  createAsyncMethodDebounce,
  createQualityCardWithPayload,
  nullReducer,
  strategyData_appendFailure,
  strategyData_muxifyData,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import fs from 'fs/promises';
import { FileDirent } from '../fileSystem.model';
import { FileSystemState } from '../fileSystem.concept';

export type GetDirectoriesAndFilesPayload = {
  path: string;
};
export type GetDirectoriesAndFilesDataField = {
  directories: FileDirent[];
};

export const fileSystemGetDirectoriesAndFiles = createQualityCardWithPayload<FileSystemState, GetDirectoriesAndFilesPayload>({
  type: 'File System get target Directories and Files',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethodDebounce(({ controller, action }) => {
      const { path } = action.payload;
      if (action.strategy) {
        const strategy = action.strategy;
        fs.readdir(path, {
          withFileTypes: true,
        })
          .then((directories) => {
            console.log('DIRECTORIES AND FILES LENGTH', directories.length);
            const newStrategy = strategySuccess(strategy, strategyData_muxifyData(strategy, { directories }));
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
