/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a quality that will atomically update the page html of any new changes.
$>*/
/*<#*/
import {
  Action,
  ActionNode,
  ActionStrategy,
  ActionType,
  createActionNode,
  createActionNodeFromStrategy,
  createMethod,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionWithPayloadCreator,
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
  action$: Subject<Action>
  boundActionQue: BoundSelectors[]
}
export const userInterfaceClientAssembleAtomicUpdateCompositionStrategyType: ActionType =
  'User Interface Client assemble update atomic compositions strategy';
export const userInterfaceClientAssembleAtomicUpdateCompositionStrategy =
  prepareActionWithPayloadCreator<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload>(userInterfaceClientAssembleAtomicUpdateCompositionStrategyType);

const createUserInterfaceClientAssembleAtomicUpdateCompositionStrategyMethod = () => createMethod(action => {
  const payload = selectPayload<UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload>(action);
  const boundActionQue = payload.boundActionQue;
  const action$ = payload.action$;
  let previous: ActionNode | undefined;
  let first: ActionNode | undefined;
  for (const bound of boundActionQue) {
    const [
      stitchEnd,
      stitchStrategy
    ] = stitchUpdatedLayers(bound);
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
    previous.successNode = createActionNode(userInterfaceClientDetermineBindings({action$}), {
      successNode: null,
      failureNode: null,
    });
  } else if (previous) {
    previous.successNode = createActionNode(userInterfaceEnd(), {
      successNode: null,
      failureNode: null
    });
  }
  if (first) {
    return strategyBegin(createStrategy({
      initialNode: first,
      topic: 'User Interface atomic update compositions'
    }));
  }
  return action;
});

export const userInterfaceClientAssembleAtomicUpdateCompositionStrategyQuality = createQuality(
  userInterfaceClientAssembleAtomicUpdateCompositionStrategyType,
  defaultReducer,
  createUserInterfaceClientAssembleAtomicUpdateCompositionStrategyMethod,
);

const stitchUpdatedLayers = (
  bound: BoundSelectors,
): [ActionNode, ActionStrategy] => {
  const stepEnd = createActionNode(userInterfaceEnd(), {
    successNode: null,
    failureNode: null
  });
  const stepReplaceOuterHtml = createActionNode(userInterfaceClientReplaceOuterHtml({id: bound.id}), {
    successNode: stepEnd,
    failureNode: null
  });
  const stepAction = createActionNode(refreshAction(bound.action), {
    successNode: stepReplaceOuterHtml,
    failureNode: null
  });
  return [
    stepReplaceOuterHtml,
    createStrategy({
      initialNode: stepAction,
      topic: 'STITCH ATOMIC COMPOSITION UPDATE'
    })
  ];
};
/*#>*/