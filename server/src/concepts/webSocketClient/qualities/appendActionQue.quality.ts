/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a quality that will append a series of actions to that state's action que.
This action que will later be dispatch by the Web Socket Client Principle to the server.
$>*/
/*<#*/
import { Action, AnyAction, createQualityCardWithPayload, defaultMethodCreator, refreshAction, selectPayload } from '@phuire/stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientAppendToActionQuePayload = {
  actionQue: AnyAction[];
};

export const webSocketClientAppendToActionQue = createQualityCardWithPayload<WebSocketClientState, WebSocketClientAppendToActionQuePayload>(
  {
    type: 'Web Socket Client append to action que',
    reducer: (state, action) => {
      const payload = action.payload;
      console.log('APPENDING TO SEND', payload);
      const actionQue = state.actionQue;
      payload.actionQue.forEach((act) => {
        actionQue.push(refreshAction(act));
      });
      return {
        actionQue: [...actionQue],
      };
    },
    methodCreator: defaultMethodCreator,
  }
);
/*#>*/
