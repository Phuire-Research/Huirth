/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the save data set selection ActionStrategy.
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
import { logixUXServerSaveDataSetSelectionStrategy } from '../strategies/saveDataSetSelection.strategy';
import { LogixUXServerState } from '../logixUXServer.concept';

export type LogixUXServerTriggerSaveDataSetSelectionStrategyPayload = {
  names: string[]
}
export const logixUXServerTriggerSaveDataSetSelectionStrategyType: ActionType = 'logixUXServer trigger save data set selection strategy';
export const logixUXServerTriggerSaveDataSetSelectionStrategy =
  prepareActionCreator(logixUXServerTriggerSaveDataSetSelectionStrategyType);

const createLogixUXServerTriggerSaveDataSetSelectionStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const {names} = selectPayload<LogixUXServerTriggerSaveDataSetSelectionStrategyPayload>(action);
      const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore as number);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState && state) {
        const {trainingData} = state;
        const strategy = logixUXServerSaveDataSetSelectionStrategy(fileSystemState.root, trainingData, names);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXServerTriggerSaveDataSetSelectionStrategyQuality = createQuality(
  logixUXServerTriggerSaveDataSetSelectionStrategyType,
  defaultReducer,
  createLogixUXServerTriggerSaveDataSetSelectionStrategyMethodCreator,
);
/*#>*/