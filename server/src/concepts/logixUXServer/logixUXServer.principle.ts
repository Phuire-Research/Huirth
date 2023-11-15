import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getUnifiedName,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { logixUXServerInitializationStrategy } from './strategies/initialization.strategy';
// import { LogixUXServerState } from './logixUXServer.concept';
// import { logixUXServerTriggerSaveTrainingDataStrategy } from '../logixUXServer/qualities/triggerSaveTrainingDataStrategy.quality';

// Should be converted into its own server bindings principle.
export const logixUXServerPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const plan = concepts$.stage('Observer Save Trigger Flag', [
      (concepts, dispatch) => {
        const conceptName = getUnifiedName(concepts, semaphore);
        if (conceptName) {
          dispatch(axiumRegisterStagePlanner({conceptName, stagePlanner: plan}), {
            iterateStage: true,
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const root = selectState<FileSystemState>(concepts, fileSystemName)?.root;
        if (root) {
          dispatch(strategyBegin(logixUXServerInitializationStrategy(root)), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        plan.conclude();
      },
    ]);
  };