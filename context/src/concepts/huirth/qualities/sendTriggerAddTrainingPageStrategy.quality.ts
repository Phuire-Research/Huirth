/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import {
  createActionNode,
  createMethod,
  createQualitySetWithPayload,
  createStrategy,
  defaultReducer,
  nullReducer,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthTriggerAddTrainingDataPage } from './triggerAddTrainingDataPageStrategy.quality';

type SendTriggerAddTrainingPageStrategy = {
  name: string;
};

export const [huirthSendAddTrainingPageStrategy, huirthSendAddTrainingPageStrategyType, huirthSendAddTrainingPageStrategyQuality] =
  createQualitySetWithPayload<SendTriggerAddTrainingPageStrategy>({
    type: 'Huirth send add training page strategy',
    reducer: defaultReducer,
    methodCreator: (concepts$, semaphore) =>
      createMethod((action) => {
        console.log('DOES THIS HIT');
        const { name } = selectPayload<SendTriggerAddTrainingPageStrategy>(action);
        return strategyBegin(
          createStrategy({
            topic: 'Send to Web Socket: Trigger Add Training Data Page: ' + name,
            initialNode: createActionNode(userInterfaceClientSendActionToServer(huirthTriggerAddTrainingDataPage({ name }))),
          })
        );
      }),
  });
/*#>*/
