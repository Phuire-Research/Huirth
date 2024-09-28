/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality the will create the target directory if it does not exist.
$>*/
/*<#*/
import {
  ActionStrategy,
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  strategySuccess,
} from '@phuire/stratimux';
import fs from 'fs';
import { FileSystemState } from '../fileSystem.concept';

export type CreateTargetDirectoryPayload = {
  path: string;
};

export const fileSystemCreateTargetDirectory =
  createQualityCardWithPayload<FileSystemState, CreateTargetDirectoryPayload>({
    type: 'File System create target Directory',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod(({controller, action}) => {
        const {path} = action.payload;
        if (action.strategy) {
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          const newStrategy = strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        } else {
          controller.fire(muxiumConclude());
        }
      }),
  });
/*#>*/
