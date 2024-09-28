/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will filter an ActionStrategies supplied data's fileAndDirectories to both what is and is not specified.
$>*/
/*<#*/
import {
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_muxifyData,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import { ReadDirectoryField } from './readDir.quality';
import path from 'path';
import { FileSystemState } from '../fileSystem.concept';

const isNot = (name: string, tokens: string[]): boolean => {
  let pass = true;
  for (const token of tokens) {
    if (name.indexOf(token) !== -1) {
      pass = false;
      break;
    }
  }
  return pass;
};

const is = (name: string, tokens: string[]): boolean => {
  let pass = false;
  for (const token of tokens) {
    if (name.indexOf(token) !== -1) {
      pass = true;
      break;
    }
  }
  return pass;
};

export type FilterFilesAndDirectoriesPayload = {
  isTokens: string[];
  notTokens: string[];
};

export const fileSystemFilterFilesAndDirectories =
  createQualityCardWithPayload<FileSystemState, FilterFilesAndDirectoriesPayload>({
    type: 'File System filter from Data Files and Directories field via token',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod(({controller, action}) => {
        if (action.strategy) {
          const strategy = action.strategy;
          const data = strategyData_select<ReadDirectoryField>(strategy);
          const { isTokens, notTokens } = selectPayload<FilterFilesAndDirectoriesPayload>(action);
          if (data && data.filesAndDirectories) {
            data.filesAndDirectories = data?.filesAndDirectories.filter((dirent) => {
              const check = path.join(dirent.path + '/' + dirent.name);
              return is(check, isTokens) && isNot(check, notTokens);
            });
            controller.fire(strategySuccess(strategy, strategyData_muxifyData(strategy, data)));
          } else {
            controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndDirectories passed to quality')));
          }
        } else {
          controller.fire(muxiumConclude());
        }
      }),
  });
/*#>*/
