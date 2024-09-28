/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will force the server state to sync to client via
an incoming set of keys from action payload.
$>*/
/*<#*/
import {
  ActionStrategy,
  createActionNode,
  createMethodWithState,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyBegin,
  strategyPunt,
  strategySuccess,
} from '@phuire/stratimux';
import { webSocketClientAppendToActionQue } from './appendActionQue.quality';
import { webSocketServerSyncClientState } from '../strategies/server/syncServerState.helper';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientForceSyncPayload = {
  keys: string[];
};

export const webSocketClientForceSync =
  createQualityCardWithPayload<WebSocketClientState, WebSocketClientForceSyncPayload>({
    type: 'Web Socket Client force client sync',
    reducer: nullReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methodCreator: () =>
      createMethodWithState(
        ({action, state}) => {
          const syncState: Record<string, unknown> = {};
          const { keys } = selectPayload<WebSocketClientForceSyncPayload>(action);
          keys.forEach((key) => {
            syncState[key] = (state as any)[key];
          });
          const sync = createActionNode(
            webSocketClientAppendToActionQue.actionCreator({
              actionQue: [webSocketServerSyncClientState({ state: syncState }, { priority: 5000 })],
            })
          );
          console.log('FORCE SYNC STATE', syncState);
          if (action.strategy) {
            return strategyBegin(
              strategyPunt(
                strategySuccess(action.strategy).strategy as ActionStrategy,
                createStrategy({
                  initialNode: sync,
                  topic: 'FORCE SYNC STATE',
                  priority: 3000,
                })
              )
            );
          } else {
            return strategyBegin(
              createStrategy({
                initialNode: sync,
                topic: 'FORCE SYNC STATE',
                priority: 3000,
              })
            );
          }
        },
      ),
  });
/*#>*/
