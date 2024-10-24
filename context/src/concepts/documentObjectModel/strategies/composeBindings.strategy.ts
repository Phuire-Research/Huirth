/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a strategy that will also generate a series of steps to bind each entry in the bindingQue..
$>*/
/*<#*/
import { ActionNode, MuxiumQualities, MuxiumState, Concepts, createActionNode, createStrategy, Deck } from 'stratimux';
import { UserInterfacePageBindings } from '../../../model/userInterface';
import { DocumentObjectModelDeck } from '../documentObjectModel.concept';

export const documentObjectModelBindingStrategyTopic = 'Document Object Model compose bind Page elements';
export const documentObjectModelBindingStrategy = (
  concepts: Concepts,
  pageName: string,
  bindingQue: UserInterfacePageBindings,
  deck: Deck<DocumentObjectModelDeck>
) => {
  const bindings = bindingQue[pageName];
  const bindingsKeys = Object.keys(bindings);
  const action$ = (concepts[0].state as MuxiumState<MuxiumQualities, any>).action$;
  let start: null | ActionNode = null;
  let previous: undefined | ActionNode;
  for (const key of bindingsKeys) {
    for (const binding of bindings[key]) {
      const node = createActionNode(deck.documentObjectModel.e.documentObjectModelBind({ action$, binding, id: key }));
      if (start === null) {
        start = node;
        previous = start;
      } else if (previous) {
        previous.successNode = node;
        previous = node;
      }
    }
  }

  const stepBinding = createActionNode(deck.documentObjectModel.e.documentObjectModelClearBindingQue(), {
    successNode: start,
  });
  return createStrategy({
    topic: 'Bind supplied bindingQue',
    initialNode: stepBinding,
  });
};
/*#>*/
