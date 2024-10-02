/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts transformation strategy based on the passed selection value.
$>*/
/*<#*/
import { createAction, createActionNode, createMethodWithState, createQualityCard, createStrategy, strategyBegin } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export const huirthSendTriggerSelectedTransformationStrategy = createQualityCard<huirthState>({
  type: 'huirth send trigger selected transformation strategy to server',
  reducer: (state) => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      dataSetSelection,
    };
  },
  methodCreator: () =>
    createMethodWithState<huirthState>(({ state }) => {
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
    }),
});
/*#>*/
