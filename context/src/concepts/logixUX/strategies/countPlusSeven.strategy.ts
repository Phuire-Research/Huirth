/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an ActionStrategy that accepts the current count and semaphore to have a unified Counter Concept be incremented seven times.
$>*/
/*<#*/
import { counterAdd, createActionNode, createStrategy } from 'stratimux';

export const logixUXPlusSevenStrategy = (count: number, semaphore: number) => {
  const stepSeventh = createActionNode(counterAdd(semaphore), {
    successNode: null,
    failureNode: null,
  });
  const stepSix = createActionNode(counterAdd(semaphore), {
    successNode: stepSeventh,
    failureNode: null,
  });
  const stepFifth = createActionNode(counterAdd(semaphore), {
    successNode: stepSix,
    failureNode: null,
  });
  const StepFourth = createActionNode(counterAdd(semaphore), {
    successNode: stepFifth,
    failureNode: null,
  });
  const stepThird = createActionNode(counterAdd(semaphore), {
    successNode: StepFourth,
    failureNode: null,
  });
  const stepSecond = createActionNode(counterAdd(semaphore), {
    successNode: stepThird,
    failureNode: null,
  });
  const stepFirst = createActionNode(counterAdd(semaphore), {
    successNode: stepSecond,
    failureNode: null,
  });

  const topic = `Add Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
