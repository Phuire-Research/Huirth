/*<$
For the graph programming framework Stratimux and the brand Concept huirth, generate a series of unified selector creators that will select slices of the user interface state.
$>*/
/*<#*/
import { Concepts, createMuxifiedKeyedSelector } from '@phuire/stratimux';
import { UserInterfaceState } from './userInterface.concept';

export const userInterface_createBoundSelectorsSelector = (concepts: Concepts, semaphore: number) => {
  return createMuxifiedKeyedSelector<UserInterfaceState>(concepts, semaphore, 'boundSelectors');
};
export const userInterface_createPagesSelector = (concepts: Concepts, semaphore: number) => {
  return createMuxifiedKeyedSelector<UserInterfaceState>(concepts, semaphore, 'pages');
};
/*#>*/
