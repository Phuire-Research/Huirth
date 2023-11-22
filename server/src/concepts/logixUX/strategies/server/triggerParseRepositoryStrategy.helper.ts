/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, for the client generate a helper action that will trigger the parse repositories strategy on the server.
/*$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXSendTriggerParseRepositoryStrategy = (name: string) =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer triggerParseRepositoryStrategy', {
    name
  })));
/*#>*/