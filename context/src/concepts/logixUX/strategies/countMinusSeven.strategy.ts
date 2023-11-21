import { axiumKick, counterAdd, counterSubtract, createActionNode, createStrategy, refreshAction } from 'stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const logixUXMinusSevenStrategy = (count: number, semaphore: number) => {
  // Body
  // const length = Math.round(getRandomRange(1, 5));
  // let numPos = 0;
  // let numNeg = 0;
  // const firstRand = Math.round(getRandomRange(1, 5));
  // let previousStep = createActionNode(firstRand % 2 === 0 ? counterAdd(semaphore) : counterSubtract(semaphore), {
  //   successNode: null,
  //   failureNode: null
  // });
  // const stepFirst = previousStep;
  // if (firstRand % 2 === 0) {
  //   numPos++;
  // } else {
  //   numNeg--;
  // }
  // for (let i = 1; i < length; i++) {
  //   const rand = Math.round(getRandomRange(1, 5));
  //   const newStep = createActionNode(rand % 2 === 0 ? counterAdd(semaphore) : counterSubtract(semaphore), {
  //     successNode: null,
  //     failureNode: null
  //   });
  //   if (firstRand % 2 === 0) {
  //     numPos++;
  //   } else {
  //     numNeg--;
  //   }

  //   previousStep.successNode = newStep;
  //   previousStep = newStep;
  // }
  // const stepKick = createActionNode(axiumKick(), {
  //   successNode: null,
  //   failureNode: null
  // });
  // previousStep.successNode = stepFirst;
  const stepSeventh = createActionNode(counterSubtract(semaphore), {
    successNode: null,
    failureNode: null
  });
  const stepSix = createActionNode(counterSubtract(semaphore), {
    successNode: stepSeventh,
    failureNode: null
  });
  const stepFifth = createActionNode(counterSubtract(semaphore), {
    successNode: stepSix,
    failureNode: null
  });
  const StepFourth = createActionNode(counterSubtract(semaphore), {
    successNode: stepFifth,
    failureNode: null
  });
  const stepThird = createActionNode(counterSubtract(semaphore), {
    successNode: StepFourth,
    failureNode: null
  });
  const stepSecond = createActionNode(counterSubtract(semaphore), {
    successNode: stepThird,
    failureNode: null
  });
  const stepFirst = createActionNode(counterSubtract(semaphore), {
    successNode: stepSecond,
    failureNode: null
  });

  const topic = `Minus Seven Strategy from: ${count}`;
  // const topic = `Counting Strategy from: ${count}, using ${numPos} Adds and ${numNeg} Subtracts`;
  return createStrategy({
    initialNode: stepFirst,
    topic,
  });
};
