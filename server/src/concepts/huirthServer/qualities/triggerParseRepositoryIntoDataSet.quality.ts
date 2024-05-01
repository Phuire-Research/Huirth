/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the parse repository ActionStrategy set by name supplied by the incoming payload.
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
import { huirthServerParseRepositoryStrategy } from '../strategies/parseRepositoryIntoDataSet.strategy';

export type huirthServerTriggerParseRepositoryStrategyPayload = {
  name: string
}

export const [
  huirthServerTriggerParseRepositoryStrategy,
  huirthServerTriggerParseRepositoryStrategyType,
  huirthServerTriggerParseRepositoryStrategyQuality
] = createQualitySetWithPayload<huirthServerTriggerParseRepositoryStrategyPayload>({
  type: 'huirthServer trigger parse repository strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const { name } = selectPayload<huirthServerTriggerParseRepositoryStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState) {
          const strategy = huirthServerParseRepositoryStrategy(fileSystemState.root, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/