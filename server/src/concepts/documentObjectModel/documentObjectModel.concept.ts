/*<$
For the graph programming framework Stratimux generate a Document Object Model Concept
$>*/
/*<#*/
import { createConcept, Concept, PrincipleFunction, Principle, MuxiumDeck } from 'stratimux';
import { documentObjectModelPrinciple } from './documentObjectModel.principle';
import { UserInterfacePageBindings } from '../../model/userInterface';
import { documentObjectModelBind } from './qualities/bind.quality';
import { documentObjectModelBindPayload } from './qualities/bindPayload.quality';
import { documentObjectModelClearBindingQue } from './qualities/clearBindingQue.quality';

export const documentObjectModelName = 'documentObjectModel';

export type DocumentObjectModelState = {
  bindingQue: UserInterfacePageBindings;
  bound: boolean;
};

const createDocumentObjectModelState = (bindingQue?: UserInterfacePageBindings): DocumentObjectModelState => {
  return {
    bindingQue: bindingQue ? bindingQue : {},
    bound: false,
  };
};

const qualities = { documentObjectModelBind, documentObjectModelBindPayload, documentObjectModelClearBindingQue };

export type DocumentObjectModelDeck = {
  documentObjectModel: Concept<DocumentObjectModelState, typeof qualities>;
};

export type DocumentObjectModelPrinciple = PrincipleFunction<
  typeof qualities,
  MuxiumDeck & DocumentObjectModelDeck,
  DocumentObjectModelState
>;

export const createDocumentObjectModelConcept = (bindingQue?: UserInterfacePageBindings) => {
  return createConcept<DocumentObjectModelState, typeof qualities>(
    documentObjectModelName,
    createDocumentObjectModelState(bindingQue),
    qualities,
    [documentObjectModelPrinciple]
  );
};
/*#>*/
