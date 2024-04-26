/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will Send the trigger action to the server that starts transformation strategy based on the passed selection value.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createAction,
  createActionNode,
  createMethodWithState,
  createQualitySet,
  createStrategy,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export const [
  logixUXSendTriggerSelectedTransformationStrategy,
  logixUXSendTriggerSelectedTransformationStrategyType,
  logixUXSendTriggerSelectedTransformationStrategyQuality,
] = createQualitySet({
  type: 'logixUX send trigger selected transformation strategy to server',
  reducer: (state: LogixUXState): LogixUXState => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      ...state,
      dataSetSelection,
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodWithState<LogixUXState>(
      (_, state) => {
        const serverActionType = 'logixUXServer trigger passed transformation strategy from payload';
        const { selectedTransformation } = state;
        const topic = 'Sent to Web Socket: Trigger : ' + serverActionType + ' ' + selectedTransformation;
        return strategyBegin(
          createStrategy({
            topic,
            initialNode: createActionNode(
              userInterfaceClientSendActionToServer(
                createAction(serverActionType, {
                  selection: selectedTransformation,
                })
              )
            ),
          })
        );
      },
      concepts$ as UnifiedSubject,
      semaphore as number
    ),
});
/*#>*/
