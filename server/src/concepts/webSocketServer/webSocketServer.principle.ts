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
  MuxifiedSubject,
  axiumKick,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  getAxiumState,
  primeAction,
  selectSlice,
  selectMuxifiedState,
} from '@phuire/stratimux';
import _ws from 'express-ws';
import { webSocketClientSetServerSemaphore } from '../webSocketClient/qualities/setServerSemaphore.quality';
import { WebSocketServerPrinciple, WebSocketServerState } from './webSocketServer.concept';
import { webSocketServer_createActionQueSelector } from './webSocketServer.selectors';
import { webSocketServerSyncState } from './qualities/syncState.quality';
// import { webSocketServer_createActionQueSelector } from './webSocketServer.selectors';

export const webSocketServerPrinciple: WebSocketServerPrinciple = ({
  k_,
  plan,
  concepts_,
  e_,
  c_,
  observer,
  conceptSemaphore
}) => {
  const initialServerState = k_.state(concepts_) as unknown as ServerState;
  const server = initialServerState.server;
  const socket = _ws(server);
  let interval: undefined | NodeJS.Timer;
  socket.app.ws('/axium', (ws, req) => {
    const setServerSemaphoreMessage = JSON.stringify(webSocketClientSetServerSemaphore.actionCreator({ semaphore: conceptSemaphore }));
    // console.log('CHECK THIS MESSAGE', setServerSemaphoreMessage);
    ws.send(setServerSemaphoreMessage);
    interval = setInterval(() => {
      ws.send('ping');
    }, 3000);
    const webSocketServerPlan = plan('Web Socket Server Message Que Planner', ({stage, k__}) => [
      stage(
        ({concepts, dispatch, k, d, stagePlanner}) => {
          if (selectSlice(concepts, axiumSelectOpen) === true) {
            const name = k.name(concepts);
            if (name) {
              dispatch(d.axium.e.axiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
                iterateStage: true,
              });
            } else {
              stagePlanner.conclude();
            }
          }
        },
        { selectors: [axiumSelectOpen] }
      ),
      stage(
        ({concepts, k, stagePlanner}) => {
          const state = k.state(concepts);
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
            stagePlanner.conclude();
          }
        },
        { priority: 2000, selectors: [k__.actionQue] }
      ),
    ]);
    ws.addEventListener('close', () => {
      if (interval) {
        clearInterval(interval);
      }
      webSocketServerPlan.conclude();
    });
    ws.on('message', (message: any) => {
      if (message.data !== 'ping') {
        const act = JSON.parse(`${message}`);
        // console.log('CHECK ACTION', act);
        if (Object.keys(act).includes('type')) {
          if ((act as Action).type !== webSocketServerSyncState.actionType) {
            if (getAxiumState(concepts_).logging && (act as Action).type !== axiumKick.actionType) {
              console.log('MESSAGE', (act as Action).type);
            }
          }
          act.conceptSemaphore = conceptSemaphore;
          observer.next(act);
        }
      }
    });
  });
};
/*#>*/
// , selectors: [webSocketServer_createActionQueSelector(cpts, semaphore) as KeyedSelector]
