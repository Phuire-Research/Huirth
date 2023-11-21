import { createAction } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../../userInterfaceClient/strategies/sendActionToServer.strategy';

export const logixUXTriggerSaveTrainingDataStrategy = () =>
  (userInterfaceClientSendActionToServer(createAction('logixUXServer triggerSaveTrainingDataStrategy')));