/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { AnyConcept, MuxiumDeck, Concept, KeyedSelector, PrincipleFunction, createConcept, muxifyConcepts } from '@phuire/stratimux';
import { BoundSelectors, Composition, Page, PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceAddComposedPageToState } from './qualities/addComposedPageToState.quality';
import { userInterfaceInitializationPrinciple } from './userInterface.principle';
import { createHtmlConcept } from '../html/html.concepts';
import { userInterfaceRefreshCachedSelectors } from './qualities/refreshPageCachedSelectors.quality';
import { userInterfaceEnd } from './qualities/end.quality';
import { userInterfaceUpdateAtomicPageComposition } from './qualities/updateAtomicPageComposition.quality';
import { userInterfaceAddNewPage } from './qualities/addNewPage.quality';
import { userInterfaceRemovePage } from './qualities/removePage.quality';
import { userInterfaceUpdateUniversalComponent } from './qualities/updateUniversalComponent.quality';
import { userInterfaceNext } from './qualities/next.quality';

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

export const createUserInterfaceState = (pageStrategies: PageStrategyCreators[]): UserInterfaceState => {
  return {
    pages: [],
    components: [],
    pageStrategies,
    pagesCached: false,
    boundSelectors: {},
    selectors: [],
  };
};

export const userInterfaceQualities = {
  userInterfaceAddComposedPageToState,
  userInterfaceRefreshCachedSelectors,
  userInterfaceUpdateAtomicPageComposition,
  userInterfaceUpdateUniversalComponent,
  userInterfaceAddNewPage,
  userInterfaceRemovePage,
  userInterfaceEnd,
  userInterfaceNext,
};

export type UserInterfaceDeck = {
  userInterface: Concept<UserInterfaceState, typeof userInterfaceQualities>;
};
export type UserInterfacePrinciple = PrincipleFunction<typeof userInterfaceQualities, MuxiumDeck & UserInterfaceDeck, UserInterfaceState>;

export const createUserInterfaceConcept = (pageStrategies: PageStrategyCreators[]): AnyConcept => {
  return muxifyConcepts(
    [createHtmlConcept()],
    createConcept(userInterfaceName, createUserInterfaceState(pageStrategies), userInterfaceQualities, [
      userInterfaceInitializationPrinciple,
    ])
  );
};
/*#>*/
