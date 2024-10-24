/*<$
For the graph programming framework Stratimux generate a User Interface Client Concept, that will unify itself with the User Interface and incoming Brand concept to be loaded onto the client.
$>*/
/*<#*/
import { AnyConcept, MuxiumDeck, Concept, createConcept, muxifyConcepts, PrincipleFunction } from 'stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState, createUserInterfaceConcept, userInterfaceQualities } from '../userInterface/userInterface.concept';
import { userInterfaceClientAssembleAtomicUpdateCompositionStrategy } from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';
import { userInterfaceClientDetermineBindings } from './qualities/clientDetermineBindings.quality';
import { userInterfaceClientReplaceOuterHtml } from './qualities/replaceOuterHtml.quality';
import { userInterfaceClientOnChangePrinciple } from './userInterfaceClient.principle';
import { createWebSocketClientConcept } from '../webSocketClient/webSocketClient.concept';
import { DocumentObjectModelDeck } from '../documentObjectModel/documentObjectModel.concept';

export const userInterfaceClientName = 'userInterfaceClient';

export type UserInterfaceClientState = {
  currentPage: string;
} & UserInterfaceState;

const createUserInterfaceClientState = (): UserInterfaceClientState => {
  const id = document.querySelector('[id^="page#"]')?.id;
  if (id) {
    return {
      pages: [],
      components: [],
      pagesCached: false,
      pageStrategies: [],
      currentPage: id.split('page#')[1],
      boundSelectors: {},
      selectors: [],
    };
  } else {
    return {
      pages: [],
      components: [],
      pageStrategies: [],
      pagesCached: false,
      currentPage: '',
      boundSelectors: {},
      selectors: [],
    };
  }
};

const userInterfaceClientQualities = {
  userInterfaceClientAssembleAtomicUpdateCompositionStrategy,
  userInterfaceClientDetermineBindings,
  userInterfaceClientReplaceOuterHtml,
};

export type UserInterfaceClientDeck = {
  userInterfaceClient: Concept<UserInterfaceState, typeof userInterfaceClientQualities & typeof userInterfaceQualities>;
} & DocumentObjectModelDeck;

export type UserInterfaceClientPrinciple = PrincipleFunction<
  typeof userInterfaceClientQualities,
  MuxiumDeck & UserInterfaceClientDeck,
  UserInterfaceClientState
>;

export const createUserInterfaceClientConcept = (state?: Record<string, unknown>, brandCreator?: () => AnyConcept): AnyConcept => {
  const newState: Record<string, unknown> = {};
  if (state) {
    const stateKeys = Object.keys(state);
    for (const key of stateKeys) {
      if (key !== 'pages' && key !== 'pageStrategies' && key !== 'pagesCached' && key !== 'currentPage' && key !== 'actionQue') {
        newState[key] = state[key];
      }
    }
  }
  const muxified = brandCreator
    ? muxifyConcepts(
        [
          createHtmlConcept(),
          createWebSocketClientConcept(),
          createUserInterfaceConcept([]),
          createConcept('', createUserInterfaceClientState(), userInterfaceClientQualities, [userInterfaceClientOnChangePrinciple]),
          brandCreator(),
        ],
        createConcept(userInterfaceClientName, newState)
      )
    : muxifyConcepts(
        [
          createHtmlConcept(),
          createWebSocketClientConcept(),
          createUserInterfaceConcept([]),
          createConcept('', createUserInterfaceClientState(), userInterfaceQualities, [userInterfaceClientOnChangePrinciple]),
        ],
        createConcept(userInterfaceClientName, newState)
      );
  return muxified;
};
/*#>*/
