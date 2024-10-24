/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { huirthUpdateProjectStatusToSaved } from '../../../huirth/qualities/updateProjectToSaved.quality';
import { Deck } from 'stratimux';
import { HuirthServerDeck } from '../../huirthServer.concept';

export const huirthServerSendProjectStatusToSaved = (name: string, deck: Deck<HuirthServerDeck>) =>
  userInterfaceServerSendActionToClient(deck.huirth.e.huirthUpdateProjectStatusToSaved({ name }), deck);
/*#>*/
