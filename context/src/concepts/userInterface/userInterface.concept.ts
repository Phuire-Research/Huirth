import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { Page, PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceAddComposedPageToStateQuality } from './qualities/addComposedPageToState.quality';
import { userInterfaceInitializationPrinciple } from './userInterface.principle';
import { createHtmlConcept } from '../html/html.concepts';
import { userInterfaceRefreshCachedSelectorsQuality } from './qualities/refreshPageCachedSelectors.quality';
import { userInterfaceEndQuality } from './qualities/end.quality';

export const userInterfaceName = 'userInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

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
      [userInterfaceAddComposedPageToStateQuality, userInterfaceRefreshCachedSelectorsQuality, userInterfaceEndQuality],
      [userInterfaceInitializationPrinciple]
    )
  );
};
