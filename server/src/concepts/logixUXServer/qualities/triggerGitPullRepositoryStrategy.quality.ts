/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, create a quality that will trigger the git pull repository strategy
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
import { logixUXServerGitPullRepositoryStrategy } from '../strategies/gitPullRepository.strategy';

export type LogixUXServerTriggerGitPullRepositoryStrategyPayload = {
  name: string
}

export const [
  logixUXServerTriggerGitPullRepositoryStrategy,
  logixUXServerTriggerGitPullRepositoryStrategyType,
  logixUXServerTriggerGitPullRepositoryStrategyQuality
] = createQualitySetWithPayload<LogixUXServerTriggerGitPullRepositoryStrategyPayload>({
  type: 'logixUXServer trigger git pull repository strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const {name} = selectPayload<LogixUXServerTriggerGitPullRepositoryStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState) {
          const strategy = logixUXServerGitPullRepositoryStrategy(fileSystemState.root, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/