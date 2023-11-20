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
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerCloneGitRepositoryToDirectoryStrategy } from '../strategies/cloneGitRespositoryToDirectory.strategy';

export type LogixUXServerTriggerCloneGitRepositoryStrategyPayload = {
  url: string,
  name: string
}
export const logixUXServerTriggerCloneGitRepositoryStrategyType: ActionType = 'logixUXServer triggerCloneGitRepositoryStrategy';
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