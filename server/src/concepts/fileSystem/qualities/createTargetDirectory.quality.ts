import {
  Action,
  ActionStrategy,
  ActionType,
  Method,
  MethodCreator,
  axiumConclude,
  createActionController$,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess
} from 'stratimux';
import { Subject, switchMap } from 'rxjs';
import fs from 'fs';

export type CreateTargetDirectoryPayload = {
  path: string
};
export const fileSystemCreateTargetDirectoryType: ActionType = 'File System create target Directory';
export const fileSystemCreateTargetDirectory =
  prepareActionWithPayloadCreator<CreateTargetDirectoryPayload>(fileSystemCreateTargetDirectoryType);

const makeCreateTargetDirectoryMethodCreator: MethodCreator = () =>
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
  });

export const fileSystemCreateTargetDirectoryQuality = createQuality(
  fileSystemCreateTargetDirectoryType,
  defaultReducer,
  makeCreateTargetDirectoryMethodCreator,
);
