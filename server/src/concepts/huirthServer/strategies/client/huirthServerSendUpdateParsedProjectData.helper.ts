/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update a parsed project's data to the client and set the status to parsed.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { NamedDataSet } from '../../../huirth/huirth.model';
import { Deck } from 'stratimux';
import { WebSocketServerDeck } from '../../../webSocketServer/webSocketServer.concept';
import { HuirthDeck } from '../../../huirth/huirth.concept';

export const huirthServerSendUpdateParsedProjectData = (dataSet: NamedDataSet, deck: Deck<WebSocketServerDeck & HuirthDeck>) =>
  userInterfaceServerSendActionToClient(deck.huirth.e.huirthUpdateParsedProjectDataSet({ dataSet }), deck);
/*#>*/
