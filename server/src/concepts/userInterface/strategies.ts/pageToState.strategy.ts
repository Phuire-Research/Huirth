/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate an ActionStrategy that will recompose a page creation strategy to add its final composition to the state.
$>*/
/*<#*/
import { ActionNode, ActionStrategy, ActionStrategyStitch, axiumLog, createActionNode, createStrategy } from '@phuire/stratimux';
import { userInterfaceAddComposedPageToState } from '../qualities/addComposedPageToState.quality';

/**
 * Has no topic of its own, uses incoming Page Strategy
 * @param stitch Page Strategy
 * @returns ActionStrategy
 */
export function userInterfacePageToStateStrategy(stitch: ActionStrategyStitch): ActionStrategy {
  const stepAddToState = createActionNode(userInterfaceAddComposedPageToState());

  const [end, strategy] = stitch();
  // const log = createActionNode(axiumLog(), {
  //   successNode: stepAddToState
  // });
  end.successNode = stepAddToState;

  return createStrategy({
    topic: strategy.topic,
    initialNode: strategy.currentNode,
    data: strategy.data,
  });
}

export function userInterfacePageToStateStrategyStitch(stitch: ActionStrategyStitch): [ActionNode, ActionStrategy] {
  const stepAddToState = createActionNode(userInterfaceAddComposedPageToState());

  const [end, strategy] = stitch();
  // const log = createActionNode(axiumLog(), {
  //   successNode: stepAddToState
  // });
  end.successNode = stepAddToState;

  return [
    stepAddToState,
    createStrategy({
      topic: strategy.topic,
      initialNode: strategy.currentNode,
      data: strategy.data,
    }),
  ];
}
/*#>*/
