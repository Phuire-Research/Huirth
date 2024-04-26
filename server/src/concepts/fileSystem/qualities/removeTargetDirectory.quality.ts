/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will remove a target directory.
$>*/
/*<#*/
import {
  ActionStrategy,
  axiumConclude,
  createAsyncMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import { rimraf } from 'rimraf';

export type RemoveTargetDirectoryPayload = {
  path: string
};

export const [
  fileSystemRemoveTargetDirectory,
  fileSystemRemoveTargetDirectoryType,
  fileSystemRemoveTargetDirectoryQuality
] = createQualitySetWithPayload<RemoveTargetDirectoryPayload>({
  type: 'File System remove target Directory',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      const path = selectPayload<RemoveTargetDirectoryPayload>(action).path;
      if (action.strategy) {
        if (path.split('\\server\\src\\').length > 1) {
          console.error('ERROR IN REMOVE TARGET DIR', action);
          controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, 'cannot delete server directory')));
        } else {
          rimraf(path).then((error) => {
            if (error) {
              console.error(error);
            }
            const newStrategy =
              strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
        }
      } else {
        controller.fire(axiumConclude());
      }
    })
});
/*#>*/