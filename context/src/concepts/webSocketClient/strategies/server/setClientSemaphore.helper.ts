/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a helper that will the creation of an action to set the server's client semaphore property for this connection.
$>*/
/*<#*/
import { createAction } from 'stratimux';

export const webSocketClientSetClientSemaphore = (payload: { semaphore: number }) =>
  createAction('Web Socket Server set Client Semaphore', payload);
/*#>*/
