/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, Concepts, createActionNode, createActionNodeFromStrategy, createStrategy, Deck } from 'stratimux';
import { userInterfaceAddNewPage } from '../qualities/addNewPage.quality';
import { PageStrategyCreators } from '../../../model/userInterface';
import { userInterfacePageToStateStrategy } from './pageToState.strategy';
import { UserInterfaceDeck } from '../userInterface.concept';

export const userInterfaceAddNewPageStrategyTopic = 'User Interface add new Page Strategy, for: ';
export function userInterfaceAddNewPageStrategy(
  name: string,
  pageStrategy: PageStrategyCreators,
  concepts: Concepts,
  deck: Deck<UserInterfaceDeck>
): ActionStrategy {
  const strategy = userInterfacePageToStateStrategy(pageStrategy(concepts), deck);
  const stepPageToState = createActionNodeFromStrategy(strategy);
  const stepAddToState = createActionNode(
    deck.userInterface.e.userInterfaceAddNewPage({
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
