/* eslint-disable max-len */
import {
  Action,
  ActionType,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { chosenID, generateNumID, promptID, rejectedID } from '../../../logixUX.model';
import { logixUXUpdateFromPromptPayload } from '../../updateFromPromptPayload.quality';
import { logixUXUpdateFromChosenPayload } from '../../updateFromChosenPayload.quality';
import { logixUXUpdateFromRejectedPayload } from '../../updateFromRejectedPayload.quality';
import { logixUXNewDataSetEntry } from '../../newDataSetEntry.quality';
import { logixUX_createDPOSelector } from '../../../logixUX.selector';
import { logixUXTriggerSaveDPOStrategy } from '../../../strategies/server/triggerSaveDPOStrategy.helper';
import { logixUXNewDPOEntry } from '../../newDPOEntry.quality';

export const logixUXIndexDPOContentType: ActionType = 'create userInterface for IndexDPOContent';
export const logixUXIndexDPOContent = prepareActionComponentCreator(logixUXIndexDPOContentType);

const createIndexDPOContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts((action, concepts, semaphore) => {
    const payload = selectComponentPayload(action);
    const id = '#trainingDataID' + payload.pageTitle;
    const addEntryID = '#addEntry' + payload.pageTitle;
    const saveDPOID = '#saveDPO' + payload.pageTitle;
    if (action.strategy) {
      const activeDPO = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).activeDPO;
      let finalOutput = '';
      const bindingsArray: {
        elementId: string;
        eventBinding: elementEventBinding;
        action: Action;
      }[] = [];
      console.log('CHECK LENGTH DPO', activeDPO);
      for (let i = 0; i < activeDPO.length; i++) {
        const elementID = generateNumID(i);
        bindingsArray.push({
          elementId: promptID + elementID,
          eventBinding: elementEventBinding.onchange,
          action: logixUXUpdateFromPromptPayload()
        });
        bindingsArray.push({
          elementId: chosenID + elementID,
          eventBinding: elementEventBinding.onchange,
          action: logixUXUpdateFromChosenPayload()
        });
        bindingsArray.push({
          elementId: rejectedID + elementID,
          eventBinding: elementEventBinding.onchange,
          action: logixUXUpdateFromRejectedPayload()
        });
        finalOutput += /*html*/`
<div class="text-black">
  <input type="text" id="${promptID + elementID}" value='${activeDPO[i].prompt}'/>
  <textarea id="${chosenID + elementID}" rows="4" cols="50">
${activeDPO[i].chosen}
  </textarea>
  <textarea id="${rejectedID + elementID}" rows="4" cols="50">
${activeDPO[i].rejected}
  </textarea>
</div>
        `;
      }
      bindingsArray.push({
        action: logixUXNewDPOEntry(),
        elementId: addEntryID,
        eventBinding: elementEventBinding.onclick
      });
      bindingsArray.push({
        action: logixUXTriggerSaveDPOStrategy(),
        elementId: saveDPOID,
        eventBinding: elementEventBinding.onclick
      });
      const bindings = createBinding(bindingsArray);
      // console.log('Check bindings', bindings);
      const strategy = strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
        id,
        bindings,
        boundSelectors: [
          // START HERE
          createBoundSelectors(id, logixUXIndexDPOContent(payload), [
            logixUX_createDPOSelector(concepts, semaphore) as KeyedSelector
          ])
        ],
        action: logixUXIndexDPOContent(payload),
        html: /*html*/`
        <div id='${id}'>
          <button id=${addEntryID} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Add Entry
          </button>
          <button id=${saveDPOID} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Save Training Data
          </button>
          <div class="mt-4 p-4 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
            ${finalOutput}
          </div>
        </div>
  `
      }));
      return strategy;
    }
    return action;
  }, concepts$ as UnifiedSubject, _semaphore as number, 50);

export const logixUXIndexDPOContentQuality = createQuality(
  logixUXIndexDPOContentType,
  defaultReducer,
  createIndexDPOContentMethodCreator,
);
