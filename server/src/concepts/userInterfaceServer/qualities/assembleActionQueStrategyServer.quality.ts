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

export type UserInterfaceAssembleActionQueStrategyServerPayload = {
  boundActionQue: BoundSelectors[]
}
export const userInterfaceAssembleActionQueStrategyServerType: ActionType =
  'User Interface assemble update atomic compositions strategy server';
export const userInterfaceAssembleActionQueStrategyServer =
  prepareActionWithPayloadCreator(userInterfaceAssembleActionQueStrategyServerType);

const createUserInterfaceAssembleActionQueStrategyServerMethod = () => createMethod(action => {
  const boundActionQue = selectPayload<UserInterfaceAssembleActionQueStrategyServerPayload>(action).boundActionQue;
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

export const userInterfaceAssembleActionQueStrategyServerQuality = createQuality(
  userInterfaceAssembleActionQueStrategyServerType,
  defaultReducer,
  createUserInterfaceAssembleActionQueStrategyServerMethod,
);

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (bound: BoundSelectors): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(userInterfaceAtomicUpdatePageComposition({bound}, bound.action.conceptSemaphore as number), {
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