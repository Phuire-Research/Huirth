/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import { createActionNode, createMethod, createQualityCardWithPayload, createStrategy, defaultReducer, strategyBegin } from 'stratimux';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { HuirthDeck, huirthState } from '../huirth.concept';
import { huirthTriggerAddTrainingDataPage } from './triggerAddTrainingDataPageStrategy.quality';

export type HuirthSendTriggerAddTrainingPageStrategy = {
  name: string;
};

// [TODO] NUMBER 4
export const huirthSendAddTrainingPageStrategy = createQualityCardWithPayload<
  huirthState,
  HuirthSendTriggerAddTrainingPageStrategy,
  HuirthDeck
>({
  type: 'Huirth send add training page strategy',
  reducer: defaultReducer,
  methodCreator: () =>
    createMethod(({ action, deck }) => {
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
