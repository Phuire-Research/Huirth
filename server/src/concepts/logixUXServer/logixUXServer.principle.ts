import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
} from 'stratimux';
// import { LogixUXServerState } from './logixUXServer.concept';
// import { logixUXServerTriggerSaveTrainingDataStrategy } from '../logixUXServer/qualities/triggerSaveTrainingDataStrategy.quality';

// Should be converted into its own server bindings principle.
export const logixUXServerPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    // const plan = concepts$.stage('Observer Save Trigger Flag', [
    //   (concepts, dispatch) => {
    //     const conceptName = getUnifiedName(concepts, semaphore);
    //     if (conceptName) {
    //       dispatch(axiumRegisterStagePlanner({conceptName, stagePlanner: plan}), {
    //         iterateStage: true,
    //       });
    //     } else {
    //       plan.conclude();
    //     }
    //   },
    //   (concepts, dispatch) => {
    //     plan.conclude();
    //   },
    // ]);
  };