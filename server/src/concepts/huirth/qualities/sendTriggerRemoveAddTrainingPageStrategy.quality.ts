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
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthTriggerRemoveAddTrainingDataPage } from './triggerRemoveAddTrainingDataPageStrategy.quality';

type SendTriggerRemoveAddTrainingPageStrategy = {
  oldName: string;
  newName: string;
};

export const [
  huirthSendRemoveAddTrainingPageStrategy,
  huirthSendRemoveAddTrainingPageStrategyType,
  huirthSendRemoveAddTrainingPageStrategyQuality,
] = createQualityCardWithPayload<SendTriggerRemoveAddTrainingPageStrategy>({
  type: 'Huirth send remove add training page strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod((action) => {
      const payload = selectPayload<SendTriggerRemoveAddTrainingPageStrategy>(action);
      return strategyBegin(
        createStrategy({
          topic: `Send to Web Socket: Trigger Remove Add Training Data Page: Old: ${payload.oldName} New: ${payload.newName}`,
          initialNode: createActionNode(userInterfaceClientSendActionToServer(huirthTriggerRemoveAddTrainingDataPage(payload))),
        })
      );
    }),
});
/*#>*/
