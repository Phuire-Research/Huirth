/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be incremented seven times.
$>*/
/*<#*/
import { counterAdd, createActionNode, createStrategy } from 'stratimux';

export const huirthPlusSevenStrategy = (count: number, conceptSemaphore: number) => {
  const stepSeventh = createActionNode(counterAdd({ conceptSemaphore }));
  const stepSix = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterAdd({ conceptSemaphore }), {
    successNode: stepSecond,
  });

  const topic = `Add Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
