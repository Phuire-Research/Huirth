/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a principle that will establish a connection with a client.
That will notify new client's of its own semaphore, then pass new action added to the state action que.
As well as receive actions from the client, the parse and dispatch them into the server's action stream.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import { ServerState } from '../server/server.concept';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumKickType,
  axiumRegisterStagePlanner,
  getAxiumState,
  getUnifiedName,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { webSocketClientSetServerSemaphore } from '../webSocketClient/qualities/setServerSemaphore.quality';
import { WebSocketServerState } from './webSocketServer.concept';
import { webSocketServerSyncStateType } from './qualities/syncState.quality';
import { webSocketServerClearActionQue } from './qualities/clearActionQue.quality';

export const webSocketServerPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const socket = _ws(server);
    socket.app.ws('/axium', (ws, req) => {
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
        (concepts, dispatch) => {
          const state = selectUnifiedState<WebSocketServerState>(concepts, semaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = [...state.actionQue];
              let sent = false;
              console.log('ATTEMPTING TO SEND', que);
              que.forEach(action => {
                sent = true;
                console.log('SENDING', action);
                action.conceptSemaphore = (state as WebSocketServerState).clientSemaphore;
                ws.send(JSON.stringify(action));
              });
              if (sent) {
                dispatch(webSocketServerClearActionQue(), {
                  throttle: 1
                });
              }
            } else {
              // Note I shouldn't have to do this.
              // This demonstrates how branch prediction interferes with graph programming
              // As if I do not have this mechanism, branch prediction will outright ignore this "branch"
              ws.send(JSON.stringify(axiumKick()));
            }
          } else {
            console.log('SHOUDN\'T CONCLUDE');
            plan.conclude();
          }
        }
      ], 33);
      ws.addEventListener('close', () => {
        plan.conclude();
      });
      ws.on('message', (message) => {
        const act = JSON.parse(`${message}`);
        if (Object.keys(act).includes('type')) {
          if ((act as Action).type !== webSocketServerSyncStateType) {
            if (getAxiumState(cpts).logging && (act as Action).type !== axiumKickType) {
              console.log('MESSAGE', (act as Action).type);
            }
          }
          observer.next(act);
        }
      });
    });
  };