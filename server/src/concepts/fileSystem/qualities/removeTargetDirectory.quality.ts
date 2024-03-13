/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will remove a target directory.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  nullReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import { rimraf } from 'rimraf';

export type RemoveTargetDirectoryPayload = {
  path: string
};
export const fileSystemRemoveTargetDirectoryType: ActionType = 'File System remove target Directory';
export const fileSystemRemoveTargetDirectory =
  prepareActionWithPayloadCreator<RemoveTargetDirectoryPayload>(fileSystemRemoveTargetDirectoryType);

const createRemoveTargetDirectoryMethodCreator: MethodCreator = () =>
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
  });

export const fileSystemRemoveTargetDirectoryQuality = createQuality(
  fileSystemRemoveTargetDirectoryType,
  nullReducer,
  createRemoveTargetDirectoryMethodCreator,
);
/*#>*/