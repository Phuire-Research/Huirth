/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the delete data sets strategy based on passed payload.
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
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerDeleteDataSetsStrategy } from '../strategies/deleteDataSets.strategy';
import { LogixUXState } from '../../logixUX/logixUX.concept';

export type LogixUXServerTriggerDeleteDataSetsStrategyPayload = {
  names: string[]
}
export const logixUXServerTriggerDeleteDataSetsStrategyType: ActionType = 'logixUXServer trigger delete data sets strategy';
export const logixUXServerTriggerDeleteDataSetsStrategy =
  prepareActionCreator(logixUXServerTriggerDeleteDataSetsStrategyType);

const logixUXServerTriggerDeleteDataSetsStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
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
  );

export const logixUXServerTriggerDeleteDataSetsStrategyQuality = createQuality(
  logixUXServerTriggerDeleteDataSetsStrategyType,
  defaultReducer,
  logixUXServerTriggerDeleteDataSetsStrategyMethodCreator,
);
/*#>*/