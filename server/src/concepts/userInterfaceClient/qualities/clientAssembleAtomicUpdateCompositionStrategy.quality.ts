/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a quality that will atomically update the page html of any new changes.
$>*/
/*<#*/
import {
  Action,
  ActionNode,
  ActionStrategy,
  createActionNode,
  createActionNodeFromStrategy,
  createMethod,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  refreshAction,
  strategyBegin,
} from '@phuire/stratimux';
import { BoundSelectors } from '../../../model/userInterface';
import { userInterfaceClientReplaceOuterHtml } from './replaceOuterHtml.quality';
import { Subject } from 'rxjs';
import { userInterfaceClientDetermineBindings } from './clientDetermineBindings.quality';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';
import { UserInterfaceClientDeck } from '../userInterfaceClient.concept';
import { UserInterfaceDeck } from '../../userInterface/userInterface.concept';

export type UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload = {
  action$: Subject<Action>;
  boundActionQue: BoundSelectors[];
};

const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepEnd = createActionNode(userInterfaceEnd.actionCreator());
  const stepReplaceOuterHtml = createActionNode(userInterfaceClientReplaceOuterHtml.actionCreator({ id: bound.id }), {
    successNode: stepEnd,
  });
  const stepAction = createActionNode(refreshAction(bound.action), {
    successNode: stepReplaceOuterHtml,
  });
  return [
    stepReplaceOuterHtml,
    createStrategy({
      initialNode: stepAction,
      topic: 'STITCH ATOMIC COMPOSITION UPDATE',
    }),
  ];
};

export const userInterfaceClientAssembleAtomicUpdateCompositionStrategy = createQualityCardWithPayload<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload, any>({
  type: 'User Interface Client assemble update atomic compositions strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload, any, UserInterfaceClientDeck>(({action, deck}) => {
      const { payload } = action;
      const boundActionQue = payload.boundActionQue;
      const action$ = payload.action$;
      let previous: ActionNode | undefined;
      let first: ActionNode | undefined;
      for (const bound of boundActionQue) {
        const [stitchEnd, stitchStrategy] = stitchUpdatedLayers(bound);
        if (previous) {
          const stitchNode = createActionNodeFromStrategy(stitchStrategy);
          previous.successNode = stitchNode;
          previous = stitchEnd;
        } else {
          const stitchNode = createActionNodeFromStrategy(stitchStrategy);
          first = stitchNode;
          previous = stitchEnd;
        }
      }
      if (previous && boundActionQue.length > 0) {
        previous.successNode = createActionNode(deck.userInterfaceClient.e.userInterfaceClientDetermineBindings({ action$ }));
      } else if (previous) {
        previous.successNode = createActionNode(deck.userInterfaceClient.e.userInterfaceEnd());
      }

      if (first) {
        return strategyBegin(
          createStrategy({
            initialNode: first,
            topic: 'User Interface atomic update compositions',
          })
        );
      }
      return action;
    }),
});
/*#>*/
