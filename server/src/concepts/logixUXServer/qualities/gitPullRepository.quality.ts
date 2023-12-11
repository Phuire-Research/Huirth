/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will clone a git repository into the supplied payload path.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionType,
  MethodCreator,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyFailed,
  strategySuccess
} from 'stratimux';
import child_process from 'child_process';

export type GitPullRepositoryPayload = {
  path: string
};

export const logixUXServerGitPullRepositoryType: ActionType = 'logixUXServer pull most recent changes for targeted repository';
export const logixUXServerGitPullRepository =
  prepareActionWithPayloadCreator<GitPullRepositoryPayload>(logixUXServerGitPullRepositoryType);

const makeGitPullRepositoryMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const {path} = selectPayload<GitPullRepositoryPayload>(action);
    if (action.strategy) {
      const process = child_process.exec('cd ' + path + '&& git pull', (err, stdout, stderr) => {
        console.log(stdout);
      });

      process.on('exit', (something) => {
        console.log('CHECK THIS SOMETHING', something);
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
  });

export const logixUXServerGitPullRepositoryQuality = createQuality(
  logixUXServerGitPullRepositoryType,
  defaultReducer,
  makeGitPullRepositoryMethodCreator,
);
/*#>*/