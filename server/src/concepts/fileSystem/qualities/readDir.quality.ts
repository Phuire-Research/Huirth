import {
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { Dirent } from 'fs';

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

export type ReadDirectoryPayload = {
  target: string;
};
export type ReadDirectoryField = {
  filesAndDirectories: ({path: string} & Dirent)[]
};
export const fileSystemReadDirectoryType: ActionType = 'File System read Directory and add to Strategy Data';
export const fileSystemReadDirectory =
  prepareActionWithPayloadCreator<ReadDirectoryPayload>(fileSystemReadDirectoryType);

const createReadDirectoryMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const { target } = selectPayload<ReadDirectoryPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      fs.readdir(target, {
        withFileTypes: true,
      }).then(data => {
        controller.fire(strategySuccess(strategy, strategyData_unifyData(strategy, {
          filesAndDirectories: data
        })));
      }).catch((error) => {
        controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, error)));
      });
    } else {
      controller.fire(axiumConclude());
    }
  });

export const fileSystemReadDirectoryQuality = createQuality(
  fileSystemReadDirectoryType,
  defaultReducer,
  createReadDirectoryMethodCreator,
);
