/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a helper that will synchronize the server state with the client's state.
$>*/
/*<#*/
import { ActionOptions, createAction } from '@phuire/stratimux';

export const webSocketServerSyncClientState = (payload: { state: Record<string, unknown> }, options?: ActionOptions) =>
  createAction('Web Socket Server sync State to provided Client State', { payload, ...options });
/*#>*/
