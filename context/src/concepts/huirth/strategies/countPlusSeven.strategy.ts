/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be incremented seven times.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { HuirthDeck } from '../huirth.concept';

export const huirthPlusSevenStrategy = (count: number, deck: Deck<HuirthDeck>) => {
  const { counterAdd } = deck.counter.e;
  const stepSeventh = createActionNode(counterAdd());
  const stepSix = createActionNode(counterAdd(), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterAdd(), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterAdd(), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterAdd(), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterAdd(), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterAdd(), {
    successNode: stepSecond,
  });

  const topic = `Add Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
