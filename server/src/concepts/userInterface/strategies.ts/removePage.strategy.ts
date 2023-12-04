/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will remove a page by name and its union pageStrategy
$>*/
/*<#*/
import { ActionStrategy, createActionNode, createStrategy } from 'stratimux';
import { userInterfaceRemovePage } from '../qualities/removePage.quality';

export const userInterfaceRemovePageStrategyTopic = 'User Interface remove page strategy. ';
export function userInterfaceRemovePageStrategy(name: string): ActionStrategy {
  const stepAddToState = createActionNode(userInterfaceRemovePage({
    name,
  }), {
    successNode: null,
    failureNode: null,
  });

  return createStrategy({
    topic: userInterfaceRemovePageStrategyTopic,
    initialNode: stepAddToState,
  });
}
/*#>*/