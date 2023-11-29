/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate an ActionStrategy that will recompose a page creation strategy to add its final composition to the state.
$>*/
/*<#*/
import { ActionStrategy, ActionStrategyStitch, createActionNode, createStrategy } from 'stratimux';
import { userInterfaceAddComposedPageToState } from '../qualities/addComposedPageToState.quality';

/**
 * Has no topic of its own, uses incoming Page Strategy
 * @param stitch Page Strategy
 * @returns ActionStrategy
 */
export function userInterfacePageToStateStrategy(stitch: ActionStrategyStitch): ActionStrategy {
  const stepAddToState = createActionNode(userInterfaceAddComposedPageToState(), {
    successNode: null,
    failureNode: null,
  });

  const [
    end,
    strategy
  ] = stitch();

  end.successNode = stepAddToState;

  return createStrategy({
    topic: strategy.topic,
    initialNode: strategy.currentNode,
    data: strategy.data
  });
}
/*#>*/