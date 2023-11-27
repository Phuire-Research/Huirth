/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate the model file contents.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  selectPayload,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerCloneGitRepositoryToDirectoryStrategy } from '../strategies/cloneGitRespositoryToDirectory.strategy';

export type LogixUXServerTriggerCloneGitRepositoryStrategyPayload = {
  url: string,
  name: string
}
export const logixUXServerTriggerCloneGitRepositoryStrategyType: ActionType = 'logixUXServer trigger clone git repository ActionStrategy';
export const logixUXServerTriggerCloneGitRepositoryStrategy =
  prepareActionCreator(logixUXServerTriggerCloneGitRepositoryStrategyType);

const createLogixUXServerTriggerCloneGitRepositoryStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const {name, url} = selectPayload<LogixUXServerTriggerCloneGitRepositoryStrategyPayload>(action);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState) {
        const strategy = logixUXServerCloneGitRepositoryToDirectoryStrategy(fileSystemState.root, url, name);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXServerTriggerCloneGitRepositoryStrategyQuality = createQuality(
  logixUXServerTriggerCloneGitRepositoryStrategyType,
  defaultReducer,
  createLogixUXServerTriggerCloneGitRepositoryStrategyMethodCreator,
);
/*#>*/