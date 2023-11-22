/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, for the client generate a helper action that will trigger the clone git repository on the server.
/*$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXTriggerCloneGitRepositoryStrategy = (url: string, name: string) =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer triggerCloneGitRepositoryStrategy', {
    name,
    url
  })));
/*#>*/