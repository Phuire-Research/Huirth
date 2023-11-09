/* eslint-disable max-len */
import {
  ActionType,
  Concepts,
  Counter,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  axiumLog,
  counterName,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  selectState,
  strategySuccess,
} from 'stratimux';

import { createBinding, createBoundSelectors, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { createMethodWithConcepts } from '../../../../../model/methods';
import { getAxiumState } from '../../../../../model/concepts';
import { logixUXTriggerCountingStrategy } from '../../triggerCounterStrategy.quality';

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
        const dialog = getAxiumState(concepts).dialog.trim();
        const counter = selectState<Counter>(concepts, counterName);
        const count = counter ? counter.count : 0;
        let finalDialog = '';
        dialog.split('\n').forEach((paragraph, i) => {
          finalDialog += /*html*/ `
        <p class="pb-2 indent-4">
          ${i + ': ' + paragraph}
        </p>
      `;
        });
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings: createBinding([
              { elementId: buttonId, action: logixUXTriggerCountingStrategy(), eventBinding: elementEventBinding.onclick },
            ]),
            boundSelectors: [createBoundSelectors(id, logixUXIndexDialogContent(), [axiumSelectDialog])],
            action: logixUXIndexDialogContent(),
            html: /*html*/ `
      <div id='${id}'>
        <button id=${buttonId} class="m-10 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          TRIGGER COUNTING ${count}
        </button>
        <br>
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
