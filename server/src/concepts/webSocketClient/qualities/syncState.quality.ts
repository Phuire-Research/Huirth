import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientSyncStatePayload = {
  state: Record<string, unknown>,
}
export const webSocketClientSyncStateType: ActionType =
  'Web Socket sync State';
export const webSocketClientSyncState =
  prepareActionWithPayloadCreator<WebSocketClientSyncStatePayload>(webSocketClientSyncStateType);

function webSocketClientSyncStateReducer(state: WebSocketClientState, action: Action): WebSocketClientState {
  console.log('SYNC SERVER SEMAPHORE HELLO WORLD');
  const payload = selectPayload<WebSocketClientSyncStatePayload>(action);
  const keys = Object.keys(payload.state);
  const newState: Record<string, unknown> = {};
  for (const key of keys) {
    if (key !== 'serverSemaphore' && key !== 'clientSemaphore') {
      newState[key] = payload.state[key];
    }
  }
  return {
    ...state,
    ...newState
  };
}

export const webSocketClientSyncStateQuality = createQuality(
  webSocketClientSyncStateType,
  webSocketClientSyncStateReducer,
  defaultMethodCreator,
);