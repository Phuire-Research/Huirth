/*<$
For the graph programming framework Stratimux generate a Web Socket Client Concept, that will create a message stream between the client and server.
This message stream should establish each governing concept's semaphore so that messages are not invalidated.
$>*/
/*<#*/
import { webSocketClientAppendToActionQueQuality } from './qualities/appendActionQue.quality';
import { webSocketClientForceSyncQuality } from './qualities/forceSync.quality';
import { webSocketClientSetServerSemaphoreQuality } from './qualities/setServerSemaphore.quality';
import { webSocketClientPrinciple } from './webSocketClient.principle';
import { Action, createConcept } from '@phuire/stratimux';

export type WebSocketClientState = {
  actionQue: Action[];
  serverSemaphore: number;
};

export const webSocketClientName = 'webSocketClient';

const initialWebSocketClientState = (): WebSocketClientState => {
  return {
    actionQue: [],
    serverSemaphore: -1,
  };
};

export const createWebSocketClientConcept = () => {
  return createConcept(
    webSocketClientName,
    initialWebSocketClientState(),
    [webSocketClientAppendToActionQueQuality, webSocketClientSetServerSemaphoreQuality, webSocketClientForceSyncQuality],
    [webSocketClientPrinciple]
  );
};
/*#>*/
