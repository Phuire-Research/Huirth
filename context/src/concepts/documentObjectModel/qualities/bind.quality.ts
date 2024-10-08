/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will bind an action to an element.
$>*/
/*<#*/
import { Action, createMethod, createQualityCardWithPayload, refreshAction, strategyBegin, strategySuccess } from 'stratimux';
import { Binding } from '../../../model/userInterface';
import { Subject } from 'rxjs';
import { documentObjectModelBindActionStrategy } from '../strategies/bindAction.strategy';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

const setElementBinding = (element: HTMLElement, payload: DocumentObjectModelBindPayload) => {
  const { binding } = payload;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (element as any)[binding.eventBinding] = (event: unknown) => {
    payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({ event }, refreshAction(payload.binding.action))));
  };
};

export type DocumentObjectModelBindPayload = {
  action$: Subject<Action>;
  id: string;
  binding: Binding;
};

export const documentObjectModelBind = createQualityCardWithPayload<DocumentObjectModelState, DocumentObjectModelBindPayload>({
  type: 'Document Object Model bind element',
  reducer: (state) => {
    return {
      bound: true,
    };
  },
  methodCreator: () =>
    createMethod(({ action }) => {
      const payload = action.payload;
      const element = document.getElementById(payload.id);
      if (element) {
        setElementBinding(element, payload);
      }
      if (action.strategy) {
        const success = strategySuccess(action.strategy);
        return success;
      } else {
        return action;
      }
    }),
});
/*#>*/
