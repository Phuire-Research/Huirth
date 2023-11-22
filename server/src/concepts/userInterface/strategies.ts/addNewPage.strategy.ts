/*<$
For the framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, createActionNode, createStrategy } from 'stratimux';
import { userInterfaceAddNewPage } from '../qualities/addNewPage.quality';
import { PageStrategyCreators } from '../../../model/userInterface';

export const userInterfaceAddNewPageStrategyTopic = 'User Interface add new Page';
export function userInterfaceAddNewPageStrategy(pageStrategy: PageStrategyCreators): ActionStrategy {
  const stepAddToState = createActionNode(userInterfaceAddNewPage({
    pageStrategy,
  }), {
    successNode: null,
    failureNode: null,
  });

  return createStrategy({
    topic: userInterfaceAddNewPageStrategyTopic,
    initialNode: stepAddToState,
  });
}
/*#>*/