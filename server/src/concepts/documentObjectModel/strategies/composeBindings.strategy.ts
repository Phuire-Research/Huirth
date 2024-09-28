/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a strategy that will also generate a series of steps to bind each entry in the bindingQue..
$>*/
/*<#*/
import { ActionNode, MuxiumQualities, MuxiumState, Concepts, createActionNode, createStrategy } from '@phuire/stratimux';
import { UserInterfacePageBindings } from '../../../model/userInterface';
import { documentObjectModelClearBindingQue } from '../qualities/clearBindingQue.quality';
import { documentObjectModelBind } from '../qualities/bind.quality';

export const documentObjectModelBindingStrategyTopic = 'Document Object Model compose bind Page elements';
export const documentObjectModelBindingStrategy = (concepts: Concepts, pageName: string, bindingQue: UserInterfacePageBindings) => {
  const bindings = bindingQue[pageName];
  const bindingsKeys = Object.keys(bindings);
  const action$ = (concepts[0].state as MuxiumState<MuxiumQualities, any>).action$;
  let start: null | ActionNode = null;
  let previous: undefined | ActionNode;
  for (const key of bindingsKeys) {
    for (const binding of bindings[key]) {
      const node = createActionNode(documentObjectModelBind.actionCreator({ action$, binding, id: key }));
      if (start === null) {
        start = node;
        previous = start;
      } else if (previous) {
        previous.successNode = node;
        previous = node;
      }
    }
  }

  const stepBinding = createActionNode(documentObjectModelClearBindingQue.actionCreator(), {
    successNode: start,
  });
  return createStrategy({
    topic: 'Bind supplied bindingQue',
    initialNode: stepBinding,
  });
};
/*#>*/
