/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will read a file from a ReadDirectoryField data slice and unify the contents with the ActionStrategy's data.
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

export type ReadFileContentsAndAppendToDataField = {
  dirent: FileDirent;
  content: string;
};

export const fileSystemReadFileContentsAndAppendToData = createQualityCard({
  type: 'File System read from File and Append to Data Field',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      if (action.strategy) {
        const strategy = action.strategy;
        const data = strategyData_select<ReadDirectoryField>(strategy);
        if (data) {
          const { filesAndDirectories } = data;
          const dirent: FileDirent = filesAndDirectories[0];
          fs.readFile(path.join(dirent.path + '/' + dirent.name)).then((contents) => {
            try {
              const newData = {
                dirent,
                content: contents.toString(),
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
