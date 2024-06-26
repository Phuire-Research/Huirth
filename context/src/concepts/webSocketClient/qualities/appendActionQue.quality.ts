/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will append a series of actions to that state's action que.
This action que will later be dispatch by the Web Socket Client Principle to the server.
$>*/
/*<#*/
import { Action, createQualitySetWithPayload, defaultMethodCreator, refreshAction, selectPayload } from 'stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientAppendToActionQuePayload = {
  actionQue: Action[];
};

export const [webSocketClientAppendToActionQue, webSocketClientAppendToActionQueType, webSocketClientAppendToActionQueQuality] =
  createQualitySetWithPayload<WebSocketClientAppendToActionQuePayload>({
    type: 'Web Socket Client append to action que',
    reducer: (state: WebSocketClientState, action: Action): WebSocketClientState => {
      const payload = selectPayload<WebSocketClientAppendToActionQuePayload>(action);
      console.log('APPENDING TO SEND', payload);
      const actionQue = state.actionQue;
      payload.actionQue.forEach((act) => {
        actionQue.push(refreshAction(act));
      });
      return {
        ...state,
        actionQue: [...actionQue],
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
