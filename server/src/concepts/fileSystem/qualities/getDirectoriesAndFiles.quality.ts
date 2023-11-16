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
import fs, { Dirent } from 'fs';

export type GetDirectoriesAndFilesPayload = {
  path: string
};
export const fileSystemGetDirectoriesAndFilesType: ActionType = 'File System get target Directories and Files';
export const fileSystemGetDirectoriesAndFiles =
  prepareActionWithPayloadCreator<GetDirectoriesAndFilesPayload>(fileSystemGetDirectoriesAndFilesType);
export type GetDirectoriesAndFilesDataField = {
  directories: ({path: string} & Dirent)[]
}

const createGetDirectoriesAndFilesMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    switchMap((act: Action) => {
      return createActionController$(act, (controller, action) => {
        const payload = selectPayload<GetDirectoriesAndFilesPayload>(action);
        const directories = fs.readdirSync(payload.path, {
          withFileTypes: true
        });
        if (action.strategy) {
          console.log('DIRECTORIES AND FILES LENGTH', directories.length, action.strategy.topic);
          const newStrategy =
            strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {directories}));
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

export const fileSystemGetDirectoriesAndFilesQuality = createQuality(
  fileSystemGetDirectoriesAndFilesType,
  defaultReducer,
  createGetDirectoriesAndFilesMethodCreator,
);
