/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will generate a new strategy that will atomically update the composition currently loaded in the pages property.
$>*/
/*<#*/
import {
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
import { userInterfaceUpdateAtomicPageComposition } from '../../userInterface/qualities/updateAtomicPageComposition.quality';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';
import { userInterfaceUpdateUniversalComponent } from '../../userInterface/qualities/updateUniversalComponent.quality';

export type UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload = {
  boundActionQue: BoundSelectors[]
}

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(userInterfaceUpdateAtomicPageComposition({bound}, {conceptSemaphore: bound.action.conceptSemaphore as number}));
  const stepAction = createActionNode(refreshAction(bound.action), {
    successNode: stepUpdateAtomic,
  });
  return [
    stepUpdateAtomic,
    createStrategy({
      initialNode: stepAction,
      topic: 'STITCH ATOMIC COMPOSITION UPDATE',
      priority: 1000
    })
  ];
};
const stitchUpdateUniversalComponent = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(userInterfaceUpdateUniversalComponent({bound}, {conceptSemaphore: bound.action.conceptSemaphore as number}));
  const stepAction = createActionNode(refreshAction(bound.action), {
    successNode: stepUpdateAtomic,
  });
  return [
    stepUpdateAtomic,
    createStrategy({
      initialNode: stepAction,
      topic: 'STITCH UNIVERSAL COMPONENT UPDATE',
      priority: 1000
    })
  ];
};

export const [
  userInterfaceServerAssembleUpdateAtomicCompositionStrategy,
  userInterfaceServerAssembleUpdateAtomicCompositionStrategyType,
  userInterfaceServerAssembleUpdateAtomicCompositionStrategyQuality
] = createQualitySetWithPayload<UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload>({
  type: 'User Interface assemble update atomic compositions strategy server',
  reducer: nullReducer,
  methodCreator: () => createMethod(action => {
    const boundActionQue = selectPayload<UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload>(action).boundActionQue;
    let previous: ActionNode | undefined;
    let first: ActionNode | undefined;
    const body = [];
    const tail = [];
    for (const bound of boundActionQue) {
      // let stitchUpdate = stitchUpdatedLayers;
      if (bound.semaphore[0] === -1) {
        tail.push(stitchUpdateUniversalComponent(bound));
      } else {
        body.push(stitchUpdatedLayers(bound));
      }
    }
    for (const stitch of body) {
      const [
        stitchEnd,
        stitchStrategy
      ] = stitch;
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
    for (const stitch of tail) {
      const [
        stitchEnd,
        stitchStrategy
      ] = stitch;
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
    const stepEnd = createActionNode(userInterfaceEnd());
    if (previous) {
      previous.successNode = stepEnd;
    }
    if (first) {
      return strategyBegin(createStrategy({
        initialNode: first,
        topic: 'User Interface atomic update compositions',
        priority: 1000
      }));
    }
    return action;
  })
});
/*#>*/