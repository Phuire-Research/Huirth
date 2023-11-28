/*<$
For the graph programming framework Stratimux and the brand Concept logixUX, generate a series of unified selector creators that will select slices of logixUX's state.
$>*/
/*<#*/
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

export const logixUX_createDataSetSelector = (concepts: Concepts, semaphore: number, index: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, `trainingData ${index}`);
};

export const logixUX_createDataSetSelectionSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'dataSetSelection');
};

export const logixUX_createStratimuxStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'stratimuxStatus');
};

export const logixUX_createLogixUXStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'logixUXStatus');
};

export const logixUX_createProjectStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'projectStatus');
};

export const logixUX_createPossibleProjectValidSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'possibleProjectValid');
};
/*#>*/
