import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerSyncStatePayload = {
  state: Record<string, unknown>,
}
export const webSocketServerSyncStateType: ActionType =
  'Web Socket Server sync State to provided Client State';
export const webSocketServerSyncState =
  prepareActionWithPayloadCreator<WebSocketServerSyncStatePayload>(webSocketServerSyncStateType);

function webSocketServerSyncStateReducer(state: WebSocketServerState, action: Action): WebSocketServerState {
  const payload = selectPayload<WebSocketServerSyncStatePayload>(action);
  const keys = Object.keys(payload.state);
  const newState: Record<string, unknown> = {};
  for (const key of keys) {
    if (key !== 'serverSemaphore' && key !== 'clientSemaphore' && key !== 'pageStrategies') {
      newState[key] = payload.state[key];
    }
  }
  // console.log('SYNC SERVER SEMAPHORE HELLO WORLD', payload);
  return {
    ...state,
    ...newState
  };
}

export const webSocketServerSyncStateQuality = createQuality(
  webSocketServerSyncStateType,
  webSocketServerSyncStateReducer,
  defaultMethodCreator,
);