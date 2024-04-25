/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the delete data sets strategy based on passed payload.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerDeleteDataSetsStrategy } from '../strategies/deleteDataSets.strategy';
import { LogixUXState } from '../../logixUX/logixUX.concept';

export type LogixUXServerTriggerDeleteDataSetsStrategyPayload = {
  names: string[]
}

export const [
  logixUXServerTriggerDeleteDataSetsStrategy,
  logixUXServerTriggerDeleteDataSetsStrategyType,
  logixUXServerTriggerDeleteDataSetsStrategyQuality
] = createQualitySetWithPayload<LogixUXServerTriggerDeleteDataSetsStrategyPayload>({
  type: 'logixUXServer trigger delete data sets strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const {names} = selectPayload<LogixUXServerTriggerDeleteDataSetsStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        const state = selectUnifiedState<LogixUXState>(concepts, semaphore as number);
        if (fileSystemState && state) {
          const {trainingData} = state;
          const strategy = logixUXServerDeleteDataSetsStrategy(fileSystemState.root, trainingData, names);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/