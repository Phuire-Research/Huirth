/*<$
For the graph programming framework Stratimux generate a Web Socket Server Concept, that will create a message stream between the server and client.
This message stream should establish each governing concept's semaphore so that messages are not invalidated.
$>*/
/*<#*/
import { webSocketServerAppendToActionQue } from './qualities/appendActionQue.quality';
import { webSocketServerSetClientSemaphore } from './qualities/setClientSemaphore.quality';
import { webSocketServerSyncState } from './qualities/syncState.quality';
import { webSocketServerPrinciple } from './webSocketServer.principle';
import { Action, MuxiumDeck, Concept, createConcept, PrincipleFunction } from 'stratimux';

export type WebSocketServerState = {
  actionQue: Action[];
  clientSemaphore: number;
};

export const webSocketServerName = 'webSocketServer';

const initialWebSocketServerState = (): WebSocketServerState => {
  return {
    actionQue: [],
    clientSemaphore: -1,
  };
};

export const webSocketServerQualities = { webSocketServerAppendToActionQue, webSocketServerSyncState, webSocketServerSetClientSemaphore };
export type WebSocketServerDeck = {
  webSocketServer: Concept<WebSocketServerState, typeof webSocketServerQualities>;
};
export type WebSocketServerPrinciple = PrincipleFunction<
  typeof webSocketServerQualities,
  MuxiumDeck & WebSocketServerDeck,
  WebSocketServerState
>;

export const createWebSocketServerConcept = () => {
  return createConcept<WebSocketServerState, typeof webSocketServerQualities>(
    webSocketServerName,
    initialWebSocketServerState(),
    webSocketServerQualities,
    [webSocketServerPrinciple]
  );
};
