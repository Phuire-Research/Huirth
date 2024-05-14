/*<$
For the graph programming framework Stratimux and a Concept huirth, for the client generate a helper action that will trigger the clone git repository on the server.
$>*/
/*<#*/
import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.helper';

export const huirthSendTriggerGitPullRepositoryStrategy = (name: string) =>
  (userInterfaceClientSendActionToServer(createAction('huirthServer trigger git pull repository strategy', {payload: {
    name,
  }})));
/*#>*/