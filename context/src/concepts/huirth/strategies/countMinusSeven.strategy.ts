/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and semaphore to have a unified Counter Concept be decremented seven times.
$>*/
/*<#*/
import { counterSubtract, createActionNode, createStrategy } from 'stratimux';

export const huirthMinusSevenStrategy = (count: number, semaphore: number) => {
  const stepSeventh = createActionNode(counterSubtract(semaphore));
  const stepSix = createActionNode(counterSubtract(semaphore), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterSubtract(semaphore), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterSubtract(semaphore), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterSubtract(semaphore), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterSubtract(semaphore), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterSubtract(semaphore), {
    successNode: stepSecond,
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
