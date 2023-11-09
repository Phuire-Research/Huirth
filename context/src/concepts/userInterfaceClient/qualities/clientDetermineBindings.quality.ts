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
  selectPayload,
  strategySuccess,
} from 'stratimux';
import { UserInterfaceBindings, userInterface_selectPage } from '../../../model/userInterface';
import { determineBinding } from '../../documentObjectModel/documentObjectModel.concept';
import { Subject } from 'rxjs';

export type UserInterfaceClientActionQueStrategyClientPayload = {
  action$: Subject<Action>;
};
export const userInterfaceClientDetermineBindingsType: ActionType = 'User Interface determine bindings of all passed compositions';
export const userInterfaceClientDetermineBindings = prepareActionWithPayloadCreator(userInterfaceClientDetermineBindingsType);

const createUserInterfaceClientDetermineBindingsMethod = () =>
  createMethod((action) => {
    if (action.strategy) {
      const payload = selectPayload<UserInterfaceClientActionQueStrategyClientPayload>(action);
      let bindings: UserInterfaceBindings = {};
      userInterface_selectPage(action.strategy).compositions.forEach((comp) => {
        if (comp.bindings) {
          bindings = {
            ...bindings,
            ...comp.bindings,
          };
        }
      });
      const action$ = payload.action$;
      if (Object.keys(bindings).length > 0) {
        const stepBinding = createBindingActionNode(action$, bindings);
        action.strategy.currentNode.successNode = stepBinding;
        return strategySuccess(action.strategy);
      }
    }
    return action;
  });

export const userInterfaceClientDetermineBindingsQuality = createQuality(
  userInterfaceClientDetermineBindingsType,
  defaultReducer,
  createUserInterfaceClientDetermineBindingsMethod
);
// Need to provide semaphore that will update the target composition of some page.
const createBindingActionNode = (action$: Subject<Action>, bindings: UserInterfaceBindings): ActionNode => {
  let first: ActionNode | undefined;
  let previous: ActionNode | undefined;
  const bindingKeys = Object.keys(bindings);
  for (const key of bindingKeys) {
    for (const bind of bindings[key]) {
      if (previous) {
        const node = createActionNode(determineBinding(action$, bind, key), {
          successNode: null,
          failureNode: null,
        });
        previous.successNode = node;
        previous = node;
      } else {
        const node = createActionNode(determineBinding(action$, bind, key), {
          successNode: null,
          failureNode: null,
        });
        first = node;
        previous = node;
      }
    }
  }
  return first as ActionNode;
};
