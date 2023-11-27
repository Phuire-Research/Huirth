/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the save training data ActionStrategy.
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
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';

export const logixUXServerTriggerSaveTrainingDataStrategyType: ActionType = 'logixUXServer trigger save training data strategy';
export const logixUXServerTriggerSaveTrainingDataStrategy =
  prepareActionCreator(logixUXServerTriggerSaveTrainingDataStrategyType);

const createLogixUXServerTriggerSaveTrainingDataStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore as number);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (state && fileSystemState) {
        const strategy = logixUXServerSaveTrainingDataStrategy(fileSystemState.root, state.trainingData);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXServerTriggerSaveTrainingDataStrategyQuality = createQuality(
  logixUXServerTriggerSaveTrainingDataStrategyType,
  defaultReducer,
  createLogixUXServerTriggerSaveTrainingDataStrategyMethodCreator,
);
/*#>*/