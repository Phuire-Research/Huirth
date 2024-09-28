/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will create a file at a target location with the specified contents.
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
import fs from 'fs/promises';
import { FileSystemState } from '../fileSystem.concept';

export type CreateContextIndexPayload = {
  target: string;
  content: string;
};

export const fileSystemCreateFileWithContentsIndex = createQualityCardWithPayload<FileSystemState, CreateContextIndexPayload>({
  type: 'File System create File with Contents',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({controller, action}) => {
      const {target, content} = action.payload;
      if (action.strategy) {
        fs.writeFile(target, content).then(() => {
          const newStrategy = strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
      } else {
        controller.fire(muxiumConclude());
      }
    }),
});
/*#>*/
