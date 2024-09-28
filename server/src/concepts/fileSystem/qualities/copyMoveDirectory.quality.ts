/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will copy move a target directory to a new location.
$>*/
/*<#*/
import {
  ActionStrategy,
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategySuccess,
} from '@phuire/stratimux';
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

export type CopyMoveTargetDirectoryPayload = {
  target: string;
  newLocation: string;
};

export const fileSystemCopyMoveTargetDirectory =
  createQualityCardWithPayload<FileSystemState, CopyMoveTargetDirectoryPayload>({
    type: 'File System copy move target Directory',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod(({controller, action}) => {
        const payload = selectPayload<CopyMoveTargetDirectoryPayload>(action);
        if (action.strategy) {
          copyDir(payload.target, payload.newLocation).then(() => {
            const newStrategy = strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
        } else {
          controller.fire(muxiumConclude());
        }
      }),
  });
/*#>*/
