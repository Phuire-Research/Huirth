/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that will randomly generate a series of steps that will either increment or decrement a unified Counter Concept.
$>*/
/*<#*/
import { counterAdd, counterSubtract, createActionNode, createStrategy, Deck } from 'stratimux';
import { HuirthDeck } from '../huirth.concept';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const huirthGenerateCountingStrategy = (count: number, deck: Deck<HuirthDeck>) => {
  const length = Math.round(getRandomRange(1, 20));
  let numPos = 0;
  let numNeg = 0;
  const firstRand = Math.round(getRandomRange(1, 5));
  const firstAction = firstRand % 2 === 0 ? deck.counter.e.counterAdd() : deck.counter.e.counterSubtract();
  let previousStep = createActionNode(firstAction);
  const stepFirst = previousStep;
  if (firstRand % 2 === 0) {
    numPos++;
  } else {
    numNeg--;
  }
  for (let i = 1; i < length; i++) {
    const even = Math.round(getRandomRange(1, 5)) % 2;
    const action = even ? deck.counter.e.counterAdd() : deck.counter.e.counterSubtract();
    const newStep = createActionNode(action);
    if (even) {
      numPos++;
    } else {
      numNeg--;
    }

    previousStep.successNode = newStep;
    previousStep = newStep;
  }
  previousStep.successNode = null;

  const topic = `Generated Counting Strategy from: ${count}, using ${numPos} Adds and ${numNeg} Subtracts`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
/*#>*/
