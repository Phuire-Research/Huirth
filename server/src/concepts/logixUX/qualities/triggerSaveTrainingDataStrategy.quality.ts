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
import { LogixUXState } from '../logixUX.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';

export const logixUXTriggerSaveTrainingDataStrategyType: ActionType = 'Create logixUX triggerSaveTrainingDataStrategy';
export const logixUXTriggerSaveTrainingDataStrategy =
  prepareActionCreator(logixUXTriggerSaveTrainingDataStrategyType);

const createLogixUXTriggerSaveTrainingDataStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const state = selectUnifiedState<LogixUXState>(concepts, semaphore as number);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (state && fileSystemState) {
        const strategy = logixUXSaveTrainingDataStrategy(fileSystemState.root, state.trainingData);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXTriggerSaveTrainingDataStrategyQuality = createQuality(
  logixUXTriggerSaveTrainingDataStrategyType,
  defaultReducer,
  createLogixUXTriggerSaveTrainingDataStrategyMethodCreator,
);