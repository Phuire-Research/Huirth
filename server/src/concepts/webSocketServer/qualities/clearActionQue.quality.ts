/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will clear the current action que.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export const [
  webSocketServerClearActionQue,
  webSocketServerClearActionQueType,
  webSocketServerClearActionQueQuality
] = createQualitySet({
  type: 'Web Socket Server clear action que',
  reducer: (state: WebSocketServerState, action: Action): WebSocketServerState => {
    return {
      ...state,
      actionQue: []
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/