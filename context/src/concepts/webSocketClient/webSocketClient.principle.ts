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
import { webSocketClientSetClientSemaphore } from './qualities/setClientSemaphore.quality';

export const webSocketClientPrinciple: PrincipleFunction = (
  observer: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const url = 'ws://' + window.location.host + '/axium';
  const ws = new WebSocket(url);
  ws.addEventListener('open', () => {
    const plan = concepts$.stage('Web Socket Planner', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({ conceptName: name, stagePlanner: plan }), {
            iterateStage: true,
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const state = selectUnifiedState<WebSocketClientState>(concepts, semaphore);
        if (state) {
          ws.send(JSON.stringify(webSocketClientSetClientSemaphore({ semaphore })));
          dispatch(axiumKick(), {
            iterateStage: true,
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
            que.forEach((action) => {
              action.conceptSemaphore = (state as WebSocketClientState).serverSemaphore;
              ws.send(JSON.stringify(action));
            });
            concepts$.next(concepts);
          }
        } else {
          plan.conclude();
        }
      },
    ]);
    const state: Record<string, unknown> = {};
    const planOnChange = concepts$.stage('Web Socket Server On Change', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({ conceptName: name, stagePlanner: planOnChange }), {
            iterateStage: true,
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
            ws.send(JSON.stringify(webSocketClientSyncState({ state })));
          } else {
            for (const key of stateKeys) {
              let changed = false;
              if (key !== 'pages' && typeof newState[key] !== 'object' && newState[key] !== state[key]) {
                changed = true;
              } else if (key !== 'pages' && typeof newState[key] === 'object' && !Object.is(newState[key], state[key])) {
                changed = true;
              }
              if (changed) {
                for (const k of stateKeys) {
                  // eslint-disable-next-line max-depth
                  if (k !== 'pages') {
                    state[key] = newState[key];
                  }
                }
                const sync = webSocketClientSyncState({ state });
                // sync.conceptSemaphore = (state as WebSocketClientState).serverSemaphore;
                ws.send(JSON.stringify(sync));
                break;
              }
            }
          }
        } else {
          planOnChange.conclude();
        }
      },
    ]);
  });
  ws.addEventListener('message', (message) => {
    const act = JSON.parse(message.data);
    if (Object.keys(act).includes('type')) {
      observer.next(act);
    }
  });
};
