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
    [],
    [webSocketServerPrinciple]
  );
};
