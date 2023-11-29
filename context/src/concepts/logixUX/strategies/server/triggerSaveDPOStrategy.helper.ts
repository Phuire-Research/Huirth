/*<$
For the graph programming framework Stratimux and a Concept logixUX, for the client generate a helper action that will trigger the save DPO strategy on the server.
$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.helper';

export const logixUXTriggerSaveDPOStrategy = () =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer trigger save DPO strategy')));
/*#>*/