/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will Send the trigger action to the server that starts transformation strategy based on the passed selection value.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createAction,
  createActionNode,
  createMethodWithState,
  createQuality,
  createStrategy,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export const logixUXSendTriggerSelectedTransformationStrategyType: ActionType =
  'logixUX send trigger selected transformation strategy to server';
export const logixUXSendTriggerSelectedTransformationStrategy = prepareActionCreator(logixUXSendTriggerSelectedTransformationStrategyType);

const logixUXSendTriggerSelectedTransformationStrategyMethodCreator: MethodCreator = (concepts$, semaphore) =>
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
            ),
            {
              successNode: null,
              failureNode: null,
            }
          ),
        })
      );
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );

const logixUXSendTriggerSelectedTransformationStrategyReducer = (state: LogixUXState, _: Action): LogixUXState => {
  const dataSetSelection = state.dataSetSelection.map(() => false);
  return {
    ...state,
    dataSetSelection,
  };
};

export const logixUXSendTriggerSelectedTransformationStrategyQuality = createQuality(
  logixUXSendTriggerSelectedTransformationStrategyType,
  logixUXSendTriggerSelectedTransformationStrategyReducer,
  logixUXSendTriggerSelectedTransformationStrategyMethodCreator
);
/*#>*/
