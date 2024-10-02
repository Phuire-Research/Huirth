/*<$
For the graph programming framework Stratimux and the Web Socket Server Concept, generate a quality will append a series of action to the state's action que.
This will later be dispatched by the Web Socket Server Principle to the client.
$>*/
/*<#*/
import { Action, AnyAction, createQualityCardWithPayload, defaultMethodCreator, refreshAction, selectPayload } from '@phuire/stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerAppendToActionQuePayload = {
  actionQue: AnyAction[];
};

export const webSocketServerAppendToActionQue = createQualityCardWithPayload<WebSocketServerState, WebSocketServerAppendToActionQuePayload>(
  {
    type: 'Web Socket Server append to action que',
    reducer: (state, action) => {
      const payload = selectPayload<WebSocketServerAppendToActionQuePayload>(action);
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
