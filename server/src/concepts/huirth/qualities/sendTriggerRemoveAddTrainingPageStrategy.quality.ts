/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import {
  createActionNode,
  createMethod,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  strategyBegin,
} from '@phuire/stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthTriggerRemoveAddTrainingDataPage } from './triggerRemoveAddTrainingDataPageStrategy.quality';
import { huirthState } from '../huirth.concept';

type SendTriggerRemoveAddTrainingPageStrategy = {
  oldName: string;
  newName: string;
};

export const huirthSendRemoveAddTrainingPageStrategy = createQualityCardWithPayload<huirthState, SendTriggerRemoveAddTrainingPageStrategy>({
  type: 'Huirth send remove add training page strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({ action }) => {
      const payload = action.payload;
      return strategyBegin(
        createStrategy({
          topic: `Send to Web Socket: Trigger Remove Add Training Data Page: Old: ${payload.oldName} New: ${payload.newName}`,
          initialNode: createActionNode(
            userInterfaceClientSendActionToServer(huirthTriggerRemoveAddTrainingDataPage.actionCreator(payload))
          ),
        })
      );
    }),
});
/*#>*/
