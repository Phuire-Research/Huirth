import {
  Action,
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';

export type DocumentObjectModelBindPayloadPayload = {
  event: unknown
};
export const documentObjectModelBindPayloadType: ActionType = 'Document Object Model bind payload';
export const documentObjectModelBindPayload =
  prepareActionWithPayloadCreator<DocumentObjectModelBindPayloadPayload>(documentObjectModelBindPayloadType);

const createDocumentObjectModelBindPayloadCreator: MethodCreator = () => createMethod((action) => {
  if (action.strategy) {
    const payload = selectPayload<DocumentObjectModelBindPayloadPayload>(action);
    const strategy = strategySuccess(action.strategy);
    if (strategy.payload) {
      strategy.payload = {
        ...strategy.payload,
        ...payload
      };
    } else {
      strategy.payload = payload;
    }
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
