import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketClientState } from '../webSocketClient.concept';

export type WebSocketClientAppendToActionQuePayload = {
  actionQue: Action[]
}
export const webSocketClientAppendToActionQueType: ActionType =
  'Web Socket Client append to action que';
export const webSocketClientAppendToActionQue = prepareActionWithPayloadCreator(webSocketClientAppendToActionQueType);

function webSocketClientAppendToActionQueReducer(state: WebSocketClientState, action: Action): WebSocketClientState {
  const payload = selectPayload<WebSocketClientAppendToActionQuePayload>(action);
  const newActionQue = [
    ...state.actionQue,
    ...payload.actionQue
  ];
  return {
    ...state,
    actionQue: newActionQue
  };
}

export const webSocketClientAppendToActionQueQuality = createQuality(
  webSocketClientAppendToActionQueType,
  webSocketClientAppendToActionQueReducer,
  defaultMethodCreator,
);
