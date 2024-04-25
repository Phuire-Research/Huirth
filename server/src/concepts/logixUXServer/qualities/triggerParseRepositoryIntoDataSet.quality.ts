/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the parse repository ActionStrategy set by name supplied by the incoming payload.
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
import { logixUXServerParseRepositoryStrategy } from '../strategies/parseRepositoryIntoDataSet.strategy';

export type LogixUXServerTriggerParseRepositoryStrategyPayload = {
  name: string
}

export const [
  logixUXServerTriggerParseRepositoryStrategy,
  logixUXServerTriggerParseRepositoryStrategyType,
  logixUXServerTriggerParseRepositoryStrategyQuality
] = createQualitySetWithPayload<LogixUXServerTriggerParseRepositoryStrategyPayload>({
  type: 'logixUXServer trigger parse repository strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const { name } = selectPayload<LogixUXServerTriggerParseRepositoryStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState) {
          const strategy = logixUXServerParseRepositoryStrategy(fileSystemState.root, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/