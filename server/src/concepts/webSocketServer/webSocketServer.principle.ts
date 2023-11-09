import { Subscriber } from 'rxjs';
import { ServerState } from '../server/server.concept';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumLog,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';

export const webSocketServerPrinciple: PrincipleFunction =
  (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const socket = _ws(server);
    console.log('WS INITIALIZED');
    socket.app.ws('/axium', (ws, req) => {
      ws.on('message', (message) => {
        const act = JSON.parse(`${message}`);
        if (Object.keys(act).includes('type')) {
          observer.next(act);
        }
        ws.send(JSON.stringify(axiumLog()));
      });
    });
  };