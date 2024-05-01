/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save DPO ActionStrategy.
$>*/
/*<#*/
import {
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
import { huirthServerSaveDPOStrategy } from '../strategies/saveDPO.strategy';

export const [
  huirthServerTriggerSaveDPOStrategy,
  huirthServerTriggerSaveDPOStrategyType,
  huirthServerTriggerSaveDPOStrategyQuality
] = createQualitySet({
  type: 'huirthServer trigger save DPO strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const state = selectUnifiedState<huirthServerState>(concepts, semaphore as number);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (state && fileSystemState) {
          const strategy = huirthServerSaveDPOStrategy(fileSystemState.root, state.activeDPO);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/