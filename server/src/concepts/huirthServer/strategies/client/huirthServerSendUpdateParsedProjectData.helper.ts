/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the a helper to send the update a parsed project's data to the client and set the status to parsed.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { NamedDataSet } from '../../../huirth/huirth.model';
import { huirthUpdateParsedProjectDataSet } from '../../../huirth/qualities/updateParsedProjectDataSet.quality';

export const huirthServerSendUpdateParsedProjectData = (dataSet: NamedDataSet) =>
  userInterfaceServerSendActionToClient(huirthUpdateParsedProjectDataSet.actionCreator({ dataSet }));
/*#>*/
