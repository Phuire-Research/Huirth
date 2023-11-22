/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, generate a quality that will determine if the data directory is properly step up.
/*$>*/
/*<#*/
import {
  ActionType,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyData_select,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { dataDirectories } from '../logixUXServer.model';

export const logixUXServerIsDataDirectorySetUpType: ActionType =
  'logixUX Server determine if data directory is set up';
export const logixUXServerIsDataDirectorySetUp =
  prepareActionCreator(logixUXServerIsDataDirectorySetUpType);

const logixUXServerIsDataDirectorySetUpMethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
      if (data.directories) {
        if (data.directories.length === 0) {
          controller.fire(strategyFailed(action.strategy));
        } else {
          let found = false;
          data.directories.forEach(directory => {
            if (directory.name === dataDirectories.gitRepo) {
              found = true;
            }
          });
          if (found) {
            controller.fire(strategySuccess(action.strategy));
          } else {
            controller.fire(strategyFailed(action.strategy));
          }
        }
      }
    } else {
      controller.fire(action);
    }
  });

export const logixUXServerIsDataDirectorySetUpQuality = createQuality(
  logixUXServerIsDataDirectorySetUpType,
  defaultReducer,
  logixUXServerIsDataDirectorySetUpMethodCreator,
);
/*#>*/