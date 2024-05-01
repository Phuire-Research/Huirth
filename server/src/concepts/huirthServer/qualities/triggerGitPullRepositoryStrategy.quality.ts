/*<$
For the graph programming framework Stratimux and a Concept huirth Server, create a quality that will trigger the git pull repository strategy
$>*/
/*<#*/
import {
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerGitPullRepositoryStrategy } from '../strategies/gitPullRepository.strategy';

export type huirthServerTriggerGitPullRepositoryStrategyPayload = {
  name: string
}

export const [
  huirthServerTriggerGitPullRepositoryStrategy,
  huirthServerTriggerGitPullRepositoryStrategyType,
  huirthServerTriggerGitPullRepositoryStrategyQuality
] = createQualitySetWithPayload<huirthServerTriggerGitPullRepositoryStrategyPayload>({
  type: 'huirthServer trigger git pull repository strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const {name} = selectPayload<huirthServerTriggerGitPullRepositoryStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState) {
          const strategy = huirthServerGitPullRepositoryStrategy(fileSystemState.root, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/