/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will clear the Concept's bindingQue.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, nullReducer, prepareActionCreator } from 'stratimux';
import { DocumentObjectModelState } from '../documentObjectModel.concept';

export const documentObjectModelClearBindingQueType: ActionType = 'Document Object Model clear binding que';
export const documentObjectModelClearBindingQue = prepareActionCreator(documentObjectModelClearBindingQueType);

function documentObjectModelClearBindingQueReducer(state: DocumentObjectModelState, action: Action): DocumentObjectModelState {
  return {
    ...state,
    bindingQue: {},
  };
}

export const documentObjectModelClearBindingQueQuality = createQuality(
  documentObjectModelClearBindingQueType,
  nullReducer,
  defaultMethodCreator
);
