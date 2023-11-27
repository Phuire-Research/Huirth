/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { logixUXUpdateProjectStatusToSaved } from '../../../logixUX/qualities/updateProjectToSaved.quality';

export const logixUXServerSendProjectStatusToSaved = (name: string) =>
  (userInterfaceServerSendActionToClient(logixUXUpdateProjectStatusToSaved({name})));
/*#>*/