/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts transformation strategy based on the passed selection value.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createAction,
  createActionNode,
  createMethodWithState,
  createQualityCard,
  createStrategy,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export const [
  huirthSendTriggerSelectedTransformationStrategy,
  huirthSendTriggerSelectedTransformationStrategyType,
  huirthSendTriggerSelectedTransformationStrategyQuality,
] = createQualityCard({
  type: 'huirth send trigger selected transformation strategy to server',
  reducer: (state: huirthState): huirthState => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      ...state,
      dataSetSelection,
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodWithState<huirthState>(
      (_, state) => {
        const serverActionType = 'huirthServer trigger passed transformation strategy from payload';
        const { selectedTransformation } = state;
        const topic = 'Sent to Web Socket: Trigger : ' + serverActionType + ' ' + selectedTransformation;
        return strategyBegin(
          createStrategy({
            topic,
            initialNode: createActionNode(
              userInterfaceClientSendActionToServer(
                createAction(serverActionType, {
                  payload: {
                    selection: selectedTransformation,
                  },
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
