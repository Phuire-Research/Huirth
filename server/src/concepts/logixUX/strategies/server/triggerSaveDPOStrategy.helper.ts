import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXTriggerSaveDPOStrategy = () =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer triggerSaveDPOStrategy')));