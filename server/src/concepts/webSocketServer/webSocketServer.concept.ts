/*<$
For the graph programming framework Stratimux generate a Web Socket Server Concept, that will create a message stream between the server and client.
This message stream should establish each governing concept's semaphore so that messages are not invalidated.
$>*/
/*<#*/
import { webSocketServerAppendToActionQueQuality } from './qualities/appendActionQue.quality';
import { webSocketServerSetClientSemaphoreQuality } from './qualities/setClientSemaphore.quality';
import { webSocketServerSyncStateQuality } from './qualities/syncState.quality';
import { webSocketServerPrinciple } from './webSocketServer.principle';
import { Action, createConcept } from 'stratimux';

export type WebSocketServerState = {
  actionQue: Action[],
  clientSemaphore: number
};

export const webSocketServerName = 'webSocketServer';

const initialWebSocketServerState = (): WebSocketServerState => {
  return {
    actionQue: [],
    clientSemaphore: -1
  };
};

export const createWebSocketServerConcept = () => {
  return createConcept(
    webSocketServerName,
    initialWebSocketServerState(),
    [
      webSocketServerAppendToActionQueQuality,
      webSocketServerSyncStateQuality,
      webSocketServerSetClientSemaphoreQuality
    ],
    [webSocketServerPrinciple]
  );
};
