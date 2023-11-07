import {
  Action,
  ActionStrategy,
  ActionType,
  Method,
  MethodCreator,
  axiumConclude,
  createActionController$,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess
} from 'stratimux';
import { Subject, switchMap } from 'rxjs';
import fs from 'fs';

export type CreateTargetDirectoryPayload = string;
export const fileSystemCreateTargetDirectoryType: ActionType = 'File System create target Directory';
export const fileSystemCreateTargetDirectory =
  prepareActionWithPayloadCreator<CreateTargetDirectoryPayload>(fileSystemCreateTargetDirectoryType);

const makeCreateTargetDirectoryMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    switchMap((act: Action) => {
      return createActionController$(act, (controller, action) => {
        const payload = selectPayload<CreateTargetDirectoryPayload>(action);
        if (action.strategy) {
          if (!fs.existsSync(payload)) {
            fs.mkdirSync(payload);
          }
          const newStrategy =
            strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        } else {
          controller.fire(axiumConclude());
        }
      });
    }),
  );
  return [
    logMethod,
    logSubject
  ];
};

export const fileSystemCreateTargetDirectoryQuality = createQuality(
  fileSystemCreateTargetDirectoryType,
  defaultReducer,
  makeCreateTargetDirectoryMethodCreator,
);
