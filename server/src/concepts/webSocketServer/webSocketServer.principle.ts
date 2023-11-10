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
// import { webSocketServerSyncState } from './qualities/syncState.quality';

export const webSocketServerPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const socket = _ws(server);
    socket.app.ws('/axium', (ws, req) => {
      ws.on('open', () => {
        ws.send(JSON.stringify(webSocketClientSetServerSemaphore({semaphore})));
      });
      ws.on('message', (message) => {
        const act = JSON.parse(`${message}`);
        if (Object.keys(act).includes('type')) {
          observer.next(act);
        }
      });
      // let state: Record<string, unknown> = {};
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
      //       const stateKeys = Object.keys(state);
      //       if (stateKeys.length === 0) {
      //         state = {
      //           ...newState
      //         };
      //         ws.send(JSON.stringify(webSocketServerSyncState({state})));
      //       } else {
      //         for (const key of stateKeys) {
      //           if (newState[key] !== state[key]) {
      //             state = {
      //               ...newState
      //             };
      //             const sync = webSocketServerSyncState({state});
      //             sync.conceptSemaphore = (state as WebSocketClieState).serverSemaphore;
      //             ws.send(JSON.stringify(webSocketClientSyncState({state})));
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