/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will clear the Concept's bindingQue.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

export const [documentObjectModelClearBindingQue, documentObjectModelClearBindingQueType, documentObjectModelClearBindingQueQuality] =
  createQualityCard({
    type: 'Document Object Model clear binding que',
    reducer: (state: DocumentObjectModelState): DocumentObjectModelState => {
      return {
        ...state,
        bindingQue: {},
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
