/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update project status to the client.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { huirthUpdateProjectStatus } from '../../../huirth/qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../../../huirth/huirth.model';

export const huirthServerSendUpdateProjectToInstalled = (name: string) =>
  userInterfaceServerSendActionToClient(huirthUpdateProjectStatus({ name, status: ProjectStatus.installed }));
/*#>*/
