/*<$
For the framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, Concepts, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { userInterfaceAddNewPage } from '../qualities/addNewPage.quality';
import { PageStrategyCreators, userInterface_selectPage } from '../../../model/userInterface';
import { userInterfacePageToStateStrategy } from './pageToState.strategy';

export const userInterfaceAddNewPageStrategyTopic = 'User Interface add new Page Strategy, for: ';
export function userInterfaceAddNewPageStrategy(pageStrategy: PageStrategyCreators, concepts: Concepts): ActionStrategy {
  const strategy = userInterfacePageToStateStrategy(pageStrategy(concepts));
  const stepPageToState = createActionNodeFromStrategy(strategy);
  const stepAddToState = createActionNode(
    userInterfaceAddNewPage({
      pageStrategy,
    }),
    {
      successNode: stepPageToState,
      failureNode: null,
    }
  );

  return createStrategy({
    topic: userInterfaceAddNewPageStrategyTopic,
    initialNode: stepAddToState,
    data: strategy.data,
  });
}
/*#>*/
