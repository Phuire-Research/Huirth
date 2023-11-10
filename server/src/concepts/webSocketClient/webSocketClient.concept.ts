import { webSocketClientAppendToActionQueQuality } from './qualities/appendActionQue.quality';
import { webSocketClientSetServerSemaphoreQuality } from './qualities/setServerSemaphore.quality';
import { webSocketClientSyncStateQuality } from './qualities/syncState.quality';
import { webSocketClientPrinciple } from './webSocketClient.principle';
import { Action, createConcept } from 'stratimux';

export type WebSocketClientState = {
  actionQue: Action[],
  serverSemaphore: number,
};

export const webSocketClientName = 'webSocketClient';

const initialWebSocketClientState = (): WebSocketClientState => {
  return {
    actionQue: [],
    serverSemaphore: -1
  };
};

export const createWebSocketClientConcept = () => {
  return createConcept(
    webSocketClientName,
    initialWebSocketClientState(),
    [
      webSocketClientAppendToActionQueQuality,
      webSocketClientSetServerSemaphoreQuality,
      webSocketClientSyncStateQuality
    ],
    [webSocketClientPrinciple]
  );
};
