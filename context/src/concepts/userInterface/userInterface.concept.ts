/*<$
For the framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { Page, PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceAddComposedPageToStateQuality } from './qualities/addComposedPageToState.quality';
import { userInterfaceInitializationPrinciple } from './userInterface.principle';
import { createHtmlConcept } from '../html/html.concepts';
import { userInterfaceRefreshCachedSelectorsQuality } from './qualities/refreshPageCachedSelectors.quality';
import { userInterfaceEndQuality } from './qualities/end.quality';
import { userInterfaceAtomicUpdatePageCompositionQuality } from './qualities/atomicUpdatePageComposition.quality';
import { userInterfaceAddNewPageQuality } from './qualities/addNewPage.quality';

export const userInterfaceName = 'userInterface';

export type UserInterfaceState = {
  pages: Page[];
  pageStrategies: PageStrategyCreators[];
  pagesCached: boolean;
};

const createUserInterfaceState = (pageStrategies: PageStrategyCreators[]): UserInterfaceState => {
  return {
    pages: [],
    pageStrategies,
    pagesCached: false,
  };
};

export const createUserInterfaceConcept = (pageStrategies: PageStrategyCreators[]): Concept => {
  return unifyConcepts(
    [createHtmlConcept()],
    createConcept(
      userInterfaceName,
      createUserInterfaceState(pageStrategies),
      [
        userInterfaceAddComposedPageToStateQuality,
        userInterfaceRefreshCachedSelectorsQuality,
        userInterfaceAtomicUpdatePageCompositionQuality,
        userInterfaceAddNewPageQuality,
        userInterfaceEndQuality,
      ],
      [userInterfaceInitializationPrinciple]
    )
  );
};
/*#>*/
