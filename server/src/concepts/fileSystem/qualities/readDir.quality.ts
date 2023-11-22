/*<$
For the framework Stratimux and File System Concept, generate a quality that will add all Directories and Files from that target location to ActionStrategy data.
$>*/
/*<#*/
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
import { Dirent } from 'fs';
import path from 'path';
import { FileDirent } from '../fileSystem.model';

async function walk(target: string): Promise<({path: string} & Dirent)[]> {
  const entries = await fs.readdir(target, {
    withFileTypes: true
  });
  let ret: ({path: string} & Dirent)[] = [];
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== '.git') {
      ret = [...ret, ...(await walk(path.join((entry as {path: string} & Dirent).path) + '/' + entry.name))];
    } else {
      ret = [...ret, entry as {path: string} & Dirent];
    }
  }
  return ret;
}

export type ReadDirectoryPayload = {
  target: string;
};
export type ReadDirectoryField = {
  filesAndDirectories: FileDirent[]
};
export const fileSystemReadDirectoryType: ActionType = 'File System read Directory and add to Strategy Data';
export const fileSystemReadDirectory =
  prepareActionWithPayloadCreator<ReadDirectoryPayload>(fileSystemReadDirectoryType);

const createReadDirectoryMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const { target } = selectPayload<ReadDirectoryPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      walk(target).then(data => {
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
/*#>*/