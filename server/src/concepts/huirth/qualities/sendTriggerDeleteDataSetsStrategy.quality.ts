/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts deletion strategy for data set that have been removed.
$>*/
/*<#*/
import {
  createAction,
  createActionNode,
  createMethodDebounce,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthClearDataSetSelection } from './clearDataSetSelection.quality';

export type huirthSendTriggerDeleteDataSetsStrategyPayload = {
  names: string[];
};

export const huirthSendTriggerDeleteDataSetsStrategy = createQualityCardWithPayload<huirthState, huirthSendTriggerDeleteDataSetsStrategyPayload>({
  type: 'huirth send trigger delete data sets strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounce((action) => {
      const payload = selectPayload<huirthSendTriggerDeleteDataSetsStrategyPayload>(action);
      return strategyBegin(
        createStrategy({
          topic: 'Sent to Web Socket: Trigger Delete Data Sets: ' + payload.names.join(', '),
          initialNode: createActionNode(
            userInterfaceClientSendActionToServer(createAction('huirthServer trigger delete data sets strategy', { payload })),
            {
              successNode: createActionNode(huirthClearDataSetSelection.actionCreator()),
            }
          ),
        })
      );
    }, 50),
});
/*#>*/
