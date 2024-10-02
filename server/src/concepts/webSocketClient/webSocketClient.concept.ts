/*<$
For the graph programming framework Stratimux generate a Web Socket Client Concept, that will create a message stream between the client and server.
This message stream should establish each governing concept's semaphore so that messages are not invalidated.
$>*/
/*<#*/
import { webSocketClientAppendToActionQue } from './qualities/appendActionQue.quality';
import { webSocketClientForceSync } from './qualities/forceSync.quality';
import { webSocketClientSetServerSemaphore } from './qualities/setServerSemaphore.quality';
import { webSocketClientPrinciple } from './webSocketClient.principle';
import { AnyAction, MuxiumDeck, Concept, createConcept, PrincipleFunction } from '@phuire/stratimux';

export type WebSocketClientState = {
  actionQue: AnyAction[];
  serverSemaphore: number;
};

export const webSocketClientName = 'webSocketClient';

const initialWebSocketClientState = (): WebSocketClientState => {
  return {
    actionQue: [],
    serverSemaphore: -1,
  };
};

export const webSocketClientQualities = { webSocketClientAppendToActionQue, webSocketClientSetServerSemaphore, webSocketClientForceSync };
export type WebSocketClientDeck = {
  webSocketClient: Concept<typeof webSocketClientQualities, WebSocketClientState>;
};
export type WebSocketClientPrinciple = PrincipleFunction<
  typeof webSocketClientQualities,
  MuxiumDeck & WebSocketClientDeck,
  WebSocketClientState
>;

export const createWebSocketClientConcept = () => {
  return createConcept<WebSocketClientState, typeof webSocketClientQualities>(
    webSocketClientName,
    initialWebSocketClientState(),
    webSocketClientQualities,
    [webSocketClientPrinciple]
  );
};
/*#>*/
