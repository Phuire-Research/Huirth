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
  createQualitySetWithPayload,
  createStrategy,
  nullReducer,
  refreshAction,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { BoundSelectors } from '../../../model/userInterface';
import { userInterfaceClientReplaceOuterHtml } from './replaceOuterHtml.quality';
import { Subject } from 'rxjs';
import { userInterfaceClientDetermineBindings } from './clientDetermineBindings.quality';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';

export type UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload = {
  action$: Subject<Action>;
  boundActionQue: BoundSelectors[];
};

const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepEnd = createActionNode(userInterfaceEnd());
  const stepReplaceOuterHtml = createActionNode(userInterfaceClientReplaceOuterHtml({ id: bound.id }), {
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

export const [
  userInterfaceClientAssembleAtomicUpdateCompositionStrategy,
  userInterfaceClientAssembleAtomicUpdateCompositionStrategyType,
  userInterfaceClientAssembleAtomicUpdateCompositionStrategyQuality,
] = createQualitySetWithPayload<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload>({
  type: 'User Interface Client assemble update atomic compositions strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod((action) => {
      const payload = selectPayload<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload>(action);
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
        previous.successNode = createActionNode(userInterfaceClientDetermineBindings({ action$ }));
      } else if (previous) {
        previous.successNode = createActionNode(userInterfaceEnd());
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
