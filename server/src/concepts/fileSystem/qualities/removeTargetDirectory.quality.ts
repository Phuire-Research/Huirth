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
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import { Subject, switchMap } from 'rxjs';
import { rimraf } from 'rimraf';

export type RemoveTargetDirectoryPayload = string;
export const fileSystemRemoveTargetDirectoryType: ActionType = 'File System remove target Directory';
export const fileSystemRemoveTargetDirectory =
  prepareActionWithPayloadCreator<RemoveTargetDirectoryPayload>(fileSystemRemoveTargetDirectoryType);

const createRemoveTargetDirectoryMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    switchMap((act: Action) => {
      return createActionController$(act, (controller, action) => {
        const payload = selectPayload<RemoveTargetDirectoryPayload>(action);
        if (action.strategy) {
          if (payload.split('\\server\\src\\').length > 1) {
            console.error('ERROR IN REMOVE TARGET DIR', action);
            controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, 'cannot delete server directory')));
          } else {
            rimraf(payload).then((error) => {
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
    }),
  );
  return [
    logMethod,
    logSubject
  ];
};

export const fileSystemRemoveTargetDirectoryQuality = createQuality(
  fileSystemRemoveTargetDirectoryType,
  defaultReducer,
  createRemoveTargetDirectoryMethodCreator,
);
