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
  strategyRecurse,
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

export type RecursivelyCopyMoveTargetDirectoriesPayload = {
  target: string,
  newLocation: string,
}[];
export const fileSystemRecursivelyCopyMoveTargetDirectoriesType: ActionType = 'File System recursively copy move target Directories';
export const fileSystemRecursivelyCopyMoveTargetDirectories =
  prepareActionWithPayloadCreator<RecursivelyCopyMoveTargetDirectoriesPayload>(fileSystemRecursivelyCopyMoveTargetDirectoriesType);

const createRecursivelyCopyMoveTargetDirectoriesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<RecursivelyCopyMoveTargetDirectoriesPayload>(action);
    if (action.strategy) {
      const directory = payload.shift();
      if (directory) {
        copyDir(directory.target, directory.newLocation).then(() => {
          if (payload.length > 0) {
            controller.fire(
              strategyRecurse(action.strategy as ActionStrategy, {
                payload,
              })
            );
          } else {
            const newStrategy =
              strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          }
        });
      } else {
        controller.fire(
          strategySuccess(action.strategy as ActionStrategy)
        );
      }
    } else {
      controller.fire(axiumConclude());
    }
  });

export const fileSystemRecursivelyCopyMoveTargetDirectoriesQuality = createQuality(
  fileSystemRecursivelyCopyMoveTargetDirectoriesType,
  defaultReducer,
  createRecursivelyCopyMoveTargetDirectoriesMethodCreator,
);
