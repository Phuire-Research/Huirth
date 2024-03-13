/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the content slice of the Dialog Component with the necessary bindings and selectors.
$>*/
/*<#*/
import {
  ActionType,
  CounterState,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  counterAdd,
  counterSubtract,
  createMethodDebounceWithConcepts,
  createQuality,
  nullReducer,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage, userInterface_isClient } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { logixUX_createCountSelector, logixUX_createDialogSelector } from '../../../logixUX.selector';
import { logixUXTriggerMinusCountingStrategy } from '../../triggerMinusCounterStrategy.quality';
import { logixUXTriggerPlusCountingStrategy } from '../../triggerPlusCounterStrategy.quality';
import { logixUXTriggerRandomCountingStrategy } from '../../triggerRandomCounterStrategy.quality';

export const logixUXIndexDialogContentType: ActionType = 'create userInterface for IndexDialogContent';
export const logixUXIndexDialogContent = prepareActionComponentCreator(logixUXIndexDialogContentType);

const createIndexDialogContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts((action, concepts, semaphore) => {
    const payload = selectComponentPayload(action);
    const id = '#dialogID';
    const strategyId = '#strategyID';
    const strategyPlusId = '#strategyPlusID';
    const strategyMinusId = '#strategyMinusID';
    const addId = '#addID';
    const subtractId = '#subtractID';

    if (action.strategy) {
      const isClient = userInterface_isClient();
      if (isClient !== undefined) {
        const dialog = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).dialog.trim();
        const counter = selectUnifiedState<CounterState>(concepts, semaphore);
        const count = counter ? counter.count : 0;
        let finalDialog = '';
        // if (isClient) {
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
        if (isClient) {
          setTimeout(() => {
            const element = document.getElementById(id + 'scroll');
            if (element) {
              element.scrollTop = element.scrollHeight;
            }
          }, 20);
        }
        // }
        const boundSelectors = isClient ? [
          createBoundSelectors(id, logixUXIndexDialogContent(payload), [
            logixUX_createDialogSelector(concepts, semaphore) as KeyedSelector,
            logixUX_createCountSelector(concepts, semaphore) as KeyedSelector
          ])
        ] : [createBoundSelectors(id, logixUXIndexDialogContent(payload), [
          logixUX_createCountSelector(concepts, semaphore) as KeyedSelector
        ])];
        const strategy = strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id,
          bindings: createBinding([
            {elementId: strategyId, action: logixUXTriggerRandomCountingStrategy(), eventBinding: elementEventBinding.onclick},
            {elementId: strategyPlusId, action: logixUXTriggerPlusCountingStrategy(), eventBinding: elementEventBinding.onclick},
            {elementId: strategyMinusId, action: logixUXTriggerMinusCountingStrategy(), eventBinding: elementEventBinding.onclick},
            {elementId: addId, action: counterAdd(), eventBinding: elementEventBinding.onclick},
            {elementId: subtractId, action: counterSubtract(), eventBinding: elementEventBinding.onclick}
          ]),
          universal: false,
          boundSelectors,
          action: logixUXIndexDialogContent(payload),
          html: /*html*/`
          <div id='${id}'>
            <button id=${strategyId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Random
            </button>
            <button id=${strategyPlusId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Count Seven
            </button>
            <button id=${strategyMinusId} class="m-2 center-m bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Minus Seven
            </button>
            <button id=${addId} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              Add
            </button>
            <button id=${subtractId} class="m-2 center-m bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              Subtract
            </button>
            <span class="text-amber-300 text-xl">Count: ${count}</span>
            <br>
            <div id='${id + 'scroll'}' class="mt-4 overflow-scroll max-h-[70vh] p-4 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
              ${finalDialog}
            </div>
          </div>
    `
        }));
        return strategy;
      }
    }
    return action;
  }, concepts$ as UnifiedSubject, _semaphore as number, 50);

export const logixUXIndexDialogContentQuality = createQuality(
  logixUXIndexDialogContentType,
  nullReducer,
  createIndexDialogContentMethodCreator,
);
/*#>*/