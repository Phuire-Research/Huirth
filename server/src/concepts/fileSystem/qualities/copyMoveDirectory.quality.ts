/*<$
For the framework Stratimux and File System Concept, generate a quality that will copy move a target directory to a new location.
$>*/
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

export type CopyMoveTargetDirectoryPayload = {
  target: string,
  newLocation: string,
};
export const fileSystemCopyMoveTargetDirectoryType: ActionType = 'File System copy move target Directory';
export const fileSystemCopyMoveTargetDirectory =
  prepareActionWithPayloadCreator<CopyMoveTargetDirectoryPayload>(fileSystemCopyMoveTargetDirectoryType);

const fileSystemCopyMoveTargetDirectoryMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
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

export const fileSystemCopyMoveTargetDirectoryQuality = createQuality(
  fileSystemCopyMoveTargetDirectoryType,
  defaultReducer,
  fileSystemCopyMoveTargetDirectoryMethodCreator,
);
/*#>*/