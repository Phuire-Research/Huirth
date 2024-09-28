/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will attach a element event to the next action's payload.
$>*/
/*<#*/
import { createMethod, createQualityCardWithPayload, nullReducer, strategySuccess } from '@phuire/stratimux';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

export type DocumentObjectModelBindPayloadPayload = {
  event: unknown;
};

export const documentObjectModelBindPayload =
  createQualityCardWithPayload<DocumentObjectModelState, DocumentObjectModelBindPayloadPayload>({
    type: 'Document Object Model bind payload',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod(({action}) => {
        if (action.strategy) {
          const payload = action.payload;
          const act = strategySuccess(action.strategy);
          if (act.payload) {
            (act.payload as unknown) = {
              ...act.payload as object,
              ...payload,
            };
          } else {
            (act.payload as unknown) = payload;
          }
          return act;
        } else {
          return action;
        }
      }),
  });
/*#>*/
