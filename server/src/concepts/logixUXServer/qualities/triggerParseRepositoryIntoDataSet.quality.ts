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
import { logixUXServerParseRepositoryStrategy } from '../strategies/parseRepositoryIntoDataSet.strategy';

export type LogixUXServerTriggerParseRepositoryStrategyPayload = {
  name: string
}
export const logixUXServerTriggerParseRepositoryStrategyType: ActionType = 'logixUXServer triggerParseRepositoryStrategy';
export const logixUXServerTriggerParseRepositoryStrategy =
  prepareActionCreator(logixUXServerTriggerParseRepositoryStrategyType);

const createLogixUXServerTriggerParseRepositoryStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const {name} = selectPayload<LogixUXServerTriggerParseRepositoryStrategyPayload>(action);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState) {
        const strategy = logixUXServerParseRepositoryStrategy(fileSystemState.root, name);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXServerTriggerParseRepositoryStrategyQuality = createQuality(
  logixUXServerTriggerParseRepositoryStrategyType,
  defaultReducer,
  createLogixUXServerTriggerParseRepositoryStrategyMethodCreator,
);