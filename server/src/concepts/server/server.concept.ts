import { Subscriber } from 'rxjs';
import { serverPrinciple } from './server.principle';
import { Action, createConcept } from 'stratimux';
import express, {Application} from 'express';

export type ServerState = {
    port: number;
    server: Application
}

export const serverName = 'server';

const initialServerState = (port?: number): ServerState => {
  return {
    port: port ? port : 8080,
    server: express()
  };
};

export const createServerConcept = (port?: number) => {
  return createConcept(
    serverName,
    initialServerState(port),
    [],
    [serverPrinciple]
  );
};
