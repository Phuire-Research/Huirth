/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the save training data ActionStrategy.
$>*/
/*<#*/
import {
  Concepts,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQualitySet,
  nullReducer,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';
import { Subject } from 'rxjs';

export const [
  logixUXServerTriggerSaveTrainingDataStrategy,
  logixUXServerTriggerSaveTrainingDataStrategyType,
  logixUXServerTriggerSaveTrainingDataStrategyQuality
] = createQualitySet({
  type: 'logixUXServer trigger save training data strategy',
  reducer: nullReducer,
  methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore as number);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (state && fileSystemState) {
          const strategy = logixUXServerSaveTrainingDataStrategy(fileSystemState.root);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/