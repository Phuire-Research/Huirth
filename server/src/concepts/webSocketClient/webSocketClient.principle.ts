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

const notKeys = (key: string) => {
  return (
    key !== 'pages' &&
    key !== 'clientSemaphore' &&
    key !== 'serverSemaphore' &&
    key !== 'pageStrategies'
  );
};

export const webSocketClientPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const url = 'ws://' + window.location.host + '/axium';
    const ws = new WebSocket(url);
    ws.addEventListener('open', () => {
      console.log('SEND');
      ws.send(JSON.stringify(webSocketClientSetClientSemaphore({semaphore})));
      const plan = concepts$.plan('Web Socket Planner', [
        createStage((concepts, dispatch) => {
          const name = getUnifiedName(concepts, semaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
              iterateStage: true
            });
          } else {
            plan.conclude();
          }
        }),
        createStage((concepts, __) => {
          const state = selectUnifiedState<WebSocketClientState>(concepts, semaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = [...state.actionQue];
              state.actionQue = [];
              que.forEach(action => {
                console.log('SENDING', action);
                action.conceptSemaphore = (state as WebSocketClientState).serverSemaphore;
                ws.send(JSON.stringify(action));
              });
              concepts$.next(concepts);
            } else {
              ws.send(JSON.stringify(axiumKick()));
            }
          } else {
            plan.conclude();
          }
        }, {beat: 33, selectors: [webSocketClient_createActionQueSelector(cpts, semaphore) as KeyedSelector]})
      ]);
      const state: Record<string, unknown> = {};
      const planOnChange = concepts$.plan('Web Socket Server On Change', [
        createStage((concepts, dispatch) => {
          const name = getUnifiedName(concepts, semaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: planOnChange}), {
              iterateStage: true
            });
          } else {
            planOnChange.conclude();
          }
        }),
        createStage((concepts) => {
          const newState = selectUnifiedState<Record<string, unknown>>(concepts, semaphore);
          if (newState) {
            const stateKeys = Object.keys(newState);
            if (stateKeys.length === 0) {
              for (const key of stateKeys) {
                if (notKeys(key)) {
                  state[key] = newState[key];
                }
              }
              ws.send(JSON.stringify(webSocketServerSyncClientState({state})));
            } else {
              for (const key of stateKeys) {
                let changed = false;
                if (
                  notKeys(key) &&
                  // typeof newState[key] !== 'object' &&
                  newState[key] !== state[key]
                ) {
                  changed = true;
                }
                // else if (notKeys(key) && typeof newState[key] === 'object' && !Object.is(newState[key], state[key])) {
                //   changed = true;
                // }
                if (changed) {
                  for (const k of stateKeys) {
                    // eslint-disable-next-line max-depth
                    if (notKeys(k)) {
                      state[key] = newState[key];
                    }
                  }
                  const sync = webSocketServerSyncClientState({state});
                  sync.conceptSemaphore = (newState as WebSocketClientState).serverSemaphore;
                  ws.send(JSON.stringify(sync));
                  break;
                }
              }
            }
          } else {
            planOnChange.conclude();
          }
        }, {beat: 33}),
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
    ws.addEventListener('message', (message) => {
      const act = JSON.parse(message.data);
      if (Object.keys(act).includes('type')) {
        if (getAxiumState(cpts).logging && (act as Action).type !== axiumKickType) {
          console.log('MESSAGE', (act as Action).type);
        }
        observer.next(act);
      }
    });
  };
  /*#>*/