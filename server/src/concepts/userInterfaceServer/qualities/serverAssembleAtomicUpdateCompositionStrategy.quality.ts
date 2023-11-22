/*<$
For the framework Stratimux and the User Interface Server Concept, generate a quality that will generate a new strategy that will atomically update the composition currently loaded in the pages property.
$>*/
/*<#*/
import {
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
import { userInterfaceAtomicUpdatePageComposition } from '../../userInterface/qualities/atomicUpdatePageComposition.quality';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';

export type UserInterfaceServerAssembleAtomicUpdateCompositionStrategyPayload = {
  boundActionQue: BoundSelectors[]
}
export const userInterfaceServerAssembleAtomicUpdateCompositionStrategyType: ActionType =
  'User Interface assemble update atomic compositions strategy server';
export const userInterfaceServerAssembleAtomicUpdateCompositionStrategy =
  prepareActionWithPayloadCreator(userInterfaceServerAssembleAtomicUpdateCompositionStrategyType);

const createUserInterfaceServerAssembleAtomicUpdateCompositionStrategyMethod = () => createMethod(action => {
  const boundActionQue = selectPayload<UserInterfaceServerAssembleAtomicUpdateCompositionStrategyPayload>(action).boundActionQue;
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
  if (first) {
    return strategyBegin(createStrategy({
      initialNode: first,
      topic: 'User Interface atomic update compositions'
    }));
  }
  return action;
});

export const userInterfaceServerAssembleAtomicUpdateCompositionStrategyQuality = createQuality(
  userInterfaceServerAssembleAtomicUpdateCompositionStrategyType,
  defaultReducer,
  createUserInterfaceServerAssembleAtomicUpdateCompositionStrategyMethod,
);

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepEnd = createActionNode(userInterfaceEnd(), {
    successNode: null,
    failureNode: null
  });
  const stepUpdateAtomic = createActionNode(userInterfaceAtomicUpdatePageComposition({bound}, bound.action.conceptSemaphore as number), {
    successNode: stepEnd,
    failureNode: null
  });
  const stepAction = createActionNode(refreshAction(bound.action), {
    successNode: stepUpdateAtomic,
    failureNode: null
  });
  return [
    stepUpdateAtomic,
    createStrategy({
      initialNode: stepAction,
      topic: 'STITCH ATOMIC COMPOSITION UPDATE'
    })
  ];
};
/*#>*/