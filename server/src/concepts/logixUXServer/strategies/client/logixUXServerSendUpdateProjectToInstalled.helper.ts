/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { logixUXUpdateProjectStatus } from '../../../logixUX/qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../../../logixUX/logixUX.model';

export const logixUXServerSendUpdateProjectToInstalled = (name: string) =>
  (userInterfaceServerSendActionToClient(logixUXUpdateProjectStatus({name, status: ProjectStatus.installed})));
/*#>*/