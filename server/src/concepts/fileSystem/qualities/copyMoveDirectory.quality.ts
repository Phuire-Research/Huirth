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
// import { strategyData_appendFailure, strategyData_unifyData } from '../../../model/actionStrategy';
import { Subject, switchMap } from 'rxjs';
import fs from 'fs/promises';
import path from 'path';

async function copyDir(src: string, dest: string) {
  console.log('TEST', dest);
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      entry.isDirectory() ?
        await copyDir(srcPath, destPath) :
        await fs.copyFile(srcPath, destPath);
    }
  }
}

export type CopyMoveTargetDirectoryPayload = {
  target: string,
  newLocation: string,
};
export const fileSystemCopyMoveTargetDirectoryType: ActionType = 'File System copy move target Directory';
export const fileSystemCopyMoveTargetDirectory =
  prepareActionWithPayloadCreator<CopyMoveTargetDirectoryPayload>(fileSystemCopyMoveTargetDirectoryType);

const createCopyMoveTargetDirectoryMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    switchMap((act: Action) => {
      return createActionController$(act, (controller, action) => {
        const payload = selectPayload<CopyMoveTargetDirectoryPayload>(action);
        if (action.strategy) {
          copyDir(payload.target, payload.newLocation).then(() => {
            const newStrategy =
              strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
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

export const fileSystemCopyMoveTargetDirectoryQuality = createQuality(
  fileSystemCopyMoveTargetDirectoryType,
  defaultReducer,
  createCopyMoveTargetDirectoryMethodCreator,
);
