/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will set the client's semaphore onto the server to enable safe message passing.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerSetClientSemaphorePayload = {
  semaphore: number;
};

export const webSocketServerSetClientSemaphore = createQualityCardWithPayload<
  WebSocketServerState,
  WebSocketServerSetClientSemaphorePayload
>({
  type: 'Web Socket Server set Client Semaphore',
  reducer: (_, action) => {
    const payload = action.payload;
    console.log('CHECK', action);
    return {
      clientSemaphore: payload.semaphore,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
