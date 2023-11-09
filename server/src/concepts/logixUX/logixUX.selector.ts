import { Concepts, createUnifiedKeyedSelector } from 'stratimux';

export const logixUX_createDialogSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'dialog');
};
