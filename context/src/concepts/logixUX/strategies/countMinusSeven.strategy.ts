/*<$
For the framework Stratimux and a Concept logixUX, generate an ActionStrategy that accepts the current count and semaphore to have a unified Counter Concept be decremented seven times.
$>*/
/*<#*/
import { counterSubtract, createActionNode, createStrategy } from 'stratimux';

export const logixUXMinusSevenStrategy = (count: number, semaphore: number) => {
  const stepSeventh = createActionNode(counterSubtract(semaphore), {
    successNode: null,
    failureNode: null,
  });
  const stepSix = createActionNode(counterSubtract(semaphore), {
    successNode: stepSeventh,
    failureNode: null,
  });
  const stepFifth = createActionNode(counterSubtract(semaphore), {
    successNode: stepSix,
    failureNode: null,
  });
  const StepFourth = createActionNode(counterSubtract(semaphore), {
    successNode: stepFifth,
    failureNode: null,
  });
  const stepThird = createActionNode(counterSubtract(semaphore), {
    successNode: StepFourth,
    failureNode: null,
  });
  const stepSecond = createActionNode(counterSubtract(semaphore), {
    successNode: stepThird,
    failureNode: null,
  });
  const stepFirst = createActionNode(counterSubtract(semaphore), {
    successNode: stepSecond,
    failureNode: null,
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
