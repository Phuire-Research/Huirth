/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save training data ActionStrategy.
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
import { huirthServerState } from '../huirthServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';
import { Subject } from 'rxjs';

export const [
  huirthServerTriggerSaveTrainingDataStrategy,
  huirthServerTriggerSaveTrainingDataStrategyType,
  huirthServerTriggerSaveTrainingDataStrategyQuality
] = createQualitySet({
  type: 'huirthServer trigger save training data strategy',
  reducer: nullReducer,
  methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const state = selectUnifiedState<huirthServerState>(concepts, semaphore as number);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (state && fileSystemState) {
          const strategy = huirthServerSaveTrainingDataStrategy(fileSystemState.root);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/