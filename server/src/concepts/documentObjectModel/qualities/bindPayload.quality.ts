/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will attach a element event to the next action's payload.
$>*/
/*<#*/
import { createMethod, createQualityCardWithPayload, nullReducer, selectPayload, strategySuccess } from '@phuire/stratimux';

export type DocumentObjectModelBindPayloadPayload = {
  event: unknown;
};

export const [documentObjectModelBindPayload, documentObjectModelBindPayloadType, documentObjectModelBindPayloadQuality] =
  createQualityCardWithPayload<DocumentObjectModelBindPayloadPayload>({
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
