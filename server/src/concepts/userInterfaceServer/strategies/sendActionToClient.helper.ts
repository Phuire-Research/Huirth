/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a helper that will send the passed action to the client via the Web Socket Concept.
$>*/
/*<#*/
import { Action, AnyAction } from 'stratimux';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';

export const userInterfaceServerSendActionToClient = (action: AnyAction): AnyAction => {
  return webSocketServerAppendToActionQue.actionCreator({ actionQue: [action] });
};
/*#>*/
