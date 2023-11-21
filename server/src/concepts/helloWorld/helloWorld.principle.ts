/*<$*/
// PROMPT: For the framework Stratimux generate a Hello World Concept.
/*$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  primeAction
} from 'stratimux';
import { Subscriber } from 'rxjs';
import { helloWorld } from './qualities/helloWorld.quality';
import { helloWorldName } from './helloWorld.concept';

export const helloWorldPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  _concepts: Concepts,
  concepts$: UnifiedSubject,
  _semaphore: number
) => {
  const plan = concepts$.stage('Hello World Plan', [
    (concepts, dispatch) => {
      dispatch(primeAction(concepts, axiumRegisterStagePlanner({conceptName: helloWorldName, stagePlanner: plan})), {
        iterateStage: true,
        on: {
          selector: axiumSelectOpen,
          expected: true
        },
      });
    },
    (__, dispatch) => {
      dispatch(helloWorld(), {
        iterateStage: true
      });
    },
    (__, ___) => {
      plan.conclude();
    }
  ]);
};
/*#>*/