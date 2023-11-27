/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will set the client's semaphore onto the server to enable safe message passing.
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
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerSetClientSemaphorePayload = {
  semaphore: number,
}
export const webSocketServerSetClientSemaphoreType: ActionType =
  'Web Socket Server set Client Semaphore';
export const webSocketServerSetClientSemaphore =
  prepareActionWithPayloadCreator<WebSocketServerSetClientSemaphorePayload>(webSocketServerSetClientSemaphoreType);

function webSocketServerSetClientSemaphoreReducer(state: WebSocketServerState, action: Action): WebSocketServerState {
  const payload = selectPayload<WebSocketServerSetClientSemaphorePayload>(action);
  return {
    ...state,
    clientSemaphore: payload.semaphore
  };
}

export const webSocketServerSetClientSemaphoreQuality = createQuality(
  webSocketServerSetClientSemaphoreType,
  webSocketServerSetClientSemaphoreReducer,
  defaultMethodCreator,
);
/*#>*/