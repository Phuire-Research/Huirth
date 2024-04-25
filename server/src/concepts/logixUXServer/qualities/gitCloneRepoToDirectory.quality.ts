/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will clone a git repository into the supplied payload path.
$>*/
/*<#*/
import {
  ActionStrategy,
  createAsyncMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import child_process from 'child_process';

export type GitCloneRepoToDirectoryPayload = {
  url: string,
  path: string
};

export const [
  logixUXServerGitCloneRepoToDirectory,
  logixUXServerGitCloneRepoToDirectoryType,
  logixUXServerGitCloneRepoToDirectoryQuality
] = createQualitySetWithPayload<GitCloneRepoToDirectoryPayload>({
  type: 'logixUXServer clone repository to target directory',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      const {path, url} = selectPayload<GitCloneRepoToDirectoryPayload>(action);
      if (action.strategy) {
        const process = child_process.exec('git clone ' + url + ' ' + path, (err, stdout, stderr) => {
          console.log(`GIT CLONE ${url}\nERR: `, err, 'STDOUT: ', stdout, 'STDERR: ', stderr);
        });
        process.on('message', (message) => console.log(message));
        process.on('exit', () => {
          const newStrategy =
            strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
        process.on('error', (error) => {
          console.error(error);
          const newStrategy =
            strategyFailed(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
      } else {
        controller.fire(action);
      }
    })
});
/*#>*/