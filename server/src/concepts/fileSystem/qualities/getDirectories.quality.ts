/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will store a target path's directories onto the provided ActionStrategy data field.
$>*/
/*<#*/
import {
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  strategyData_muxifyData,
  strategySuccess,
} from '@phuire/stratimux';
import fs from 'fs';
import { FileSystemState } from '../fileSystem.concept';

export type GetDirectoriesPayload = {
  path: string;
};
export type GetDirectoriesDataField = {
  directories: string[];
};

export const fileSystemGetDirectories =
  createQualityCardWithPayload<FileSystemState, GetDirectoriesPayload>({
    type: 'File System get target Directories',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod(({controller, action}) => {
        const {path} = action.payload;
        const directories = fs.readdirSync(path);
        if (action.strategy) {
          console.log('DIRECTORIES LENGTH', directories.length);
          const newStrategy = strategySuccess(action.strategy, strategyData_muxifyData(action.strategy, { directories }));
          controller.fire(newStrategy);
        }
        controller.fire(muxiumConclude());
      }),
  });
/*#>*/
