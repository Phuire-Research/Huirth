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

export type GitCloneRepoToDirectoryPayload = {
  url: string,
  path: string
};

export const logixUXServerGitCloneRepoToDirectoryType: ActionType = 'logixUXServer clone repository to target directory';
export const logixUXServerGitCloneRepoToDirectory =
  prepareActionWithPayloadCreator<GitCloneRepoToDirectoryPayload>(logixUXServerGitCloneRepoToDirectoryType);

const makeGitCloneRepoToDirectoryMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const {path, url} = selectPayload<GitCloneRepoToDirectoryPayload>(action);
    if (action.strategy) {
      const process = child_process.exec('git clone ' + url + ' ' + path);
      process.on('close', () => {
        const newStrategy =
          strategySuccess(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      });
      process.on('error', () => {
        const newStrategy =
          strategyFailed(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      });
    } else {
      controller.fire(action);
    }
  });

export const logixUXServerGitCloneRepoToDirectoryQuality = createQuality(
  logixUXServerGitCloneRepoToDirectoryType,
  defaultReducer,
  makeGitCloneRepoToDirectoryMethodCreator,
);
