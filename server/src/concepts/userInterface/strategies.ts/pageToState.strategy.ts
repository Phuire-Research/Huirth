import { ActionStrategy, createActionNode, createStrategy } from 'stratimux';
import { StrategyStitch } from '../../../model/actionStrategy';
import { userInterfaceAddComposedPageToState } from '../qualities/addComposedPageToState.quality';

/**
 * Has no topic of its own, uses incoming Page Strategy
 * @param stitch Page Strategy
 * @returns ActionStrategy
 */
export function userInterfacePageToStateStrategy(stitch: StrategyStitch): ActionStrategy {
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