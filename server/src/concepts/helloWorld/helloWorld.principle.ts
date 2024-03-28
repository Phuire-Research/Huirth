/*<$
For the graph programming framework Stratimux generate a Hello World Concept.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  primeAction,
  stageWaitForOpenThenIterate
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
  const plan = concepts$.plan('Hello World Plan', [
    stageWaitForOpenThenIterate(() => (axiumRegisterStagePlanner({conceptName: helloWorldName, stagePlanner: plan}))),
    createStage((__, dispatch) => {
      dispatch(helloWorld(), {
        iterateStage: true
      });
    }),
    createStage((__, ___) => {
      plan.conclude();
    })
  ]);
};
/*#>*/