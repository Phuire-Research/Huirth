/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will set the server's semaphore.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientSetServerSemaphorePayload = {
  semaphore: number,
}

export const [
  webSocketClientSetServerSemaphore,
  webSocketClientSetServerSemaphoreType,
  webSocketClientSetServerSemaphoreQuality
] = createQualitySetWithPayload<WebSocketClientSetServerSemaphorePayload>({
  type: 'Web Socket Client set Server Semaphore',
  reducer: (state: WebSocketClientState, action: Action): WebSocketClientState => {
    const payload = selectPayload<WebSocketClientSetServerSemaphorePayload>(action);
    console.log('SET SERVER SEMAPHORE HELLO WORLD', payload);
    return {
      ...state,
      serverSemaphore: payload.semaphore
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/