/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will clear the Concept's bindingQue.
$>*/
/*<#*/
import { createQualitySet, defaultMethodCreator } from 'stratimux';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

export const [documentObjectModelClearBindingQue, documentObjectModelClearBindingQueType, documentObjectModelClearBindingQueQuality] =
  createQualitySet({
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
