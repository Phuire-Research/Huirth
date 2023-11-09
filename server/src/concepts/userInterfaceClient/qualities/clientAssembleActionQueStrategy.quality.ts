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
  strategySuccess,
} from 'stratimux';
import { BoundSelectors, UserInterfaceBindings, userInterface_selectPage } from '../../../model/userInterface';
import { userInterfaceClientReplaceOuterHtml } from './replaceOuterHtml.quality';
import { determineBinding } from '../../documentObjectModel/documentObjectModel.concept';
import { Subject } from 'rxjs';
import { userInterfaceClientDetermineBindings } from './clientDetermineBindings.quality';

export type UserInterfaceClientAssembleActionQueStrategyPayload = {
  action$: Subject<Action>
  boundActionQue: BoundSelectors[]
}
export const userInterfaceClientAssembleActionQueStrategyType: ActionType =
  'User Interface Client assemble update atomic compositions strategy';
export const userInterfaceClientAssembleActionQueStrategy =
  prepareActionWithPayloadCreator<UserInterfaceClientAssembleActionQueStrategyPayload>(userInterfaceClientAssembleActionQueStrategyType);

const createUserInterfaceClientAssembleActionQueStrategyMethod = () => createMethod(action => {
  const payload = selectPayload<UserInterfaceClientAssembleActionQueStrategyPayload>(action);
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
  if (previous) {
    const stepDetermineBindings = createActionNode(userInterfaceClientDetermineBindings({action$}), {
      successNode: null,
      failureNode: null,
    });
    previous.successNode = stepDetermineBindings;
  }
  if (first) {
    console.log('ASSEMBLE DISPATCH');
    return strategyBegin(createStrategy({
      initialNode: first,
      topic: 'User Interface atomic update compositions'
    }));
  }
  return action;
});

export const userInterfaceClientAssembleActionQueStrategyQuality = createQuality(
  userInterfaceClientAssembleActionQueStrategyType,
  defaultReducer,
  createUserInterfaceClientAssembleActionQueStrategyMethod,
);

// Need to provide semaphore that will update the target composition of some page.
const stitchUpdatedLayers = (
  bound: BoundSelectors,
): [ActionNode, ActionStrategy] => {
  const stepReplaceOuterHtml = createActionNode(userInterfaceClientReplaceOuterHtml(), {
    successNode: null,
    failureNode: null
  });
  // const stepUpdateAtomic = createActionNode(userInterfaceAtomicUpdatePageComposition({bound}, bound.action.conceptSemaphore as number), {
  //   successNode: null,
  //   failureNode: null
  // });
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