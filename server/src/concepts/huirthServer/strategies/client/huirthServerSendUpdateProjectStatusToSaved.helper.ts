/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { huirthUpdateProjectStatusToSaved } from '../../../huirth/qualities/updateProjectToSaved.quality';

export const huirthServerSendProjectStatusToSaved = (name: string) =>
  userInterfaceServerSendActionToClient(huirthUpdateProjectStatusToSaved.actionCreator({ name }));
/*#>*/
