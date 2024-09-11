/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will remove a page by name and its union pageStrategy
$>*/
/*<#*/
import { ActionStrategy, createActionNode, createStrategy } from '@phuire/stratimux';
import { userInterfaceRemovePage } from '../qualities/removePage.quality';

export const userInterfaceRemovePageStrategyTopic = 'User Interface remove page strategy. ';
export function userInterfaceRemovePageStrategy(name: string): ActionStrategy {
  const stepRemoveFromState = createActionNode(
    userInterfaceRemovePage({
      name,
    })
  );

  return createStrategy({
    topic: userInterfaceRemovePageStrategyTopic,
    initialNode: stepRemoveFromState,
    priority: 600,
  });
}
/*#>*/
