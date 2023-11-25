/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the delete data sets strategy.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  prepareActionCreator,
  selectPayload,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { LogixUXServerState } from '../logixUXServer.concept';
import { logixUXServerDeleteDataSetsStrategy } from '../strategies/deleteDataSets.strategy';

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
      if (fileSystemState) {
        const strategy = logixUXServerDeleteDataSetsStrategy(fileSystemState.root, names);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

const logixUXServerTriggerDeleteDataSetsStrategyReducer = (state: LogixUXServerState): LogixUXServerState => {
  return {
    ...state,
    dataSetSelection: state.dataSetSelection.map(() => false)
  };
};

export const logixUXServerTriggerDeleteDataSetsStrategyQuality = createQuality(
  logixUXServerTriggerDeleteDataSetsStrategyType,
  logixUXServerTriggerDeleteDataSetsStrategyReducer,
  logixUXServerTriggerDeleteDataSetsStrategyMethodCreator,
);
/*#>*/