import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXTriggerCloneGitRepositoryStrategy = (url: string, name: string) =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer triggerCloneGitRepositoryStrategy', {
    name,
    url
  })));