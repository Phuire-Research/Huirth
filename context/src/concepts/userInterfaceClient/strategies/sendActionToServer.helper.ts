/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a helper that will add the passed action to the send to the actionQue utilized by the web socket concept.
$>*/
/*<#*/
import { Action, AnyAction } from '@phuire/stratimux';
import { webSocketClientAppendToActionQue } from '../../webSocketClient/qualities/appendActionQue.quality';

export const userInterfaceClientSendActionToServer = (action: AnyAction): AnyAction => {
  return webSocketClientAppendToActionQue.actionCreator({ actionQue: [action] });
};
/*#>*/
