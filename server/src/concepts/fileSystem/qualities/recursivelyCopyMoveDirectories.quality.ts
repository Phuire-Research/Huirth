/*<$*/
// PROMPT: For the framework Stratimux and File System Concept, generate a quality that will recursively copy a target directory and its contents to a new location.
/*$>*/
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
  strategyRecurse,
  strategySuccess
} from 'stratimux';
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
  directories: {
    name: string,
    target: string,
    newLocation: string,
  }[]
};
export const fileSystemRecursivelyCopyMoveTargetDirectoriesType: ActionType = 'File System recursively copy move target Directories';
export const fileSystemRecursivelyCopyMoveTargetDirectories =
  prepareActionWithPayloadCreator<RecursivelyCopyMoveTargetDirectoriesPayload>(fileSystemRecursivelyCopyMoveTargetDirectoriesType);

const createRecursivelyCopyMoveTargetDirectoriesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<RecursivelyCopyMoveTargetDirectoriesPayload>(action);
    if (action.strategy) {
      const directory = payload.directories.shift();
      if (directory) {
        copyDir(directory.target, directory.newLocation).then(() => {
          if (payload.directories.length > 0) {
            controller.fire(
              strategyRecurse(action.strategy as ActionStrategy, {payload})
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
/*#>*/