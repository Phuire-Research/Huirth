/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that accepts the current count and conceptSemaphore to have a unified Counter Concept be decremented seven times.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { HuirthDeck } from '../huirth.concept';

export const huirthMinusSevenStrategy = (count: number, deck: Deck<HuirthDeck>) => {
  const { counterSubtract } = deck.counter.e;
  const stepSeventh = createActionNode(counterSubtract());
  const stepSix = createActionNode(counterSubtract(), {
    successNode: stepSeventh,
  });
  const stepFifth = createActionNode(counterSubtract(), {
    successNode: stepSix,
  });
  const StepFourth = createActionNode(counterSubtract(), {
    successNode: stepFifth,
  });
  const stepThird = createActionNode(counterSubtract(), {
    successNode: StepFourth,
  });
  const stepSecond = createActionNode(counterSubtract(), {
    successNode: stepThird,
  });
  const stepFirst = createActionNode(counterSubtract(), {
    successNode: stepSecond,
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
