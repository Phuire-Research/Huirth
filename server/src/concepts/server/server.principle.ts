import { Subscriber } from 'rxjs';
import { ServerState } from './server.concept';
import { Action, Concepts, PrincipleFunction, UnifiedSubject, selectUnifiedState } from 'stratimux';
// import * as path from 'path';

export const serverPrinciple: PrincipleFunction = (_: Subscriber<Action>, concepts: Concepts, __: UnifiedSubject, semaphore: number) => {
  const HOST = '0.0.0.0';
  const initialServerState = selectUnifiedState(concepts, semaphore) as ServerState;
  const server = initialServerState.server;
  server.listen(initialServerState.port, HOST, () => {
    console.log(`Running on http://${HOST}:${initialServerState.port}}`);
  });
};
