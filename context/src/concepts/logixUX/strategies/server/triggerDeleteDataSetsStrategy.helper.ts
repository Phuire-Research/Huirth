/*<$
For the framework Stratimux and a Concept logixUX, for the client generate a helper action that will trigger the delete data sets strategy on the server.
$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.helper';

export const logixUXTriggerDeleteDataSetsStrategy = (names: string[]) =>
  userInterfaceClientSendActionToServer(
    createAction('logixUXServer trigger delete data sets strategy', {
      names,
    })
  );
/*#>*/
