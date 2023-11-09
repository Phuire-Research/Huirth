import { webSocketClientPrinciple } from './webSocketClient.principle';
import { Action, createConcept } from 'stratimux';

export type WebSocketClientState = {
  actionQue: Action[]
};

export const webSocketClientName = 'webSocketClient';

const initialWebSocketClientState = (): WebSocketClientState => {
  return {
    actionQue: []
  };
};

export const createWebSocketClientConcept = () => {
  return createConcept(
    webSocketClientName,
    initialWebSocketClientState(),
    [],
    [webSocketClientPrinciple]
  );
};
