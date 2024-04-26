/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will append a series of action to the state's action que.
This will later be dispatched by the Web Socket Server Principle to the client.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  refreshAction,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerAppendToActionQuePayload = {
  actionQue: Action[]
}

export const [
  webSocketServerAppendToActionQue,
  webSocketServerAppendToActionQueType,
  webSocketServerAppendToActionQueQuality
] = createQualitySetWithPayload<WebSocketServerAppendToActionQuePayload>({
  type: 'Web Socket Server append to action que',
  reducer: (state: WebSocketServerState, action: Action): WebSocketServerState => {
    const payload = selectPayload<WebSocketServerAppendToActionQuePayload>(action);
    const actionQue = payload.actionQue.map(act => refreshAction(act));
    const newActionQue = [
      ...state.actionQue,
      ...actionQue
    ];
    console.log('APPEND TO ACTION QUE', newActionQue);
    return {
      ...state,
      actionQue: newActionQue
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/