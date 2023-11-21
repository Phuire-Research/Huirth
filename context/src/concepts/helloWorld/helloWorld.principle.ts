import { Action, Concepts, PrincipleFunction, UnifiedSubject, axiumRegisterStagePlanner, axiumSelectOpen, primeAction } from 'stratimux';
import { Subscriber } from 'rxjs';
import { helloWorld } from './qualities/helloWorld.quality';
import { helloWorldName } from './helloWorld.concept';

export const helloWorldPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  _concepts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.stage('ownership Principle Plan', [
    (concepts, dispatch) => {
      dispatch(primeAction(concepts, axiumRegisterStagePlanner({ conceptName: helloWorldName, stagePlanner: plan })), {
        iterateStage: true,
        on: {
          selector: axiumSelectOpen,
          expected: true,
        },
      });
    },
    (__, dispatch) => {
      dispatch(helloWorld(), {
        iterateStage: true,
      });
    },
    (concepts, dispatch) => {
      plan.conclude();
      // console.log('Plan can conclude.');
    },
  ]);
};
