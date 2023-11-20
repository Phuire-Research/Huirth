import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXSendTriggerParseRepositoryStrategy = (name: string) =>
  userInterfaceClientSendActionToServer(
    createAction('logixUXServer triggerParseRepositoryStrategy', {
      name,
    })
  );
