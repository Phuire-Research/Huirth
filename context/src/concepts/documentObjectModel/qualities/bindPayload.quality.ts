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

export type DocumentObjectModelBindPayloadPayload = unknown;
export const documentObjectModelBindPayloadType: ActionType = 'Document Object Model bind payload';
export const documentObjectModelBindPayload =
  prepareActionWithPayloadCreator<DocumentObjectModelBindPayloadPayload>(documentObjectModelBindPayloadType);

const createDocumentObjectModelBindPayloadCreator: MethodCreator = () => createMethod((action) => {
  if (action.strategy) {
    const strategy = strategySuccess(action.strategy);
    strategy.payload = selectPayload(action);
    return strategy;
  } else {
    return action;
  }
});

export const documentObjectModelBindPayloadQuality = createQuality(
  documentObjectModelBindPayloadType,
  defaultReducer,
  createDocumentObjectModelBindPayloadCreator,
);
