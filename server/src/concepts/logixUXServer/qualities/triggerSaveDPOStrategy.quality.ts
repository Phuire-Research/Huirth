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
import { logixUXServerSaveDPOStrategy } from '../strategies/saveDPO.strategy';

export const logixUXServerTriggerSaveDPOStrategyType: ActionType = 'logixUXServer triggerSaveDPOStrategy';
export const logixUXServerTriggerSaveDPOStrategy =
  prepareActionCreator(logixUXServerTriggerSaveDPOStrategyType);

const createLogixUXServerTriggerSaveDPOStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore as number);
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (state && fileSystemState) {
        console.log('CHECK STRATEGY', state.activeDPO);
        const strategy = logixUXServerSaveDPOStrategy(fileSystemState.root, state.activeDPO);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXServerTriggerSaveDPOStrategyQuality = createQuality(
  logixUXServerTriggerSaveDPOStrategyType,
  defaultReducer,
  createLogixUXServerTriggerSaveDPOStrategyMethodCreator,
);