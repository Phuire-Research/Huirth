/*<$
For the graph programming framework Stratimux generate a Server Concept, that accepts an initial port.
$>*/
/*<#*/
import { serverPrinciple } from './server.principle';
import { MuxiumDeck, MuxiumState, createConcept, PrincipleFunction } from 'stratimux';
import express, { Application } from 'express';

export type ServerState = {
  port: number;
  server: Application;
};

export const serverName = 'server';

const initialServerState = (port?: number): ServerState => {
  return {
    port: port ? port : 7637,
    server: express(),
  };
};

export type ServerPrinciple = PrincipleFunction<void, MuxiumDeck, ServerState>;

export const createServerConcept = (port?: number) => {
  return createConcept(serverName, initialServerState(port), {}, [serverPrinciple]);
};
/*#>*/
