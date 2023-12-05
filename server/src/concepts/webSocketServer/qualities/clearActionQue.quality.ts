/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will clear the current action que.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export const webSocketServerClearActionQueType: ActionType =
  'Web Socket Server clear action que';
export const webSocketServerClearActionQue =
  prepareActionCreator(webSocketServerClearActionQueType);

function webSocketServerClearActionQueReducer(state: WebSocketServerState, action: Action): WebSocketServerState {
  return {
    ...state,
    actionQue: []
  };
}

export const webSocketServerClearActionQueQuality = createQuality(
  webSocketServerClearActionQueType,
  webSocketServerClearActionQueReducer,
  defaultMethodCreator,
);
/*#>*/