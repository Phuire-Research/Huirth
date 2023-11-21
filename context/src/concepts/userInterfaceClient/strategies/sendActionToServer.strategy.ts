import { Action } from 'stratimux';
import { webSocketClientAppendToActionQue } from '../../webSocketClient/qualities/appendActionQue.quality';

export const userInterfaceClientSendActionToServer = (action: Action): Action => {
  return webSocketClientAppendToActionQue({actionQue: [action]});
};