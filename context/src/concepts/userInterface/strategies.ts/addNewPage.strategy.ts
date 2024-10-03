/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, Concepts, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { userInterfaceAddNewPage } from '../qualities/addNewPage.quality';
import { PageStrategyCreators, userInterface_selectPage } from '../../../model/userInterface';
import { userInterfacePageToStateStrategy } from './pageToState.strategy';

export const userInterfaceAddNewPageStrategyTopic = 'User Interface add new Page Strategy, for: ';
export function userInterfaceAddNewPageStrategy(name: string, pageStrategy: PageStrategyCreators, concepts: Concepts): ActionStrategy {
  const strategy = userInterfacePageToStateStrategy(pageStrategy(concepts));
  const stepPageToState = createActionNodeFromStrategy(strategy);
  const stepAddToState = createActionNode(
    userInterfaceAddNewPage.actionCreator({
      pageStrategy,
    }),
    {
      successNode: stepPageToState,
    }
  );

  return createStrategy({
    topic: userInterfaceAddNewPageStrategyTopic + name,
    initialNode: stepAddToState,
    data: strategy.data,
    priority: 500,
  });
}
/*#>*/
