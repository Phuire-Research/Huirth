/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will create a file at a target location with the specified contents.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess
} from 'stratimux';
import fs from 'fs/promises';

export type CreateContextIndexPayload = {
  target: string,
  content: string,
};
export const fileSystemCreateFileWithContentsIndexType: ActionType = 'File System create File with Contents';
export const fileSystemCreateFileWithContentsIndex =
  prepareActionWithPayloadCreator<CreateContextIndexPayload>(fileSystemCreateFileWithContentsIndexType);

const createContextIndexMethodCreator: MethodCreator = () => createAsyncMethod(
  (controller, action) => {
    const payload = selectPayload<CreateContextIndexPayload>(action);
    if (action.strategy) {
      fs.writeFile(payload.target, payload.content).then(() => {
        const newStrategy =
          strategySuccess(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      });
    } else {
      controller.fire(axiumConclude());
    }
  }
);

export const fileSystemCreateFileWithContentsIndexQuality = createQuality(
  fileSystemCreateFileWithContentsIndexType,
  defaultReducer,
  createContextIndexMethodCreator,
);
/*#>*/