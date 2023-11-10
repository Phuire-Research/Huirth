import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerAppendToActionQuePayload = {
  actionQue: Action[]
}
export const webSocketServerAppendToActionQueType: ActionType =
  'Web Socket Server append to action que';
export const webSocketServerAppendToActionQue = prepareActionWithPayloadCreator(webSocketServerAppendToActionQueType);

function webSocketServerAppendToActionQueReducer(state: WebSocketServerState, action: Action): WebSocketServerState {
  const payload = selectPayload<WebSocketServerAppendToActionQuePayload>(action);
  const newActionQue = [
    ...state.actionQue,
    ...payload.actionQue
  ];
  return {
    ...state,
    actionQue: newActionQue
  };
}

export const webSocketServerAppendToActionQueQuality = createQuality(
  webSocketServerAppendToActionQueType,
  webSocketServerAppendToActionQueReducer,
  defaultMethodCreator,
);
