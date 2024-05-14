/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a helper that will synchronize the server state with the client's state.
$>*/
/*<#*/
import { createAction } from 'stratimux';

export const webSocketServerSyncClientState = (payload: {
  state: Record<string, unknown>
}) => (createAction('Web Socket Server sync State to provided Client State', {payload}));
/*#>*/