import { Action } from 'stratimux';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';

export const userInterfaceServerSendActionToClient = (action: Action): Action => {
  return webSocketServerAppendToActionQue({actionQue: [action]});
};