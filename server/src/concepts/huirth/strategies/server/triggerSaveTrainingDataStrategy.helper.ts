/*<$
For the graph programming framework Stratimux and a Concept huirth, for the client generate a helper action that will trigger the save training data strategy on the server.
$>*/
/*<#*/
import { createAction } from '@phuire/stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.helper';

export const huirthTriggerSaveTrainingDataStrategy = () =>
  userInterfaceClientSendActionToServer(createAction('huirthServer trigger save training data strategy'));
/*#>*/
