/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a quality that will generate an ActionStrategy to bind the page's actions to the document based on the composition.
$>*/
/*<#*/
import {
  Action,
  ActionNode,
  createActionNode,
  createMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategySuccess,
} from 'stratimux';
import { UserInterfaceBindings, userInterface_selectPage } from '../../../model/userInterface';
import { Subject } from 'rxjs';
import { userInterfaceEnd } from '../../userInterface/qualities/end.quality';
import { documentObjectModelBind } from '../../documentObjectModel/qualities/bind.quality';

export type UserInterfaceClientActionQueStrategyClientPayload = {
  action$: Subject<Action>;
};
const createBindingActionNode = (action$: Subject<Action>, bindings: UserInterfaceBindings): ActionNode => {
  let first: ActionNode | undefined;
  let previous: ActionNode | undefined;
  const bindingKeys = Object.keys(bindings);
  for (const key of bindingKeys) {
    for (const bind of bindings[key]) {
      if (previous) {
        const node = createActionNode(documentObjectModelBind({ action$, binding: bind, id: key }));
        previous.successNode = node;
        previous = node;
      } else {
        const node = createActionNode(documentObjectModelBind({ action$, binding: bind, id: key }));
        first = node;
        previous = node;
      }
    }
  }
  const end = createActionNode(userInterfaceEnd());
  if (previous) {
    previous.successNode = end;
  } else {
    return end;
  }
  return first as ActionNode;
};

export const [userInterfaceClientDetermineBindings, userInterfaceClientDetermineBindingsType, userInterfaceClientDetermineBindingsQuality] =
  createQualitySetWithPayload<UserInterfaceClientActionQueStrategyClientPayload>({
    type: 'User Interface determine bindings of all passed compositions',
    reducer: nullReducer,
    methodCreator: () =>
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
      }),
  });
/*#>*/
