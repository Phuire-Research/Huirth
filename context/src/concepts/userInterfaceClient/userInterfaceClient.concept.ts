/*<$
For the graph programming framework Stratimux generate a User Interface Client Concept, that will unify itself with the User Interface and incoming Brand concept to be loaded onto the client.
$>*/
/*<#*/
import { Concept, createConcept, unifyConcepts } from 'stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState, createUserInterfaceConcept } from '../userInterface/userInterface.concept';
import { userInterfaceClientAssembleAtomicUpdateCompositionStrategyQuality } from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';
import { userInterfaceClientDetermineBindingsQuality } from './qualities/clientDetermineBindings.quality';
import { userInterfaceClientReplaceOuterHtmlQuality } from './qualities/replaceOuterHtml.quality';
import { userInterfaceClientOnChangePrinciple } from './userInterfaceClient.principle';
import { createWebSocketClientConcept } from '../webSocketClient/webSocketClient.concept';

export const userInterfaceClientName = 'userInterfaceClient';

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
        userInterfaceClientAssembleAtomicUpdateCompositionStrategyQuality,
        userInterfaceClientDetermineBindingsQuality,
        userInterfaceClientReplaceOuterHtmlQuality
      ],
      [
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
        userInterfaceClientAssembleAtomicUpdateCompositionStrategyQuality,
        userInterfaceClientDetermineBindingsQuality,
        userInterfaceClientReplaceOuterHtmlQuality
      ],
      [
        userInterfaceClientOnChangePrinciple
      ]
    ),
  ],
  createConcept(
    userInterfaceClientName,
    newState,
  ));
  return unified;
};
/*#>*/