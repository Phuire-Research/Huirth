/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be decremented seven times.
$>*/
/*<#*/
import { counterSubtract, createActionNode, createStrategy } from '@phuire/stratimux';

export const huirthMinusSevenStrategy = (count: number, conceptSemaphore: number) => {
  const stepSeventh = createActionNode(counterSubtract({ conceptSemaphore }));
  const stepSix = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterSubtract({ conceptSemaphore }), {
    successNode: stepSecond,
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
