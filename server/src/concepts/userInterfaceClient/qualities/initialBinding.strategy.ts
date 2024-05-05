/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a ActionStrategy that will create bindings for the first page provided from a list
$>*/
/*<#*/
import {
  Action,
  ActionStrategy,
  createActionNode,
  createStrategy,
  strategySequence
} from 'stratimux';
import { Page } from '../../../model/userInterface';
import { userInterfaceClientDetermineBindings } from './clientDetermineBindings.quality';
import { Subject } from 'rxjs';

export const userInterfaceInitialBindingTopic = 'User Interface create Page Strategy';

export function userInterfaceInitialBindingStrategy(
  action$: Subject<Action>,
  pages: Page[],
): ActionStrategy {
  const initialStep = createActionNode(userInterfaceClientDetermineBindings({action$}));
  const initialStrategy = createStrategy({
    topic: userInterfaceInitialBindingTopic,
    initialNode: initialStep,
    data: pages[0]
  });
  // const sequence: ActionStrategy[] = [initialStrategy];
  // for (let i = 1; i < pages.length; i++) {
  //   sequence.push(
  //     createStrategy({
  //       topic: userInterfaceInitialBindingTopic,
  //       initialNode: initialStep,
  //       data: pages[i]
  //     })
  //   );
  // }
  // return strategySequence(sequence) as ActionStrategy;
  return initialStrategy;
}
/*#>*/