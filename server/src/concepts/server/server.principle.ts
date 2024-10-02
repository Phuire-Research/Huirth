/*<$
For the graph programming framework Stratimux and a Server Concept, generate a principle that will listen on the port passed in its initial state.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import { ServerPrinciple, ServerState } from './server.concept';
import { Action, Concepts, PrincipleFunction, MuxifiedSubject, selectMuxifiedState } from '@phuire/stratimux';

export const serverPrinciple: ServerPrinciple = ({ concepts_, k_ }) => {
  const HOST = '0.0.0.0';
  const initialServerState = k_.state(concepts_) as ServerState;
  const server = initialServerState.server;
  server.listen(initialServerState.port, HOST, () => {
    console.log(`Running on http://${HOST}:${initialServerState.port}}`);
  });
};
/*#>*/
