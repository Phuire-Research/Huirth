import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  refreshAction,
  selectPayload,
} from 'stratimux';
import { WebSocketServerState } from '../webSocketServer.concept';

export type WebSocketServerAppendToActionQuePayload = {
  actionQue: Action[]
}
export const webSocketServerAppendToActionQueType: ActionType =
  'Web Socket Server append to action que';
export const webSocketServerAppendToActionQue =
  prepareActionWithPayloadCreator<WebSocketServerAppendToActionQuePayload>(webSocketServerAppendToActionQueType);

function webSocketServerAppendToActionQueReducer(state: WebSocketServerState, action: Action): WebSocketServerState {
  const payload = selectPayload<WebSocketServerAppendToActionQuePayload>(action);
  const actionQue = payload.actionQue.map(act => refreshAction(act));
  const newActionQue = [
    ...state.actionQue,
    ...actionQue
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
