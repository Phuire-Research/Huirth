/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, Concepts, createActionNode, createActionNodeFromStrategy, createStrategy } from '@phuire/stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';
import {
  userInterfacePageToStateStrategy,
  userInterfacePageToStateStrategyStitch,
} from '../../userInterface/strategies.ts/pageToState.strategy';
import { userInterfaceAddNewPage } from '../../userInterface/qualities/addNewPage.quality';
import { huirthSetTrainingDataPage } from '../qualities/setTrainingDataPage.quality';

export const huirthAddTrainingDataPageStrategyTopic = 'User Interface add new Page Strategy, for: ';
export function huirthAddTrainingDataPageStrategy(name: string, pageStrategy: PageStrategyCreators, concepts: Concepts): ActionStrategy {
  const setToTrainingDataPages = createActionNode(
    huirthSetTrainingDataPage({
      trainingDataName: name,
    })
  );
  const [step, strategy] = userInterfacePageToStateStrategyStitch(pageStrategy(concepts));
  step.successNode = setToTrainingDataPages;
  const stepPageToState = createActionNodeFromStrategy(strategy);
  const stepAddToState = createActionNode(
    userInterfaceAddNewPage({
      pageStrategy,
    }),
    {
      successNode: stepPageToState,
    }
  );

  return createStrategy({
    topic: huirthAddTrainingDataPageStrategyTopic + name,
    initialNode: stepAddToState,
    data: strategy.data,
    priority: 1100,
  });
}
/*#>*/
