/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { Composition, Page, PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceAddComposedPageToStateQuality } from './qualities/addComposedPageToState.quality';
import { userInterfaceInitializationPrinciple } from './userInterface.principle';
import { createHtmlConcept } from '../html/html.concepts';
import { userInterfaceRefreshCachedSelectorsQuality } from './qualities/refreshPageCachedSelectors.quality';
import { userInterfaceEndQuality } from './qualities/end.quality';
import { userInterfaceUpdateAtomicPageCompositionQuality } from './qualities/updateAtomicPageComposition.quality';
import { userInterfaceAddNewPageQuality } from './qualities/addNewPage.quality';
import { userInterfaceRemovePageQuality } from './qualities/removePage.quality';
import { userInterfaceUpdateUniversalComponentQuality } from './qualities/updateUniversalComponent.quality';
import { userInterfaceNextQuality } from './qualities/next.quality';

export const userInterfaceName = 'userInterface';

export type UserInterfaceState = {
  pages: Page[];
  components: Composition[];
  pageStrategies: PageStrategyCreators[];
  pagesCached: boolean;
};

const createUserInterfaceState = (pageStrategies: PageStrategyCreators[]): UserInterfaceState => {
  return {
    pages: [],
    components: [],
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
        userInterfaceUpdateAtomicPageCompositionQuality,
        userInterfaceUpdateUniversalComponentQuality,
        userInterfaceAddNewPageQuality,
        userInterfaceRemovePageQuality,
        userInterfaceEndQuality,
        userInterfaceNextQuality,
      ],
      [userInterfaceInitializationPrinciple]
    )
  );
};
/*#>*/
