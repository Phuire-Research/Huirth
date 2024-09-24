/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will clone a git repository into the supplied payload path.
$>*/
/*<#*/
import {
  ActionStrategy,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import child_process from 'child_process';
import { huirthServerState } from '../huirthServer.concept';

export type GitCloneRepoToDirectoryPayload = {
  url: string;
  path: string;
};

export const huirthServerGitCloneRepoToDirectory =
  createQualityCardWithPayload<huirthServerState, GitCloneRepoToDirectoryPayload>({
    type: 'huirthServer clone repository to target directory',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod((controller, action) => {
        const { path, url } = action.payload;
        if (action.strategy) {
          const process = child_process.exec('git clone ' + url + ' ' + path, (err, stdout, stderr) => {
            console.log(`GIT CLONE ${url}\nERR: `, err, 'STDOUT: ', stdout, 'STDERR: ', stderr);
          });
          process.on('message', (message) => console.log(message));
          process.on('exit', () => {
            const newStrategy = strategySuccess(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
          process.on('error', (error) => {
            console.error(error);
            const newStrategy = strategyFailed(action.strategy as ActionStrategy);
            controller.fire(newStrategy);
          });
        } else {
          controller.fire(action);
        }
      }),
  });
/*#>*/
