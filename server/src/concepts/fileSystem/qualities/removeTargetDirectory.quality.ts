/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will remove a target directory.
$>*/
/*<#*/
import {
  ActionStrategy,
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import { rimraf } from 'rimraf';
import { FileSystemState } from '../fileSystem.concept';

export type RemoveTargetDirectoryPayload = {
  path: string;
};

export const fileSystemRemoveTargetDirectory = createQualityCardWithPayload<FileSystemState, RemoveTargetDirectoryPayload>({
  type: 'File System remove target Directory',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      const { path } = action.payload;
      if (action.strategy) {
        if (path.split('\\server\\src\\').length > 1) {
          console.error('ERROR IN REMOVE TARGET DIR', action);
          controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, 'cannot delete server directory')));
        } else {
          rimraf(path).then((error) => {
            if (error) {
              console.error(error);
            }
            const newStrategy = strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
        }
      } else {
        controller.fire(muxiumConclude());
      }
    }),
});
/*#>*/
