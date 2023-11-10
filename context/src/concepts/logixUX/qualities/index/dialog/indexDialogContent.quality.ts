/* eslint-disable max-len */
import {
  ActionType,
  Counter,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  counterName,
  createQuality,
  defaultReducer,
  getUnifiedName,
  prepareActionCreator,
  selectUnifiedState,
  strategySuccess,
} from 'stratimux';

import { createBinding, createBoundSelectors, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { createMethodWithConcepts } from '../../../../../model/methods';
import { logixUXTriggerCountingStrategy } from '../../triggerCounterStrategy.quality';
import { userInterfaceClientName } from '../../../../userInterfaceClient/userInterfaceClient.concept';
import { LogixUXState } from '../../../logixUX.concepts';
import { logixUX_createDialogSelector } from '../../../logixUX.selector';

export const logixUXIndexDialogContentType: ActionType = 'create userInterface for IndexDialogContent';
export const logixUXIndexDialogContent = prepareActionCreator(logixUXIndexDialogContentType);

const createIndexDialogContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodWithConcepts(
    (action, concepts, semaphore) => {
      const id = '#dialogID';
      const buttonId = '#buttonID';
      if (action.strategy) {
        const unifiedName = getUnifiedName(concepts, semaphore);
        if (unifiedName) {
          const isClient = unifiedName === userInterfaceClientName;
          console.log('CHECK', isClient, unifiedName);
          const dialog = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).dialog.trim();
          const counter = selectUnifiedState<Counter>(concepts, semaphore);
          console.log('CHECK COUNTER', concepts);
          const count = counter ? counter.count : 0;
          let finalDialog = '';
          if (isClient) {
            dialog.split('\n').forEach((paragraph, i) => {
              finalDialog += /*html*/ `
            <p class="pb-2 indent-4">
              ${i + ': ' + paragraph}
            </p>
          `;
            });
          }
          const boundSelectors = isClient
            ? [createBoundSelectors(id, logixUXIndexDialogContent(), [logixUX_createDialogSelector(concepts, semaphore) as KeyedSelector])]
            : [];
          return strategySuccess(
            action.strategy,
            userInterface_appendCompositionToPage(action.strategy, {
              id,
              bindings: createBinding([
                { elementId: buttonId, action: logixUXTriggerCountingStrategy(), eventBinding: elementEventBinding.onclick },
              ]),
              boundSelectors,
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
      }
      return action;
    },
    concepts$ as UnifiedSubject,
    _semaphore as number
  );

export const logixUXIndexDialogContentQuality = createQuality(
  logixUXIndexDialogContentType,
  defaultReducer,
  createIndexDialogContentMethodCreator
);

function renderDialog(dialog: string) {
  //
}
