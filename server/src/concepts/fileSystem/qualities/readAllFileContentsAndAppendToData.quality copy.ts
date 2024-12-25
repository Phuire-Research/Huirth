/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will read all files from a ReadDirectoryField data slice and unify the contents with the ActionStrategy's data.
$>*/
/*<#*/
import {
  createAsyncMethod,
  createQualityCard,
  nullReducer,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_muxifyData,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { FileDirent } from '../fileSystem.model';
import { ReadDirectoryField } from './readDir.quality';

export type ReadAllFileContentsAndAppendToDataField = {
  contents: string[];
};

async function recursiveReadAllFiles(destinations: string[]) {
  const contents: string[] = [];
  for (const dest of destinations) {
    const entry = await fs.readFile(dest);
    contents.push(entry.toString());
  }
  return contents;
}

export const fileSystemReadAllFileContentsAndAppendToData = createQualityCard({
  type: 'File System read from All File Contents and Append to Data Field',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      if (action.strategy) {
        const strategy = action.strategy;
        const data = strategyData_select<ReadDirectoryField>(strategy);
        if (data) {
          const { filesAndDirectories } = data;
          const destinations: string[] = [];
          filesAndDirectories.forEach((dir) => {
            if (dir.isFile()) {
              destinations.push(path.join(dir.path + '/' + dir.name));
            }
          });
          recursiveReadAllFiles(destinations).then((contents) => {
            try {
              const newData: ReadAllFileContentsAndAppendToDataField = {
                contents: contents,
              };
              controller.fire(strategySuccess(strategy, strategyData_muxifyData(strategy, newData)));
            } catch (error) {
              controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, `${error}`)));
            }
          });
        } else {
          controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No dirent provided in payload')));
        }
      } else {
        controller.fire(action);
      }
    }),
});
/*#>*/
