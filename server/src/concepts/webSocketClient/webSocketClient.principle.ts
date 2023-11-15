import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumLog,
  axiumRegisterStagePlanner,
  getUnifiedName,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { WebSocketClientState } from './webSocketClient.concept';
import { webSocketClientSyncState } from './qualities/syncState.quality';
import { webSocketClientSetClientSemaphore } from './strategies/server/setClientSemaphore.helper';

const notKeys = (key: string) => {
  return (
    key !== 'pages' &&
    key !== 'clientSemaphore' &&
    key !== 'serverSemaphore'
  );
};

export const webSocketClientPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const url = 'ws://' + window.location.host + '/axium';
    const ws = new WebSocket(url);
    ws.addEventListener('open', () => {
      console.log('SEND');
      ws.send(JSON.stringify(webSocketClientSetClientSemaphore({semaphore})));
      const plan = concepts$.stage('Web Socket Planner', [
        (concepts, dispatch) => {
          const name = getUnifiedName(concepts, semaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
              iterateStage: true
            });
          } else {
            plan.conclude();
          }
        },
        (concepts, __) => {
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
            }
          } else {
            plan.conclude();
          }
        }
      ]);
      const state: Record<string, unknown> = {};
      const planOnChange = concepts$.stage('Web Socket Server On Change', [
        (concepts, dispatch) => {
          const name = getUnifiedName(concepts, semaphore);
          if (name) {
            dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: planOnChange}), {
              iterateStage: true
            });
          } else {
            planOnChange.conclude();
          }
        },
        (concepts) => {
          const newState = selectUnifiedState<Record<string, unknown>>(concepts, semaphore);
          if (newState) {
            const stateKeys = Object.keys(newState);
            if (stateKeys.length === 0) {
              for (const key of stateKeys) {
                if (key !== 'pages') {
                  state[key] = newState[key];
                }
              }
              ws.send(JSON.stringify(webSocketClientSyncState({state})));
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
                  const sync = webSocketClientSyncState({state});
                  sync.conceptSemaphore = (newState as WebSocketClientState).serverSemaphore;
                  ws.send(JSON.stringify(sync));
                  break;
                }
              }
            }
          } else {
            planOnChange.conclude();
          }
        }
      ]);
    });
    ws.addEventListener('message', (message) => {
      const act = JSON.parse(message.data);
      // console.log('CHECK MESSAGE', act);
      if (Object.keys(act).includes('type')) {
        observer.next(act);
      }
    });
  };