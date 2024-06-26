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
  KeyedSelector,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumKickType,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  getAxiumState,
  getUnifiedName,
  primeAction,
  selectSlice,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { webSocketClientSetServerSemaphore } from '../webSocketClient/qualities/setServerSemaphore.quality';
import { WebSocketServerState } from './webSocketServer.concept';
import { webSocketServerSyncStateType } from './qualities/syncState.quality';
import { webSocketServer_createActionQueSelector } from './webSocketServer.selectors';
// import { webSocketServer_createActionQueSelector } from './webSocketServer.selectors';



export const webSocketServerPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const socket = _ws(server);
    let interval: undefined | NodeJS.Timer;
    socket.app.ws('/axium', (ws, req) => {
      const setServerSemaphoreMessage = JSON.stringify(webSocketClientSetServerSemaphore({semaphore}));
      // console.log('CHECK THIS MESSAGE', setServerSemaphoreMessage);
      ws.send(setServerSemaphoreMessage);
      interval = setInterval(() => {
        ws.send('ping');
      }, 3000);
      const plan = concepts$.plan('Web Socket Server Message Que Planner', [
        createStage((concepts, dispatch) => {
          if (selectSlice(concepts, axiumSelectOpen) === true) {
            const name = getUnifiedName(concepts, semaphore);
            if (name) {
              dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
                iterateStage: true
              });
            } else {
              plan.conclude();
            }
          }
        }, {selectors: [axiumSelectOpen]}),
        createStage((concepts) => {
          const state = selectUnifiedState<WebSocketServerState>(concepts, semaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = state.actionQue;
              console.log('ATTEMPTING TO SEND', que);
              const emptyQue = () => {
                if (que.length) {
                  const action = que.shift();
                  if (action) {
                    console.log('SENDING', action);
                    action.conceptSemaphore = (state as WebSocketServerState).clientSemaphore;
                    ws.send(JSON.stringify(action));
                  }
                }
              };
              emptyQue();
            }
          } else {
            console.log('SHOUDN\'T CONCLUDE');
            plan.conclude();
          }
        }, {priority: 2000, selectors: [webSocketServer_createActionQueSelector(cpts, semaphore) as KeyedSelector]})
      ]);
      ws.addEventListener('close', () => {
        if (interval) {
          clearInterval(interval);
        }
        plan.conclude();
      });
      ws.on('message', (message: any) => {
        if (message.data !== 'ping') {
          const act = JSON.parse(`${message}`);
          // console.log('CHECK ACTION', act);
          if (Object.keys(act).includes('type')) {
            if ((act as Action).type !== webSocketServerSyncStateType) {
              if (getAxiumState(cpts).logging && (act as Action).type !== axiumKickType) {
                console.log('MESSAGE', (act as Action).type);
              }
            }
            act.conceptSemaphore = semaphore;
            observer.next(act);
          }
        }
      });
    });
  };
/*#>*/
// , selectors: [webSocketServer_createActionQueSelector(cpts, semaphore) as KeyedSelector]