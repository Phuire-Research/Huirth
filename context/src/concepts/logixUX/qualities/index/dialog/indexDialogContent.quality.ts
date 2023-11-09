/* eslint-disable max-len */
import {
  ActionType,
  Concepts,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  axiumLog,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess,
} from 'stratimux';

import { createBinding, createBoundSelectors, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { createMethodWithConcepts } from '../../../../../model/methods';
import { getAxiumState } from '../../../../../model/concepts';

export const logixUXIndexDialogContentType: ActionType = 'create userInterface for IndexDialogContent';
export const logixUXIndexDialogContent = prepareActionCreator(logixUXIndexDialogContentType);

const axiumSelectDialog: KeyedSelector = {
  conceptName: 'axium',
  stateKeys: 'dialog',
};

const createIndexDialogContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodWithConcepts(
    (action, concepts, _) => {
      const id = '#dialogID';
      const buttonId = '#buttonID';
      if (action.strategy) {
        const dialog = getAxiumState(concepts).dialog;
        let finalDialog = '';
        dialog.split('\n').forEach((paragraph, i) => {
          finalDialog += /*html*/ `
        <p class="pb-2 indent-4">
          ${i + ': ' + paragraph}
        </p>
      `;
        });
        console.log('CHECK DIALOG', dialog);
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings: createBinding([{ elementId: buttonId, action: axiumLog(), eventBinding: elementEventBinding.onclick }]),
            boundSelectors: [createBoundSelectors(id, logixUXIndexDialogContent(), [axiumSelectDialog])],
            action: logixUXIndexDialogContent(),
            html: /*html*/ `
      <div id='${id}'>
        <button id=${buttonId}></button>
        ${finalDialog}
      </div>
`,
          })
        );
      }
      return action;
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );

export const logixUXIndexDialogContentQuality = createQuality(
  logixUXIndexDialogContentType,
  defaultReducer,
  createIndexDialogContentMethodCreator
);

function renderDialog(dialog: string) {
  //
}
