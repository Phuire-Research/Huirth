import { axiumKick, counterAdd, counterSubtract, createActionNode, createStrategy, refreshAction } from 'stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const logixUXGenerateCountingStrategy = (count: number, semaphore: number) => {
  const length = Math.round(getRandomRange(1, 10));
  let numPos = 0;
  let numNeg = 0;
  const firstRand = Math.round(getRandomRange(1, 5));
  const firstAction = firstRand % 2 === 0 ? counterAdd(semaphore) : counterSubtract(semaphore);
  let previousStep = createActionNode(firstAction, {
    successNode: null,
    failureNode: null
  });
  const stepFirst = previousStep;
  if (firstRand % 2 === 0) {
    numPos++;
  } else {
    numNeg--;
  }
  for (let i = 1; i < length; i++) {
    const even = Math.round(getRandomRange(1, 5)) % 2;
    const action = even ? counterAdd(semaphore) : counterSubtract(semaphore);
    const newStep = createActionNode(action, {
      successNode: null,
      failureNode: null
    });
    if (even) {
      numPos++;
    } else {
      numNeg--;
    }

    previousStep.successNode = newStep;
    previousStep = newStep;
  }
  previousStep.successNode = null;

  const topic = `Counting Strategy from: ${count}, using ${numPos} Adds and ${numNeg} Subtracts`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
