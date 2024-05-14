/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will set the client's semaphore onto the server to enable safe message passing.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerSetClientSemaphorePayload = {
  semaphore: number,
}

export const [
  webSocketServerSetClientSemaphore,
  webSocketServerSetClientSemaphoreType,
  webSocketServerSetClientSemaphoreQuality
] = createQualitySetWithPayload<WebSocketServerSetClientSemaphorePayload>({
  type: 'Web Socket Server set Client Semaphore',
  reducer: (state: WebSocketServerState, action: Action): WebSocketServerState => {
    const payload = selectPayload<WebSocketServerSetClientSemaphorePayload>(action);
    console.log('CHECK', action);
    return {
      ...state,
      clientSemaphore: payload.semaphore
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/