/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will filter an ActionStrategies supplied data's fileAndDirectories to both what is and is not specified.
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
  strategyData_select,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import { ReadDirectoryField } from './readDir.quality';
import path from 'path';

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
export const fileSystemFilterFilesAndDirectoriesType: ActionType = 'File System filter from Data Files and Directories field via token';
export const fileSystemFilterFilesAndDirectories =
  prepareActionWithPayloadCreator<FilterFilesAndDirectoriesPayload>(fileSystemFilterFilesAndDirectoriesType);

const createFilterFilesAndDirectoriesMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy) {
      const strategy = action.strategy;
      const data = strategyData_select<ReadDirectoryField>(strategy);
      const {isTokens, notTokens} = selectPayload<FilterFilesAndDirectoriesPayload>(action);
      if (data && data.filesAndDirectories) {
        data.filesAndDirectories = data?.filesAndDirectories.filter(dirent => {
          const check = path.join(dirent.path + '/' + dirent.name);
          return is(check, isTokens) && isNot(check, notTokens);
        });
        controller.fire(strategySuccess(strategy, strategyData_unifyData(strategy, data)));
      } else {
        controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndDirectories passed to quality')));
      }
    } else {
      controller.fire(axiumConclude());
    }
  });

export const fileSystemFilterFilesAndDirectoriesQuality = createQuality(
  fileSystemFilterFilesAndDirectoriesType,
  defaultReducer,
  createFilterFilesAndDirectoriesMethodCreator,
);
/*#>*/