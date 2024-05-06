/*<$
For the graph programming framework Stratimux and the brand Concept huirth, generate a series of unified selector creators that will select slices of the web socket server state.
$>*/
/*<#*/
import { Concepts, createUnifiedKeyedSelector  } from 'stratimux';
import { WebSocketServerState } from './webSocketServer.concept';

export const webSocketServer_createActionQueSelector = (concepts: Concepts, semaphore: number) => {
  return createUnifiedKeyedSelector<WebSocketServerState>(concepts, semaphore, 'actionQue');
};

/*#>*/