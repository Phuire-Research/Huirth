/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be incremented seven times.
$>*/
/*<#*/
import { counterAdd, createActionNode, createStrategy } from '@phuire/stratimux';

export const huirthPlusSevenStrategy = (count: number) => {
  const stepSeventh = createActionNode(counterAdd.actionCreator());
  const stepSix = createActionNode(counterAdd.actionCreator(), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterAdd.actionCreator(), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterAdd.actionCreator(), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterAdd.actionCreator(), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterAdd.actionCreator(), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterAdd.actionCreator(), {
    successNode: stepSecond,
  });

  const topic = `Add Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
