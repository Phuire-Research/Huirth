import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { logixUXUpdateProjectStatus } from '../../../logixUX/qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../../../logixUX/logixUX.model';

export const logixUXServerSendUpdateProjectToInstalled = (name: string) =>
  (userInterfaceServerSendActionToClient(logixUXUpdateProjectStatus({name, status: ProjectStatus.installed})));