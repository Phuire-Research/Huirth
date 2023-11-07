import {
  Action,
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  refreshAction,
  selectPayload,
  strategySuccess,
} from 'stratimux';
import { Binding } from '../../../model/userInterface';
import { Subject } from 'rxjs';

export type DocumentObjectModelBindOnClickPayload = {
  action$: Subject<Action>,
  id: string,
  binding: Binding
}
export const documentObjectModelBindOnClickType: ActionType = 'Document Object Model bind onclick';
export const documentObjectModelBindOnClick =
  prepareActionWithPayloadCreator<DocumentObjectModelBindOnClickPayload>(documentObjectModelBindOnClickType);

const createDocumentObjectModelBindOnClickCreator: MethodCreator = () => createMethod((action) => {
  const payload = selectPayload<DocumentObjectModelBindOnClickPayload>(action);
  document.getElementById(payload.id);
  document.onclick = () => {
    payload.action$.next(refreshAction(payload.binding.action));
  };
  if (action.strategy) {
    return strategySuccess(action.strategy);
  } else {
    return action;
  }
});

export const documentObjectModelBindOnClickQuality = createQuality(
  documentObjectModelBindOnClickType,
  defaultReducer,
  createDocumentObjectModelBindOnClickCreator,
);
