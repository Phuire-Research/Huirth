/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the save DPO ActionStrategy.
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
import { LogixUXServerState } from '../logixUXServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerSaveDPOStrategy } from '../strategies/saveDPO.strategy';

export const [
  logixUXServerTriggerSaveDPOStrategy,
  logixUXServerTriggerSaveDPOStrategyType,
  logixUXServerTriggerSaveDPOStrategyQuality
] = createQualitySet({
  type: 'logixUXServer trigger save DPO strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore as number);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (state && fileSystemState) {
          const strategy = logixUXServerSaveDPOStrategy(fileSystemState.root, state.activeDPO);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/