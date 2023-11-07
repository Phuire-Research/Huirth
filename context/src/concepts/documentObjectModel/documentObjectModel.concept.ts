import { createConcept, Concept, axiumLog, Action } from 'stratimux';
import { documentObjectModelPrinciple } from './documentObjectModel.principle';
import { Binding, UserInterfacePageBindings } from '../../model/userInterface';
import { documentObjectModelBindOnClick, documentObjectModelBindOnClickQuality } from './qualities/bindOnClick.quality';
import { elementEventBinding } from '../../model/html';
import { Subject } from 'rxjs';
import { documentObjectModelBindPayloadQuality } from './qualities/bindPayload.quality';
import { documentObjectModelClearBindingQueQuality } from './qualities/clearBindingQue.quality';

export function determineBinding(action$: Subject<Action>, binding: Binding, id: string): Action {
  const payload = {
    action$,
    id,
    binding,
  };
  switch (binding.eventBinding) {
    case elementEventBinding.onclick: {
      return documentObjectModelBindOnClick(payload);
    }
    default: {
      return axiumLog();
    }
  }
}

export const documentObjectModelName = 'documentObjectModel';

export type DocumentObjectModelState = {
  bindingQue: UserInterfacePageBindings;
};

const createDocumentObjectModelState = (bindingQue?: UserInterfacePageBindings): DocumentObjectModelState => {
  return {
    bindingQue: bindingQue ? bindingQue : {},
  };
};

export const createDocumentObjectModelConcept = (bindingQue?: UserInterfacePageBindings): Concept => {
  return createConcept(
    documentObjectModelName,
    createDocumentObjectModelState(bindingQue),
    [documentObjectModelBindOnClickQuality, documentObjectModelBindPayloadQuality, documentObjectModelClearBindingQueQuality],
    [documentObjectModelPrinciple]
  );
};
