import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientSetServerSemaphorePayload = {
  semaphore: number,
}
export const webSocketClientSetServerSemaphoreType: ActionType =
  'Web Socket Client set Server Semaphore';
export const webSocketClientSetServerSemaphore =
  prepareActionWithPayloadCreator<WebSocketClientSetServerSemaphorePayload>(webSocketClientSetServerSemaphoreType);

function webSocketClientSetServerSemaphoreReducer(state: WebSocketClientState, action: Action): WebSocketClientState {
  console.log('SET SERVER SEMAPHORE HELLO WORLD');
  const payload = selectPayload<WebSocketClientSetServerSemaphorePayload>(action);
  return {
    ...state,
    serverSemaphore: payload.semaphore
  };
}

export const webSocketClientSetServerSemaphoreQuality = createQuality(
  webSocketClientSetServerSemaphoreType,
  webSocketClientSetServerSemaphoreReducer,
  defaultMethodCreator,
);
