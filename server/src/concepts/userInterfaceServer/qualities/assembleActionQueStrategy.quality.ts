import {
  Action,
  ActionNode,
  ActionStrategy,
  ActionType,
  axiumLog,
  createActionNode,
  createMethod,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';

export type UserInterfaceAssembleActionQueStrategyPayload = {
  actionQue: Action[]
}
export const userInterfaceAssembleActionQueStrategyType: ActionType =
  'User Interface add composed Page to State';
export const userInterfaceAssembleActionQueStrategy = prepareActionWithPayloadCreator(userInterfaceAssembleActionQueStrategyType);

const createUserInterfaceAssembleActionQueStrategyMethod = () => createMethod(action => {
  const actionQue = selectPayload<UserInterfaceAssembleActionQueStrategyPayload>(action).actionQue;
  // Generate strategy
  return action;
});

export const userInterfaceAssembleActionQueStrategyQuality = createQuality(
  userInterfaceAssembleActionQueStrategyType,
  defaultReducer,
  createUserInterfaceAssembleActionQueStrategyMethod,
);

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (action: Action): [ActionNode, ActionStrategy] => {
  const stepUpdateAtomic = createActionNode(axiumLog(), {
    successNode: null,
    failureNode: null
  });
  const stepAction = createActionNode(action, {
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