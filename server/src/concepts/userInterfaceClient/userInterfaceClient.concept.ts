import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState, createUserInterfaceConcept } from '../userInterface/userInterface.concept';
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

const createUserInterfaceClientState = (): UserInterfaceClientState => {
  const id = document.querySelector('[id^="page#"]')?.id;
  if (id) {
    return {
      pages: [],
      pagesCached: false,
      pageStrategies: [],
      currentPage: id.split('page#')[1],
    };
  } else {
    return {
      pages: [],
      pageStrategies: [],
      pagesCached: false,
      currentPage: '',
    };
  }
};

// For now we are setting this ourselves. The ideal situation would be that this would be determined
// via the interface this UI is intended for.
export const createUserInterfaceClientConcept = (state?: Record<string, unknown>, brandCreator?: () => Concept): Concept => {
  const newState: Record<string, unknown> = {};
  if (state) {
    const stateKeys = Object.keys(state);
    for (const key of stateKeys) {
      if (key !== 'pages' && key !== 'pageStrategies' && key !== 'pagesCached' && key !== 'currentPage' && key !== 'actionQue') {
        newState[key] = state[key];
      }
    }
  }
  const unified = brandCreator ? unifyConcepts([
    createHtmlConcept(),
    createWebSocketClientConcept(),
    createUserInterfaceConcept([]),
    createConcept(
      '',
      createUserInterfaceClientState(),
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
    ),
    brandCreator(),
  ],
  createConcept(
    userInterfaceClientName,
    newState,
  )) : unifyConcepts([
    createHtmlConcept(),
    createWebSocketClientConcept(),
    createUserInterfaceConcept([]),
    createConcept(
      '',
      createUserInterfaceClientState(),
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
    ),
  ],
  createConcept(
    userInterfaceClientName,
    newState,
  ));
  // console.log('CHECK UNIFIED', unified);
  return unified;
};