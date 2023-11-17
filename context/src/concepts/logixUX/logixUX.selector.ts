import { Concepts, createUnifiedKeyedSelector } from 'stratimux';

export const logixUX_createDialogSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'dialog');
};
export const logixUX_createCountSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'count');
};

export const logixUX_createTrainingDataSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'trainingData');
};

export const logixUX_createDPOSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'activeDPO');
};

export const logixUX_createSideBarExpandedSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'sideBarExpanded');
};

export const logixUX_createPagesSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'pages');
};
