/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will create a file at a target location with the specified contents.
$>*/
/*<#*/
import {
  ActionStrategy,
  axiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategySuccess,
} from '@phuire/stratimux';
import fs from 'fs/promises';

export type CreateContextIndexPayload = {
  target: string;
  content: string;
};

export const [
  fileSystemCreateFileWithContentsIndex,
  fileSystemCreateFileWithContentsIndexType,
  fileSystemCreateFileWithContentsIndexQuality,
] = createQualityCardWithPayload<CreateContextIndexPayload>({
  type: 'File System create File with Contents',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      const payload = selectPayload<CreateContextIndexPayload>(action);
      if (action.strategy) {
        fs.writeFile(payload.target, payload.content).then(() => {
          const newStrategy = strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
      } else {
        controller.fire(axiumConclude());
      }
    }),
});
/*#>*/
