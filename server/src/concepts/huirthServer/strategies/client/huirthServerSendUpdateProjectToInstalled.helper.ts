/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { ProjectStatus } from '../../../huirth/huirth.model';
import { Deck } from 'stratimux';
import { HuirthDeck } from '../../../huirth/huirth.concept';
import { WebSocketServerDeck } from '../../../webSocketServer/webSocketServer.concept';

export const huirthServerSendUpdateProjectToInstalled = (name: string, deck: Deck<HuirthDeck & WebSocketServerDeck>) =>
  userInterfaceServerSendActionToClient(deck.huirth.e.huirthUpdateProjectStatus({ name, status: ProjectStatus.installed }), deck);
/*#>*/
