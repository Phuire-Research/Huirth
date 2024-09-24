/*<$
For the graph programming framework Stratimux and a Concept huirth Server, create a quality that will trigger the git pull repository strategy
$>*/
/*<#*/
import {
  createMethodDebounceWithConcepts,
  createQualityCardWithPayload,
  nullReducer,
  selectState,
  strategyBegin,
} from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerGitPullRepositoryStrategy } from '../strategies/gitPullRepository.strategy';
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerTriggerGitPullRepositoryStrategyPayload = {
  name: string;
};

export const huirthServerTriggerGitPullRepositoryStrategy =
  createQualityCardWithPayload<huirthServerState, huirthServerTriggerGitPullRepositoryStrategyPayload>({
    type: 'huirthServer trigger git pull repository strategy',
    reducer: nullReducer,
    methodCreator: () =>
      createMethodDebounceWithConcepts(
        (action, concepts) => {
          const { name } = action.payload;
          const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
          if (fileSystemState) {
            const strategy = huirthServerGitPullRepositoryStrategy(fileSystemState.root, name);
            return strategyBegin(strategy);
          } else {
            return action;
          }
        }, 50
      ),
  });
/*#>*/
