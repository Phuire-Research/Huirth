/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, create a quality that will trigger the git pull repository strategy
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  nullReducer,
  prepareActionCreator,
  selectPayload,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerGitPullRepositoryStrategy } from '../strategies/gitPullRepository.strategy';

export type LogixUXServerTriggerGitPullRepositoryStrategyPayload = {
  name: string
}
export const logixUXServerTriggerGitPullRepositoryStrategyType: ActionType = 'logixUXServer trigger git pull repository strategy';
export const logixUXServerTriggerGitPullRepositoryStrategy =
  prepareActionCreator(logixUXServerTriggerGitPullRepositoryStrategyType);

const createLogixUXServerTriggerGitPullRepositoryStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
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
  );

export const logixUXServerTriggerGitPullRepositoryStrategyQuality = createQuality(
  logixUXServerTriggerGitPullRepositoryStrategyType,
  nullReducer,
  createLogixUXServerTriggerGitPullRepositoryStrategyMethodCreator,
);
/*#>*/