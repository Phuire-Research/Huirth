/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a ActionStrategy that will create bindings for the first page provided from a list
$>*/
/*<#*/
import { Action, ActionStrategy, createActionNode, createStrategy, Deck, strategySequence } from 'stratimux';
import { Page } from '../../../model/userInterface';
import { Subject } from 'rxjs';
import { UserInterfaceClientDeck } from '../userInterfaceClient.concept';

export const userInterfaceInitialBindingTopic = 'User Interface create Page Strategy';

export function userInterfaceInitialBindingStrategy(
  action$: Subject<Action>,
  pages: Page[],
  deck: Deck<UserInterfaceClientDeck>
): ActionStrategy {
  const initialStep = createActionNode(deck.userInterfaceClient.e.userInterfaceClientDetermineBindings({ action$ }));
  const initialStrategy = createStrategy({
    topic: userInterfaceInitialBindingTopic,
    initialNode: initialStep,
    data: pages[0],
  });
  return initialStrategy;
}
/*#>*/
