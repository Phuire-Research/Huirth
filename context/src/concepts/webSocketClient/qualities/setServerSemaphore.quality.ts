/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will set the server's semaphore.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientSetServerSemaphorePayload = {
  semaphore: number;
};

export const webSocketClientSetServerSemaphore = createQualityCardWithPayload<
  WebSocketClientState,
  WebSocketClientSetServerSemaphorePayload
>({
  type: 'Web Socket Client set Server Semaphore',
  reducer: (state, action) => {
    const payload = action.payload;
    console.log('SET SERVER SEMAPHORE HELLO WORLD', payload);
    return {
      serverSemaphore: payload.semaphore,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
