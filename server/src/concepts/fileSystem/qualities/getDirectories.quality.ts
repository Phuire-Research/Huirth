import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConclude,
  createActionController$,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_unifyData,
  strategySuccess
} from 'stratimux';
import { Subject, map, switchMap } from 'rxjs';
import fs from 'fs';

export type GetDirectoriesPayload = string;
export const fileSystemGetDirectoriesType: ActionType = 'File System get target Directories';
export const fileSystemGetDirectories = prepareActionWithPayloadCreator<GetDirectoriesPayload>(fileSystemGetDirectoriesType);
export type GetDirectoriesDataField = {
  directories: string[]
}

const createGetDirectoriesMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    switchMap((act: Action) => {
      return createActionController$(act, (controller, action) => {
        const payload = selectPayload<GetDirectoriesPayload>(action);
        const directories = fs.readdirSync(payload);
        if (action.strategy) {
          console.log('DIRECTORIES LENGTH', directories.length);
          const newStrategy =
            strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {directories}));
          controller.fire(newStrategy);
        }
        controller.fire(axiumConclude());
      });
    }),
  );
  return [
    logMethod,
    logSubject
  ];
};

export const fileSystemGetDirectoriesQuality = createQuality(
  fileSystemGetDirectoriesType,
  defaultReducer,
  createGetDirectoriesMethodCreator,
);
