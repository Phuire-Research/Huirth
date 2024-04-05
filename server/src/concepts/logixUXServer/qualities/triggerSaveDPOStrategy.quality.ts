/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a quality that will trigger the save DPO ActionStrategy.
$>*/
/*<#*/
import {
  ActionType,
  Concepts,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  nullReducer,
  prepareActionCreator,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUXServerSaveDPOStrategy } from '../strategies/saveDPO.strategy';
import { Subject } from 'rxjs';

export const logixUXServerTriggerSaveDPOStrategyType: ActionType = 'logixUXServer trigger save DPO strategy';
export const logixUXServerTriggerSaveDPOStrategy =
  prepareActionCreator(logixUXServerTriggerSaveDPOStrategyType);

const createLogixUXServerTriggerSaveDPOStrategyMethodCreator: MethodCreator = (concepts$?: Subject<Concepts>, semaphore?: number) =>
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
  );

export const logixUXServerTriggerSaveDPOStrategyQuality = createQuality(
  logixUXServerTriggerSaveDPOStrategyType,
  nullReducer,
  createLogixUXServerTriggerSaveDPOStrategyMethodCreator,
);
/*#>*/