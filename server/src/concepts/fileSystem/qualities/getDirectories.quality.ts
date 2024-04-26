/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will store a target path's directories onto the provided ActionStrategy data field.
$>*/
/*<#*/
import {
  axiumConclude,
  createAsyncMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyData_unifyData,
  strategySuccess
} from 'stratimux';
import fs from 'fs';

export type GetDirectoriesPayload = {
  path: string
};
export type GetDirectoriesDataField = {
  directories: string[]
}

export const [
  fileSystemGetDirectories,
  fileSystemGetDirectoriesType,
  fileSystemGetDirectoriesQuality
] = createQualitySetWithPayload<GetDirectoriesPayload>({
  type: 'File System get target Directories',
  reducer: nullReducer,
  methodCreator: () => createAsyncMethod((controller, action) => {
    const payload = selectPayload<GetDirectoriesPayload>(action);
    const directories = fs.readdirSync(payload.path);
    if (action.strategy) {
      console.log('DIRECTORIES LENGTH', directories.length);
      const newStrategy =
        strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {directories}));
      controller.fire(newStrategy);
    }
    controller.fire(axiumConclude());
  })
});
/*#>*/
