import { webSocketServerAppendToActionQueQuality } from './qualities/appendActionQue.quality';
import { webSocketServerSyncStateQuality } from './qualities/syncState.quality';
import { webSocketServerPrinciple } from './webSocketServer.principle';
import { Action, createConcept } from 'stratimux';

export type WebSocketServerState = {
  actionQue: Action[],
};

export const webSocketServerName = 'webSocketServer';

const initialWebSocketServerState = (): WebSocketServerState => {
  return {
    actionQue: []
  };
};

export const createWebSocketServerConcept = () => {
  return createConcept(
    webSocketServerName,
    initialWebSocketServerState(),
    [
      webSocketServerAppendToActionQueQuality,
      webSocketServerSyncStateQuality
    ],
    [webSocketServerPrinciple]
  );
};
