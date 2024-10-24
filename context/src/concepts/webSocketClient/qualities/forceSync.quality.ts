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
} from 'stratimux';
import { webSocketServerSyncClientState } from '../strategies/server/syncServerState.helper';
import { WebSocketClientDeck, WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientForceSyncPayload = {
  keys: string[];
};

export const webSocketClientForceSync = createQualityCardWithPayload<
  WebSocketClientState,
  WebSocketClientForceSyncPayload,
  WebSocketClientDeck
>({
  type: 'Web Socket Client force client sync',
  reducer: nullReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodCreator: () =>
    createMethodWithState(({ action, state, deck }) => {
      const syncState: Record<string, unknown> = {};
      const { keys } = selectPayload<WebSocketClientForceSyncPayload>(action);
      keys.forEach((key) => {
        syncState[key] = (state as any)[key];
      });
      const sync = createActionNode(
        deck.webSocketClient.e.webSocketClientAppendToActionQue({
          actionQue: [webSocketServerSyncClientState({ state: syncState }, { priority: 5000 })],
        })
      );
      // console.log('FORCE SYNC STATE', syncState);
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
    }),
});
/*#>*/
