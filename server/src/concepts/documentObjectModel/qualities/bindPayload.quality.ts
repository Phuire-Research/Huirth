/*<$
For the framework Stratimux and Document Object Model Concept, generate a quality that will attach a element event to the next action's payload.
$>*/
/*<#*/
import {
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

const documentObjectModelBindPayloadMethodCreator: MethodCreator = () => createMethod((action) => {
  if (action.strategy) {
    const payload = selectPayload<DocumentObjectModelBindPayloadPayload>(action);
    const act = strategySuccess(action.strategy);
    if (act.payload) {
      act.payload = {
        ...act.payload,
        ...payload
      };
    } else {
      act.payload = payload;
    }
    return act;
  } else {
    return action;
  }
});

export const documentObjectModelBindPayloadQuality = createQuality(
  documentObjectModelBindPayloadType,
  defaultReducer,
  documentObjectModelBindPayloadMethodCreator,
);
/*#>*/