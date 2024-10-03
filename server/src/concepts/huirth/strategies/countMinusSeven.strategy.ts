/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be decremented seven times.
$>*/
/*<#*/
import { counterSubtract, createActionNode, createStrategy } from 'stratimux';

export const huirthMinusSevenStrategy = (count: number) => {
  const stepSeventh = createActionNode(counterSubtract.actionCreator());
  const stepSix = createActionNode(counterSubtract.actionCreator(), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterSubtract.actionCreator(), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterSubtract.actionCreator(), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterSubtract.actionCreator(), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterSubtract.actionCreator(), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterSubtract.actionCreator(), {
    successNode: stepSecond,
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
