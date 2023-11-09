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

export const webSocketClientPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const url = 'ws://' + window.location.host + '/axium';
    console.log('CHECK URL', url);
    const ws = new WebSocket(url);
    ws.addEventListener('open', () => {
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
                ws.send(JSON.stringify(action));
              });
              concepts$.next(concepts);
            }
          } else {
            plan.conclude();
          }
        }
      ]);
      ws.send(JSON.stringify(axiumLog()));
    });
    ws.addEventListener('message', (message) => {
      const act = JSON.parse(message.data);
      if (Object.keys(act).includes('type')) {
        observer.next(act);
      }
    });
  };