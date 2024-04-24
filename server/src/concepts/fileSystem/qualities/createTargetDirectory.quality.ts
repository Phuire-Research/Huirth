/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality the will create the target directory if it does not exist.
$>*/
/*<#*/
import {
  ActionStrategy,
  axiumConclude,
  createAsyncMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategySuccess
} from 'stratimux';
import fs from 'fs';

export type CreateTargetDirectoryPayload = {
  path: string
};

export const [
  fileSystemCreateTargetDirectory,
  fileSystemCreateTargetDirectoryType,
  fileSystemCreateTargetDirectoryQuality
] = createQualitySetWithPayload<CreateTargetDirectoryPayload>({
  type: 'File System create target Directory',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      const path = selectPayload<CreateTargetDirectoryPayload>(action).path;
      if (action.strategy) {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        const newStrategy =
          strategySuccess(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      } else {
        controller.fire(axiumConclude());
      }
    })
});
/*#>*/