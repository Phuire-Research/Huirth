/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate the a helper to send the update a parsed project's data to the client and set the status to parsed.
$>*/
/*<#*/
import { userInterfaceServerSendActionToClient } from '../../../userInterfaceServer/strategies/sendActionToClient.helper';
import { NamedDataSet } from '../../../logixUX/logixUX.model';
import { logixUXUpdateParsedProjectDataSet } from '../../../logixUX/qualities/updateParsedProjectDataSet.quality';

export const logixUXServerSendUpdateParsedProjectData = (dataSet: NamedDataSet) =>
  (userInterfaceServerSendActionToClient(logixUXUpdateParsedProjectDataSet({dataSet})));
/*#>*/