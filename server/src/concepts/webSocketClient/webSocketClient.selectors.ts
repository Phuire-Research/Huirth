/*<$
For the graph programming framework Stratimux and the brand Concept huirth, generate a series of unified selector creators that will select slices of the web socket client state.
$>*/
/*<#*/
import { Concepts, createMuxifiedKeyedSelector } from 'stratimux';
import { WebSocketClientState } from './webSocketClient.concept';

export const webSocketClient_createActionQueSelector = (concepts: Concepts, semaphore: number) => {
  return createMuxifiedKeyedSelector<WebSocketClientState>(concepts, semaphore, 'actionQue');
};

/*#>*/
