/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will attach a element event to the next action's payload.
$>*/
/*<#*/
import { createMethod, createQualitySetWithPayload, nullReducer, selectPayload, strategySuccess } from 'stratimux';

export type DocumentObjectModelBindPayloadPayload = {
  event: unknown;
};

export const [documentObjectModelBindPayload, documentObjectModelBindPayloadType, documentObjectModelBindPayloadQuality] =
  createQualitySetWithPayload<DocumentObjectModelBindPayloadPayload>({
    type: 'Document Object Model bind payload',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod((action) => {
        if (action.strategy) {
          const payload = selectPayload<DocumentObjectModelBindPayloadPayload>(action);
          const act = strategySuccess(action.strategy);
          if (act.payload) {
            act.payload = {
              ...act.payload,
              ...payload,
            };
          } else {
            act.payload = payload;
          }
          return act;
        } else {
          return action;
        }
      }),
  });
/*#>*/
