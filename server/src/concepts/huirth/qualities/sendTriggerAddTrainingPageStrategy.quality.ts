/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import {
  createActionNode,
  createMethod,
  createQualityCardWithPayload,
  createStrategy,
  defaultReducer,
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthTriggerAddTrainingDataPage } from './triggerAddTrainingDataPageStrategy.quality';
import { huirthState } from '../huirth.concept';

type SendTriggerAddTrainingPageStrategy = {
  name: string;
};

export const huirthSendAddTrainingPageStrategy = createQualityCardWithPayload<huirthState, SendTriggerAddTrainingPageStrategy>({
  type: 'Huirth send add training page strategy',
  reducer: defaultReducer,
  methodCreator: () =>
    createMethod(({ action }) => {
      console.log('DOES THIS HIT');
      const { name } = action.payload;
      return strategyBegin(
        createStrategy({
          topic: 'Send to Web Socket: Trigger Add Training Data Page: ' + name,
          initialNode: createActionNode(userInterfaceClientSendActionToServer(huirthTriggerAddTrainingDataPage.actionCreator({ name }))),
        })
      );
    }),
});
/*#>*/
