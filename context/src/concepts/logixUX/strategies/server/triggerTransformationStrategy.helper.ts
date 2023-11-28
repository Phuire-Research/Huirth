/*<$
For the graph programming framework Stratimux and a Concept logixUX, for the client generate a helper action that will trigger the clone git repository on the server.
$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.helper';

export const logixUXSendTriggerTransformationStrategy = (selection: string) =>
  userInterfaceClientSendActionToServer(
    createAction('logixUXServer trigger passed transformation strategy from payload', {
      selection,
    })
  );
/*#>*/
