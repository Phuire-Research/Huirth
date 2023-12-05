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
  createMethod,
  createQuality,
  createStrategy,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { userInterface_isClient } from '../../../model/userInterface';

export type LogixUXSendTriggerDeleteDataSetsStrategyPayload = {
  names: string[],
}
export const logixUXSendTriggerDeleteDataSetsStrategyType: ActionType = 'logixUX send trigger delete data sets strategy';
export const logixUXSendTriggerDeleteDataSetsStrategy =
  prepareActionWithPayloadCreator<LogixUXSendTriggerDeleteDataSetsStrategyPayload>(logixUXSendTriggerDeleteDataSetsStrategyType);

const logixUXSendTriggerDeleteDataSetsStrategyMethodCreator: MethodCreator = () =>
  createMethod(
    (action) => {
      const payload = selectPayload<LogixUXSendTriggerDeleteDataSetsStrategyPayload>(action);
      return strategyBegin(createStrategy({
        topic: 'Sent to Web Socket: Trigger Delete Data Sets: ' + payload.names.join(', '),
        initialNode: createActionNode(userInterfaceClientSendActionToServer(createAction('logixUXServer trigger delete data sets strategy', payload)), {
          successNode: null,
          failureNode: null
        })
      }));
    }
  );

const logixUXSendTriggerDeleteDataSetsStrategyReducer = (state: LogixUXState, _: Action): LogixUXState => {
  const dataSetSelection = state.dataSetSelection.map(() => false);
  return {
    ...state,
    dataSetSelection
  };
};

export const logixUXSendTriggerDeleteDataSetsStrategyQuality = createQuality(
  logixUXSendTriggerDeleteDataSetsStrategyType,
  logixUXSendTriggerDeleteDataSetsStrategyReducer,
  logixUXSendTriggerDeleteDataSetsStrategyMethodCreator,
);
/*#>*/