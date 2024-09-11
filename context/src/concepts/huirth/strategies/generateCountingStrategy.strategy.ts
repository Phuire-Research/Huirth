/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that will randomly generate a series of steps that will either increment or decrement a unified Counter Concept.
$>*/
/*<#*/
import { counterAdd, counterSubtract, createActionNode, createStrategy } from '@phuire/stratimux';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const huirthGenerateCountingStrategy = (count: number, conceptSemaphore: number) => {
  const length = Math.round(getRandomRange(1, 20));
  let numPos = 0;
  let numNeg = 0;
  const firstRand = Math.round(getRandomRange(1, 5));
  const firstAction = firstRand % 2 === 0 ? counterAdd({ conceptSemaphore }) : counterSubtract({ conceptSemaphore });
  let previousStep = createActionNode(firstAction);
  const stepFirst = previousStep;
  if (firstRand % 2 === 0) {
    numPos++;
  } else {
    numNeg--;
  }
  for (let i = 1; i < length; i++) {
    const even = Math.round(getRandomRange(1, 5)) % 2;
    const action = even ? counterAdd({ conceptSemaphore }) : counterSubtract({ conceptSemaphore });
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
