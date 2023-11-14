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

const createCreateContextIndexMethodCreator: MethodCreator = () => createAsyncMethod(
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
  createCreateContextIndexMethodCreator,
);