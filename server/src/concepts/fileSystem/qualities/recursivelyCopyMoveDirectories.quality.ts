/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will recursively copy a target directory and its contents to a new location.
$>*/
/*<#*/
import {
  ActionStrategy,
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  strategyRecurse,
  strategySuccess,
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { FileSystemState } from '../fileSystem.concept';

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
    }
  }
}

export type RecursivelyCopyMoveTargetDirectoriesPayload = {
  directories: {
    name: string;
    target: string;
    newLocation: string;
  }[];
};

export const fileSystemRecursivelyCopyMoveTargetDirectories = createQualityCardWithPayload<
  FileSystemState,
  RecursivelyCopyMoveTargetDirectoriesPayload
>({
  type: 'File System recursively copy move target Directories',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      const payload = action.payload;
      if (action.strategy) {
        const directory = payload.directories.shift();
        if (directory) {
          copyDir(directory.target, directory.newLocation).then(() => {
            if (payload.directories.length > 0) {
              controller.fire(strategyRecurse(action.strategy as ActionStrategy, { payload }));
            } else {
              const newStrategy = strategySuccess(action.strategy as ActionStrategy);
              controller.fire(newStrategy);
            }
          });
        } else {
          controller.fire(strategySuccess(action.strategy as ActionStrategy));
        }
      } else {
        controller.fire(muxiumConclude());
      }
    }),
});
/*#>*/
