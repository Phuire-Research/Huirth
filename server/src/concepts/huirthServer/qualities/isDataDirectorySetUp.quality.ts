/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will determine if the data directory is properly step up.
$>*/
/*<#*/
import { createAsyncMethod, createQualityCard, nullReducer, strategyData_select, strategyFailed, strategySuccess } from 'stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { dataDirectories } from '../huirthServer.model';

export const huirthServerIsDataDirectorySetUp = createQualityCard({
  type: 'huirth Server determine if data directory is set up',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      if (action.strategy && action.strategy.data) {
        const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
        if (data.directories) {
          if (data.directories.length === 0) {
            controller.fire(strategyFailed(action.strategy));
          } else {
            let repoFound = false;
            let setsFound = false;
            data.directories.forEach((directory) => {
              if (directory.name === dataDirectories.gitRepo) {
                repoFound = true;
              } else if (directory.name === dataDirectories.sets) {
                setsFound = true;
              }
            });
            if (repoFound && setsFound) {
              controller.fire(strategySuccess(action.strategy));
            } else {
              controller.fire(strategyFailed(action.strategy));
            }
          }
        }
      } else {
        controller.fire(action);
      }
    }),
});
/*#>*/
