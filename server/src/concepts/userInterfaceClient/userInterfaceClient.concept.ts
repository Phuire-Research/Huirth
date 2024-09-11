/*<$
For the graph programming framework Stratimux generate a User Interface Client Concept, that will unify itself with the User Interface and incoming Brand concept to be loaded onto the client.
$>*/
/*<#*/
import { AnyConcept, AxiumDeck, Concept, createConcept, muxifyConcepts, PrincipleFunction } from '@phuire/stratimux';
import { createHtmlConcept } from '../html/html.concepts';
import { UserInterfaceState, createUserInterfaceConcept } from '../userInterface/userInterface.concept';
import { userInterfaceClientAssembleAtomicUpdateCompositionStrategy } from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';
import { userInterfaceClientDetermineBindings } from './qualities/clientDetermineBindings.quality';
import { userInterfaceClientReplaceOuterHtml } from './qualities/replaceOuterHtml.quality';
import { userInterfaceClientOnChangePrinciple } from './userInterfaceClient.principle';
import { createWebSocketClientConcept } from '../webSocketClient/webSocketClient.concept';
import { userInterfaceQualities } from '../userInterfaceServer/userInterfaceServer.concept';

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
  userInterfaceClient: Concept<UserInterfaceState, typeof userInterfaceClientQualities>
};

export type UserInterfaceClientPrinciple = PrincipleFunction<typeof userInterfaceClientQualities, AxiumDeck & UserInterfaceClientDeck, UserInterfaceState>;

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
        createConcept(
          '',
          createUserInterfaceClientState(),
          userInterfaceClientQualities,
          [userInterfaceClientOnChangePrinciple as unknown as PrincipleFunction<typeof userInterfaceQualities>]
        ),
        brandCreator(),
      ],
      createConcept(userInterfaceClientName, newState)
    )
    : muxifyConcepts(
      [
        createHtmlConcept(),
        createWebSocketClientConcept(),
        createUserInterfaceConcept([]),
        createConcept(
          '',
          createUserInterfaceClientState(),
          userInterfaceQualities,
          [userInterfaceClientOnChangePrinciple as unknown as PrincipleFunction<typeof userInterfaceQualities>]
        ),
      ],
      createConcept(userInterfaceClientName, newState)
    );
  return muxified;
};
/*#>*/
