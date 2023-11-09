import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumLog,
  axiumRegisterStagePlanner,
  getUnifiedName,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { WebSocketClientState } from './webSocketClient.concept';
import { webSocketClientSyncState } from './qualities/syncState.quality';

export const webSocketClientPrinciple: PrincipleFunction = (
  observer: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const url = 'ws://' + window.location.host + '/axium';
  console.log('CHECK URL', url);
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
      (concepts, __) => {
        const state = selectUnifiedState<WebSocketClientState>(concepts, semaphore);
        if (state) {
          if (state.actionQue.length > 0) {
            const que = [...state.actionQue];
            state.actionQue = [];
            que.forEach((action) => {
              ws.send(JSON.stringify(action));
            });
            concepts$.next(concepts);
          }
        } else {
          plan.conclude();
        }
      },
    ]);
    let state: Record<string, unknown> = {};
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
          const stateKeys = Object.keys(state);
          if (stateKeys.length === 0) {
            state = {
              ...newState,
            };
            ws.send(JSON.stringify(webSocketClientSyncState({ state })));
          } else {
            for (const key of stateKeys) {
              if (newState[key] !== state[key]) {
                state = {
                  ...newState,
                };
                const sync = webSocketClientSyncState({ state });
                sync.conceptSemaphore = (state as WebSocketClientState).serverSemaphore;
                ws.send(JSON.stringify(webSocketClientSyncState({ state })));
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
