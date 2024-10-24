/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a helper that will send the passed action to the client via the Web Socket Concept.
$>*/
/*<#*/
import { Action, AnyAction, Deck } from 'stratimux';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';
import { WebSocketServerDeck } from '../../webSocketServer/webSocketServer.concept';

export const userInterfaceServerSendActionToClient = (action: AnyAction, deck: Deck<WebSocketServerDeck>): AnyAction => {
  return deck.webSocketServer.e.webSocketServerAppendToActionQue({ actionQue: [action] });
};
/*#>*/
