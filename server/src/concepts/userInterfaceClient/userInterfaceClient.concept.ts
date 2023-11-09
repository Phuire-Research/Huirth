import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { PageStrategyCreators } from '../../model/userInterface';
import { createLogixUXConcept, logixUXName } from '../logixUX/logixUX.concepts';
import { logixUXErrorPageStrategy } from '../logixUX/strategies/errorPage.strategy';
import { logixUXIndexPageStrategy } from '../logixUX/strategies/indexPage.strategy';
import { userInterfaceClientAssembleActionQueStrategyQuality } from './qualities/clientAssembleActionQueStrategy.quality';
import { userInterfaceClientDetermineBindingsQuality } from './qualities/clientDetermineBindings.quality';
import { userInterfaceClientReplaceOuterHtmlQuality } from './qualities/replaceOuterHtml.quality';
import { userInterfaceClientOnChangePrinciple } from './userInterfaceClient.principle';

export const userInterfaceClientName = 'userInterfaceClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type UserInterfaceClientState = {
  currentPage: string;
} & UserInterfaceState;

const createUserInterfaceClientState = (brand?: {
  name: string
  pageStrategies: PageStrategyCreators[],
}): UserInterfaceClientState => {
  if (brand) {
    const id = document.querySelector('[id^="page#"]')?.id;
    if (id) {
      return {
        pages: [],
        pageStrategies: brand.pageStrategies,
        pagesCached: false,
        currentPage: id.split('page#')[1]
      };
    }
  }
  return {
    pages: [],
    pageStrategies: [],
    pagesCached: false,
    currentPage: ''
  };
};

// For now we are setting this ourselves. The ideal situation would be that this would be determined
// via the interface this UI is intended for.
export const createUserInterfaceClientConcept = (): Concept => {
  return unifyConcepts([createHtmlConcept(), createLogixUXConcept()], createConcept(
    userInterfaceClientName,
    createUserInterfaceClientState({
      name: logixUXName,
      pageStrategies: [logixUXIndexPageStrategy, logixUXErrorPageStrategy]
    }),
    [
      // userInterfaceAddComposedPageToStateQuality,
      userInterfaceClientAssembleActionQueStrategyQuality,
      userInterfaceClientDetermineBindingsQuality,
      userInterfaceClientReplaceOuterHtmlQuality
    ],
    [
      // userInterfaceInitializationPrinciple
      userInterfaceClientOnChangePrinciple
    ]
  ));
};