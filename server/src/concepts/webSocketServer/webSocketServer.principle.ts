import { Subscriber } from 'rxjs';
import { ServerState } from '../server/server.concept';
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
import { webSocketClientSetServerSemaphore } from '../webSocketClient/qualities/setServerSemaphore.quality';
import { webSocketServerSyncState } from './qualities/syncState.quality';
import { WebSocketServerState } from './webSocketServer.concept';
import { webSocketClientSyncState } from '../webSocketClient/qualities/syncState.quality';
// import { webSocketServerSyncState } from './qualities/syncState.quality';

const notKeys = (key: string) => {
  return (
    key !== 'pages' &&
    key !== 'clientSemaphore' &&
    key !== 'serverSemaphore' &&
    key !== 'server'
  );
};

export const webSocketServerPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const socket = _ws(server);
    socket.app.ws('/axium', (ws, req) => {
      console.log('SEND');
      ws.send(JSON.stringify(webSocketClientSetServerSemaphore({semaphore})));
      const plan = concepts$.stage('Web Socket Server Message Que Planner', [
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
          const state = selectUnifiedState<WebSocketServerState>(concepts, semaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = [...state.actionQue];
              state.actionQue = [];
              que.forEach(action => {
                console.log('SENDING', action);
                action.conceptSemaphore = (state as WebSocketServerState).clientSemaphore;
                ws.send(JSON.stringify(action));
              });
              concepts$.next(concepts);
            }
          } else {
            plan.conclude();
          }
        }
      ]);
      ws.on('message', (message) => {
        const act = JSON.parse(`${message}`);
        // console.log('MESSAGE', act);
        if (Object.keys(act).includes('type')) {
          observer.next(act);
        }
      });
      // const state: Record<string, unknown> = {};
      // const planOnChange = concepts$.stage('Web Socket Server On Change', [
      //   (concepts, dispatch) => {
      //     const name = getUnifiedName(concepts, semaphore);
      //     if (name) {
      //       dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: planOnChange}), {
      //         iterateStage: true
      //       });
      //     } else {
      //       planOnChange.conclude();
      //     }
      //   },
      //   (concepts) => {
      //     const newState = selectUnifiedState<Record<string, unknown>>(concepts, semaphore);
      //     if (newState) {
      //       const stateKeys = Object.keys(newState);
      //       if (stateKeys.length === 0) {
      //         for (const key of stateKeys) {
      //           if (notKeys(key)) {
      //             state[key] = newState[key];
      //           }
      //         }
      //         ws.send(JSON.stringify(webSocketServerSyncState({state})));
      //       } else {
      //         for (const key of stateKeys) {
      //           let changed = false;
      //           if (
      //             notKeys(key) &&
      //             // typeof newState[key] !== 'object' &&
      //             newState[key] !== state[key]
      //           ) {
      //             changed = true;
      //           }
      //           // else if (notKeys(key) && typeof newState[key] === 'object' && !Object.is(newState[key], state[key])) {
      //           //   changed = true;
      //           // }
      //           if (changed && (state as WebSocketServerState).clientSemaphore !== -1) {
      //             for (const k of stateKeys) {
      //               // eslint-disable-next-line max-depth
      //               if (notKeys(k)) {
      //                 state[key] = newState[key];
      //               }
      //             }
      //             const sync = webSocketClientSyncState({state});
      //             // sync.conceptSemaphore = (state as WebSocketServerState).clientSemaphore;
      //             console.log('CHECK SEMAPHORE', state);
      //             ws.send(JSON.stringify(sync));
      //             break;
      //           }
      //         }
      //       }
      //     } else {
      //       planOnChange.conclude();
      //     }
      //   }
      // ]);
    });
  };