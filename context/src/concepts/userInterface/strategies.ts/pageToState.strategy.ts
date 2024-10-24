/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate an ActionStrategy that will recompose a page creation strategy to add its final composition to the state.
$>*/
/*<#*/
import { ActionNode, ActionStrategy, ActionStrategyStitch, createActionNode, createStrategy, Deck } from 'stratimux';
import { UserInterfaceDeck } from '../userInterface.concept';
import { DeckStitch } from '../../../model/userInterface';

/**
 * Has no topic of its own, uses incoming Page Strategy
 * @param stitch Page Strategy
 * @returns ActionStrategy
 */
export function userInterfacePageToStateStrategy(stitch: DeckStitch, deck: Deck<UserInterfaceDeck>): ActionStrategy {
  const stepAddToState = createActionNode(deck.userInterface.e.userInterfaceAddComposedPageToState());

  const [end, strategy] = stitch(deck);
  // const log = createActionNode(muxiumLog(), {
  //   successNode: stepAddToState
  // });
  end.successNode = stepAddToState;

  return createStrategy({
    topic: strategy.topic,
    initialNode: strategy.currentNode,
    data: strategy.data,
  });
}

export function userInterfacePageToStateStrategyStitch(stitch: DeckStitch, deck: Deck<UserInterfaceDeck>): [ActionNode, ActionStrategy] {
  const stepAddToState = createActionNode(deck.userInterface.e.userInterfaceAddComposedPageToState());

  const [end, strategy] = stitch(deck);
  // const log = createActionNode(muxiumLog(), {
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
