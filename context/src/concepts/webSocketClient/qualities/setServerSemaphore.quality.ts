/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will set the server's semaphore.
$>*/
/*<#*/
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
  const payload = selectPayload<WebSocketClientSetServerSemaphorePayload>(action);
  console.log('SET SERVER SEMAPHORE HELLO WORLD', payload);
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
/*#>*/