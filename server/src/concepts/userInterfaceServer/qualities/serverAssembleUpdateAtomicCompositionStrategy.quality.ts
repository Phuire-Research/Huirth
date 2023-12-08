/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will generate a new strategy that will atomically update the composition currently loaded in the pages property.
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
import { userInterfaceUpdateAtomicPageComposition } from '../../userInterface/qualities/updateAtomicPageComposition.quality';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';
import { userInterfaceUpdateUniversalComponent } from '../../userInterface/qualities/updateUniversalComponent.quality';

export type UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload = {
  boundActionQue: BoundSelectors[]
}
export const userInterfaceServerAssembleUpdateAtomicCompositionStrategyType: ActionType =
  'User Interface assemble update atomic compositions strategy server';
export const userInterfaceServerAssembleUpdateAtomicCompositionStrategy =
  prepareActionWithPayloadCreator(userInterfaceServerAssembleUpdateAtomicCompositionStrategyType);

const createUserInterfaceServerAssembleUpdateAtomicCompositionStrategyMethod = () => createMethod(action => {
  const boundActionQue = selectPayload<UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload>(action).boundActionQue;
  let previous: ActionNode | undefined;
  let first: ActionNode | undefined;
  for (const bound of boundActionQue) {
    let stitchUpdate = stitchUpdatedLayers;
    if (bound.semaphore[0] === -1) {
      stitchUpdate = stitchUpdateUniversalComponent;
    }
    const [
      stitchEnd,
      stitchStrategy
    ] = stitchUpdate(bound);
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
  const stepEnd = createActionNode(userInterfaceEnd(), {
    successNode: null,
    failureNode: null
  });
  if (previous) {
    previous.successNode = stepEnd;
  }
  if (first) {
    return strategyBegin(createStrategy({
      initialNode: first,
      topic: 'User Interface atomic update compositions',
    }));
  }
  return action;
});

export const userInterfaceServerAssembleUpdateAtomicCompositionStrategyQuality = createQuality(
  userInterfaceServerAssembleUpdateAtomicCompositionStrategyType,
  defaultReducer,
  createUserInterfaceServerAssembleUpdateAtomicCompositionStrategyMethod,
);

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(userInterfaceUpdateAtomicPageComposition({bound}, bound.action.conceptSemaphore as number), {
    successNode: null,
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
const stitchUpdateUniversalComponent = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(userInterfaceUpdateUniversalComponent({bound}, bound.action.conceptSemaphore as number), {
    successNode: null,
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
      topic: 'STITCH UNIVERSAL COMPONENT UPDATE'
    })
  ];
};
/*#>*/