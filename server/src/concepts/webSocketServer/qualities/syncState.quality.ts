/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will synchronize the state while excluding
properties that would prevent provable termination or should be defined only by the client.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerSyncStatePayload = {
  state: Record<string, unknown>,
}

export const [
  webSocketServerSyncState,
  webSocketServerSyncStateType,
  webSocketServerSyncStateQuality
] = createQualitySetWithPayload<WebSocketServerSyncStatePayload>({
  type: 'Web Socket Server sync State to provided Client State',
  reducer: (state: WebSocketServerState, action: Action): WebSocketServerState => {
    const payload = selectPayload<WebSocketServerSyncStatePayload>(action);
    const keys = Object.keys(payload.state);
    const newState: Record<string, unknown> = {};
    for (const key of keys) {
      if (
        key !== 'serverSemaphore' &&
        key !== 'clientSemaphore' &&
        key !== 'pageStrategies' &&
        key !== 'actionQue') {
        newState[key] = payload.state[key];
      }
    }
    return {
      ...state,
      ...newState
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/