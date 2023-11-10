/* eslint-disable max-len */
import {
  ActionType,
  Counter,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  counterAdd,
  counterName,
  counterSubtract,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  getUnifiedName,
  prepareActionCreator,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { logixUXTriggerCountingStrategy } from '../../triggerCounterStrategy.quality';
import { userInterfaceClientName } from '../../../../userInterfaceClient/userInterfaceClient.concept';
import { LogixUXState } from '../../../logixUX.concepts';
import { logixUX_createCountSelector, logixUX_createDialogSelector } from '../../../logixUX.selector';

export const logixUXIndexDialogContentType: ActionType = 'create userInterface for IndexDialogContent';
export const logixUXIndexDialogContent = prepareActionCreator(logixUXIndexDialogContentType);

const createIndexDialogContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts((action, concepts, semaphore) => {
    const id = '#dialogID';
    const strategyId = '#strategyID';
    const strategyPlusId = '#strategyPlusID';
    const strategyMinusId = '#strategyMinusID';
    const addId = '#addID';
    const subtractId = '#subtractID';

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
          let index = 0;
          dialog.split('\n').forEach((paragraph) => {
            if (paragraph.trim().includes('User Interface atomic update compositions.')) {
              const split = (paragraph.trim().split('User Interface atomic update compositions.'));
              if (split[0].trim().length > 0) {
                index++;
                finalDialog += /*html*/`
                  <p class="pb-2 indent-4">
                    ${index + ': ' + split[0]}
                  </p>
                `;
              }
              if (split[1].trim().length > 0) {
                index++;
                finalDialog += /*html*/`
                  <p class="pb-2 indent-4">
                    ${index + ': ' + split[1]}
                  </p>
                `;
              }
            } else {
              index++;
              finalDialog += /*html*/`
                <p class="pb-2 indent-4">
                  ${index + ': ' + paragraph}
                </p>
              `;
            }
          });
          setTimeout(() => {
            const element = document.getElementById(id + 'scroll');
            if (element) {
              element.scrollTop = element.scrollHeight;
            }
          }, 20);
        }
        const boundSelectors = isClient ? [
          createBoundSelectors(id, logixUXIndexDialogContent(), [
            logixUX_createDialogSelector(concepts, semaphore) as KeyedSelector,
            logixUX_createCountSelector(concepts, semaphore) as KeyedSelector
          ])
        ] : [];
        return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id,
          bindings: createBinding([
            {elementId: strategyId, action: logixUXTriggerCountingStrategy({number: 0}), eventBinding: elementEventBinding.onclick},
            {elementId: strategyPlusId, action: logixUXTriggerCountingStrategy({number: 1}), eventBinding: elementEventBinding.onclick},
            {elementId: strategyMinusId, action: logixUXTriggerCountingStrategy({number: -1}), eventBinding: elementEventBinding.onclick},
            {elementId: addId, action: counterAdd(), eventBinding: elementEventBinding.onclick},
            {elementId: subtractId, action: counterSubtract(), eventBinding: elementEventBinding.onclick}
          ]),
          boundSelectors,
          action: logixUXIndexDialogContent(),
          html: /*html*/`
          <div id='${id}'>
            <button id=${strategyId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              RANDOM
            </button>
            <button id=${strategyPlusId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              COUNT SEVEN
            </button>
            <button id=${strategyMinusId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              MINUS SEVEN
            </button>
            <button id=${addId} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              ADD
            </button>
            <button id=${subtractId} class="m-2 center-m bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              Subtract
            </button>
            <span class="text-amber-300 text-xl">Count: ${count}</span>
            <br>
            <div id='${id + 'scroll'}' class="overflow-scroll max-h-[70vh] p-12 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
              ${finalDialog}
            </div>
          </div>
    `
        }));
      }
    }
    return action;
  }, concepts$ as UnifiedSubject, _semaphore as number, 50);

export const logixUXIndexDialogContentQuality = createQuality(
  logixUXIndexDialogContentType,
  defaultReducer,
  createIndexDialogContentMethodCreator,
);
