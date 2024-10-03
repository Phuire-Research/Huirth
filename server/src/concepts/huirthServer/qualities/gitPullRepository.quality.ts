/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will clone a git repository into the supplied payload path.
$>*/
/*<#*/
import {
  ActionStrategy,
  createAsyncMethodDebounce,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import child_process from 'child_process';
import path from 'path';
import { huirthServerState } from '../huirthServer.concept';

export type GitPullRepositoryPayload = {
  path: string;
};

export const huirthServerGitPullRepository = createQualityCardWithPayload<huirthServerState, GitPullRepositoryPayload>({
  type: 'huirthServer pull most recent changes for targeted repository',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethodDebounce(({ controller, action }) => {
      const payload = selectPayload<GitPullRepositoryPayload>(action);
      if (action.strategy) {
        const target = path.join(`${payload.path.split('data')[0]}` + '/server/src/concepts/huirthServer/model/gitPull.sh');
        const process = child_process.spawn('sh', [target, payload.path]);
        process.on('exit', (something) => {
          // console.log('CHECK THIS SOMETHING', something);
          const newStrategy = strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
        process.on('message', (message) => {
          console.log(message);
        });
        process.on('error', (error) => {
          console.error(error);
          const newStrategy = strategyFailed(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
      } else {
        controller.fire(action);
      }
    }, 50),
});
/*#>*/
