/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a principle that will establish a connection with a server, and pass its semaphore.
Then create a plan to notify the server of state changes, while ignoring values that would disallow this process from being halting complete.
As well as receive actions from the server, the parse and dispatch them into the client's action stream.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  KeyedSelector,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumKickType,
  axiumRegisterStagePlanner,
  createStage,
  getAxiumState,
  getUnifiedName,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { WebSocketClientState } from './webSocketClient.concept';
import { webSocketClientSetClientSemaphore } from './strategies/server/setClientSemaphore.helper';
import { webSocketServerSyncClientState } from './strategies/server/syncServerState.helper';
import { webSocketClient_createActionQueSelector } from './webSocketClient.selectors';
import { WebSocketServerState } from '../webSocketServer/webSocketServer.concept';

const notKeys = (key: string) => {
  return (
    key !== 'pages'
    && key !== 'clientSemaphore'
    && key !== 'serverSemaphore'
    && key !== 'pageStrategies'
  );
};

export const webSocketClientPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, conceptSemaphore: number) => {
    const url = 'ws://' + window.location.host + '/axium';
    const ws = new WebSocket(url);
    const syncState: Record<string, unknown> = {};
    ws.addEventListener('open', () => {
      console.log('SEND');
      ws.send(JSON.stringify(webSocketClientSetClientSemaphore({semaphore: conceptSemaphore})));
      const plan = concepts$.plan('Web Socket Planner', [
        createStage((concepts, dispatch) => {
          const name = getUnifiedName(concepts, conceptSemaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
              iterateStage: true
            });
          } else {
            plan.conclude();
          }
        }),
        createStage((concepts, __) => {
          const state = selectUnifiedState<WebSocketClientState>(concepts, conceptSemaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = state.actionQue;
              console.log('ATTEMPTING TO SEND', que);
              const emptyQue = () => {
                if (que.length) {
                  const action = que.shift();
                  if (action) {
                    console.log('SENDING', action);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    action.conceptSemaphore = (state as any).clientSemaphore;
                    ws.send(JSON.stringify(action));
                  }
                }
              };
              emptyQue();
            }
          } else {
            plan.conclude();
          }
        }, {beat: 3, selectors: [webSocketClient_createActionQueSelector(cpts, conceptSemaphore) as KeyedSelector]})
      ]);
      const planOnChange = concepts$.plan('Web Socket Server On Change', [
        createStage((concepts, dispatch) => {
          const name = getUnifiedName(concepts, conceptSemaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: planOnChange}), {
              iterateStage: true
            });
          } else {
            planOnChange.conclude();
          }
        }),
        createStage((concepts) => {
          // Bucket State
          const state: Record<string, unknown> = {};
          const newState = selectUnifiedState<Record<string, unknown>>(concepts, conceptSemaphore);
          if (newState) {
            const stateKeys = Object.keys(newState);
            if (Object.keys(syncState).length === 0) {
              for (const key of stateKeys) {
                if (notKeys(key)) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                }
              }
              ws.send(JSON.stringify(webSocketServerSyncClientState({state})));
            } else {
              let changed = false;
              for (const key of stateKeys) {
                if (
                  notKeys(key) &&
                  typeof newState[key] !== 'object' &&
                  newState[key] !== syncState[key]
                ) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                  changed = true;
                }
                else if (notKeys(key) && typeof newState[key] === 'object' && !Object.is(newState[key], syncState[key])) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                  changed = true;
                }
              }
              if (changed) {
                const sync = webSocketServerSyncClientState({state});
                sync.conceptSemaphore = (newState as WebSocketClientState).serverSemaphore;
                // console.log('CHECK SYNC', sync);
                ws.send(JSON.stringify(sync));
              }
            }
          } else {
            planOnChange.conclude();
          }
        }, {priority: 2000}),
        createStage((__, dispatch) => {
          dispatch(axiumKick(), {
            setStage: 1
          });
        }),
      ]);
      ws.addEventListener('close', () => {
        plan.conclude();
      });
    });
    ws.addEventListener('message', (message: any) => {
      // console.log('CHECK MESSAGE', message);
      if (message.data !== 'ping') {
        const act = JSON.parse(message.data);
        if (Object.keys(act).includes('type')) {
          if (getAxiumState(cpts).logging && (act as Action).type !== axiumKickType) {
            console.log('MESSAGE', (act as Action).type);
          }
          observer.next(act);
        }
      }
    });
  };
  /*#>*/