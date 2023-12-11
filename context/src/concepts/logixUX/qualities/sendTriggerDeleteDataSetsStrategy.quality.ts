/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will Send the trigger action to the server that starts deletion strategy for data set that have been removed.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  createAction,
  createActionNode,
  createMethodDebounce,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { logixUXClearDataSetSelection } from './clearDataSetSelection.quality';

export type LogixUXSendTriggerDeleteDataSetsStrategyPayload = {
  names: string[];
};
export const logixUXSendTriggerDeleteDataSetsStrategyType: ActionType = 'logixUX send trigger delete data sets strategy';
export const logixUXSendTriggerDeleteDataSetsStrategy = prepareActionWithPayloadCreator<LogixUXSendTriggerDeleteDataSetsStrategyPayload>(
  logixUXSendTriggerDeleteDataSetsStrategyType
);

const logixUXSendTriggerDeleteDataSetsStrategyMethodCreator: MethodCreator = () =>
  createMethodDebounce((action) => {
    const payload = selectPayload<LogixUXSendTriggerDeleteDataSetsStrategyPayload>(action);
    return strategyBegin(
      createStrategy({
        topic: 'Sent to Web Socket: Trigger Delete Data Sets: ' + payload.names.join(', '),
        initialNode: createActionNode(
          userInterfaceClientSendActionToServer(createAction('logixUXServer trigger delete data sets strategy', payload)),
          {
            successNode: createActionNode(logixUXClearDataSetSelection(), {
              successNode: null,
              failureNode: null,
            }),
            failureNode: null,
          }
        ),
      })
    );
  }, 50);

export const logixUXSendTriggerDeleteDataSetsStrategyQuality = createQuality(
  logixUXSendTriggerDeleteDataSetsStrategyType,
  defaultReducer,
  logixUXSendTriggerDeleteDataSetsStrategyMethodCreator
);
/*#>*/
