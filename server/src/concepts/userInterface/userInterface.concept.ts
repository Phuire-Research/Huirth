import { ActionStrategyStitch, Concept, Concepts, createConcept, unifyConcepts } from 'stratimux';
import { Page, PageStrategyCreators } from '../../model/userInterface';
import { workingConceptCategory } from '../userInterfaceServer/userInterfaceServer.concept';
import { userInterfaceAddComposedPageToStateQuality } from './qualities/addComposedPageToState.quality';
import { userInterfaceInitializationPrinciple } from './userInterface.principle';
import { createHtmlConcept } from '../html/html.concepts';

export const userInterfaceName = 'userInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type UserInterfaceState = {
  pages: Page[],
  pageStrategies: PageStrategyCreators[],
}

const createUserInterfaceState = (pageStrategies: PageStrategyCreators[]): UserInterfaceState => {
  return {
    pages: [],
    pageStrategies,
  };
};

export const createUserInterfaceConcept = (pageStrategies: PageStrategyCreators[]): Concept => {
  return unifyConcepts([createHtmlConcept()], createConcept(
    userInterfaceName,
    createUserInterfaceState(pageStrategies),
    [
      userInterfaceAddComposedPageToStateQuality,
    ],
    [
      userInterfaceInitializationPrinciple
    ]
  ));
};