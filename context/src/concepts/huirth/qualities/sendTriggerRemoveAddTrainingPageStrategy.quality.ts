/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import { createActionNode, createMethod, createQualityCardWithPayload, createStrategy, nullReducer, strategyBegin } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { HuirthDeck, huirthState } from '../huirth.concept';
import e from 'express';
import { huirthTriggerRemoveAddTrainingDataPage } from './triggerRemoveAddTrainingDataPageStrategy.quality';

export type HuirthSendTriggerRemoveAddTrainingPageStrategy = {
  oldName: string;
  newName: string;
};

// [TODO ] Part of the same self reference bug
export const huirthSendRemoveAddTrainingPageStrategy = createQualityCardWithPayload<
  huirthState,
  HuirthSendTriggerRemoveAddTrainingPageStrategy,
  HuirthDeck
>({
  type: 'Huirth send remove add training page strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({ action, deck }) => {
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
