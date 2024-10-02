/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will clear the Concept's bindingQue.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

export const documentObjectModelClearBindingQue = createQualityCard<DocumentObjectModelState>({
  type: 'Document Object Model clear binding que',
  reducer: () => {
    return {
      bindingQue: {},
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
