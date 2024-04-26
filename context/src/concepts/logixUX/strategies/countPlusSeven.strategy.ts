/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an ActionStrategy that accepts the current count and semaphore to have a unified Counter Concept be incremented seven times.
$>*/
/*<#*/
import { counterAdd, createActionNode, createStrategy } from 'stratimux';

export const logixUXPlusSevenStrategy = (count: number, semaphore: number) => {
  const stepSeventh = createActionNode(counterAdd(semaphore));
  const stepSix = createActionNode(counterAdd(semaphore), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterAdd(semaphore), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterAdd(semaphore), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterAdd(semaphore), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterAdd(semaphore), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterAdd(semaphore), {
    successNode: stepSecond,
  });

  const topic = `Add Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
