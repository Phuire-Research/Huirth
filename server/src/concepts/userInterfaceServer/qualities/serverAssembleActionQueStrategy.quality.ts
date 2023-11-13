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

export type UserInterfaceServerAssembleActionQueStrategyPayload = {
  boundActionQue: BoundSelectors[]
}
export const userInterfaceServerAssembleActionQueStrategyType: ActionType =
  'User Interface assemble update atomic compositions strategy server';
export const userInterfaceServerAssembleActionQueStrategy =
  prepareActionWithPayloadCreator(userInterfaceServerAssembleActionQueStrategyType);

const createUserInterfaceServerAssembleActionQueStrategyMethod = () => createMethod(action => {
  const boundActionQue = selectPayload<UserInterfaceServerAssembleActionQueStrategyPayload>(action).boundActionQue;
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
  // if (previous) {
  //   previous.successNode = createActionNode(userInterfaceEnd(), {
  //     successNode: null,
  //     failureNode: null
  //   });
  // }
  if (first) {
    return strategyBegin(createStrategy({
      initialNode: first,
      topic: 'User Interface atomic update compositions'
    }));
  }
  return action;
});

export const userInterfaceServerAssembleActionQueStrategyQuality = createQuality(
  userInterfaceServerAssembleActionQueStrategyType,
  defaultReducer,
  createUserInterfaceServerAssembleActionQueStrategyMethod,
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