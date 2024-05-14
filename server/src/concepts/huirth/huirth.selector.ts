/*<$
For the graph programming framework Stratimux and the brand Concept huirth, generate a series of unified selector creators that will select slices of huirth's state.
$>*/
/*<#*/
import { Concepts, createUnifiedKeyedSelector  } from 'stratimux';
import { huirthState } from './huirth.concept';

export const huirth_createDialogSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'dialog');
};
export const huirth_createCountSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'count');
};

export const huirth_createTrainingDataSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'trainingData');
};

export const huirth_createDPOSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'activeDPO');
};

export const huirth_createSideBarExpandedSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'sideBarExpanded');
};

export const huirth_createPagesSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'pages');
};

export const huirth_createPageStrategiesSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector<huirthState>(concepts, semaphore, 'pageStrategies');
};

export const huirth_createDataSetSelector = (concepts: Concepts, semaphore: number, index: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'trainingData', [index]);
};

export const huirth_createDataSetSelectionSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'dataSetSelection');
};

export const huirth_createStratimuxStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'stratimuxStatus');
};

export const huirth_createHuirthStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'huirthStatus');
};

export const huirth_createProjectStatusSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'projectStatus');
};

export const huirth_createPossibleProjectValidSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'possibleProjectValid');
};

export const huirth_createSelectedTransformationSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector(concepts, semaphore, 'selectedTransformation');
};
/*#>*/