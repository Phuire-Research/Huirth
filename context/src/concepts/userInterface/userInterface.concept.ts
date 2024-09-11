/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { Concept, KeyedSelector, createConcept, unifyConcepts } from '@phuire/stratimux';
import { BoundSelectors, Composition, Page, PageStrategyCreators } from '../../model/userInterface';
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
  // string represents the verbose key of a KeyedSelector
  // This allows us to ensure that when changes are detected we select only valid entries from this primed record
  // Then use entries to assemble a new Record that only records each unique BoundSelector to be dispatch
  boundSelectors: Record<string, BoundSelectors[]>;
  selectors: KeyedSelector[];
};

const createUserInterfaceState = (pageStrategies: PageStrategyCreators[]): UserInterfaceState => {
  return {
    pages: [],
    components: [],
    pageStrategies,
    pagesCached: false,
    boundSelectors: {},
    selectors: [],
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
