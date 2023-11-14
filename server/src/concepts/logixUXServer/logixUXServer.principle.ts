import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getSemaphore,
  getUnifiedName,
  primeAction,
  selectConcept,
  selectUnifiedState,
} from 'stratimux';
import { LogixUXServerState } from './logixUXServer.concept';
import { logixUXServerTriggerSaveTrainingDataStrategy } from '../logixUXServer/qualities/triggerSaveTrainingDataStrategy.quality';

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
        // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
        const state = selectUnifiedState<LogixUXServerState>(concepts, semaphore);
        if (state && state.triggerSave) {
          state.triggerSave = false;
          // console.log('Check qualities', concepts[semaphore].qualities);
          console.log('CHECK TRAINING DATA', state.trainingData);
          concepts$.next(concepts);
          dispatch(logixUXServerTriggerSaveTrainingDataStrategy(semaphore), {
            throttle: 50
          });
        }
      }
    ]);
  };