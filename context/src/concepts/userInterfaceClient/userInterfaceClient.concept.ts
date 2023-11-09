import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState, createUserInterfaceConcept } from '../userInterface/userInterface.concept';
import { PageStrategyCreators } from '../../model/userInterface';
import { createLogixUXConcept, logixUXName } from '../logixUX/logixUX.concepts';
import { logixUXErrorPageStrategy } from '../logixUX/strategies/errorPage.strategy';
import { logixUXIndexPageStrategy } from '../logixUX/strategies/indexPage.strategy';
import { userInterfaceClientAssembleActionQueStrategyQuality } from './qualities/clientAssembleActionQueStrategy.quality';
import { userInterfaceClientDetermineBindingsQuality } from './qualities/clientDetermineBindings.quality';
import { userInterfaceClientReplaceOuterHtmlQuality } from './qualities/replaceOuterHtml.quality';
import { userInterfaceClientOnChangePrinciple } from './userInterfaceClient.principle';
import { createWebSocketClientConcept } from '../webSocketClient/webSocketClient.concept';

export const userInterfaceClientName = 'userInterfaceClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type UserInterfaceClientState = {
  currentPage: string;
} & UserInterfaceState;

const createUserInterfaceClientState = (
  newState: Record<string, unknown>,
  brand?: {
    name: string;
    pageStrategies: PageStrategyCreators[];
  }
): UserInterfaceClientState => {
  if (brand !== undefined) {
    const id = document.querySelector('[id^="page#"]')?.id;
    console.log('HIT HERE', id, document.querySelector('[id^="page#"]'));
    if (id) {
      return {
        pages: [],
        pageStrategies: brand.pageStrategies,
        pagesCached: false,
        currentPage: id.split('page#')[1],
        ...newState,
      };
    }
  }
  return {
    pages: [],
    pageStrategies: [],
    pagesCached: false,
    currentPage: '',
    ...newState,
  };
};

// For now we are setting this ourselves. The ideal situation would be that this would be determined
// via the interface this UI is intended for.
export const createUserInterfaceClientConcept = (state?: Record<string, unknown>): Concept => {
  const newState: Record<string, unknown> = {};
  if (state) {
    const stateKeys = Object.keys(state);
    for (const key of stateKeys) {
      if (key !== 'pages' && key !== 'pageStrategies' && key !== 'pagesCached' && key !== 'currentPage' && key !== 'actionQue') {
        newState[key] = state[key];
      }
    }
  }
  const unified = unifyConcepts(
    [
      createHtmlConcept(),
      createWebSocketClientConcept(),
      createLogixUXConcept(),
      createUserInterfaceConcept([logixUXIndexPageStrategy, logixUXErrorPageStrategy]),
    ],
    createConcept(
      userInterfaceClientName,
      createUserInterfaceClientState(newState, {
        name: logixUXName,
        pageStrategies: [logixUXIndexPageStrategy, logixUXErrorPageStrategy],
      }),
      [
        // userInterfaceAddComposedPageToStateQuality,
        userInterfaceClientAssembleActionQueStrategyQuality,
        userInterfaceClientDetermineBindingsQuality,
        userInterfaceClientReplaceOuterHtmlQuality,
      ],
      [
        // userInterfaceInitializationPrinciple
        userInterfaceClientOnChangePrinciple,
      ]
    )
  );
  return unified;
};
