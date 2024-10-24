/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the content slice of the DPO DataSet Component with the necessary bindings.
$>*/
/*<#*/
/* eslint-disable max-len */
import { Action, KeyedSelector, createMethodDebounceWithConcepts, nullReducer, strategySuccess } from 'stratimux';

import {
  ActionComponentPayload,
  createBinding,
  createBoundSelectors,
  createQualityCardComponent,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { HuirthDeck, huirthState } from '../../../huirth.concept';
import { chosenID, generateNumID, promptID, rejectedID } from '../../../huirth.model';
import { huirth_createDPOSelector } from '../../../huirth.selector';
import { huirthTriggerSaveDPOStrategy } from '../../../strategies/server/triggerSaveDPOStrategy.helper';

export const huirthIndexDPOContent = createQualityCardComponent<huirthState, ActionComponentPayload, HuirthDeck>({
  type: 'create userInterface for IndexDPOContent',
  reducer: nullReducer,
  componentCreator: createMethodDebounceWithConcepts<huirthState, ActionComponentPayload, HuirthDeck>(
    ({ action, concepts_, semaphore, deck, self }) => {
      const payload = action.payload;
      const id = '#trainingDataID' + payload.pageTitle;
      const addEntryID = '#addEntry' + payload.pageTitle;
      const saveDPOID = '#saveDPO' + payload.pageTitle;
      if (action.strategy) {
        const activeDPO = (deck.huirth.k.state(concepts_) as huirthState).activeDPO;
        let finalOutput = '';
        const bindingsArray: {
          elementId: string;
          eventBinding: elementEventBinding;
          action: Action;
        }[] = [];
        for (let i = 0; i < activeDPO.length; i++) {
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: promptID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: deck.huirth.e.huirthUpdateFromPromptPayload(),
          });
          bindingsArray.push({
            elementId: chosenID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: deck.huirth.e.huirthUpdateFromChosenPayload(),
          });
          bindingsArray.push({
            elementId: rejectedID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: deck.huirth.e.huirthUpdateFromRejectedPayload(),
          });
          finalOutput += /*html*/ `
<div class="text-black">
  <label class="text-white pl-2 translate-y-2">
    Prompt
  </label>
  <input
    id="${promptID + elementID}"
    class="mb-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    value="${activeDPO[i].prompt}"
  />
  <label class="text-white pl-2 translate-y-2">
    Chosen
  </label>
  <textarea id="${
    chosenID + elementID
  }" class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" id="${
            chosenID + elementID
          }" rows="4" cols="50">
${activeDPO[i].chosen}
  </textarea>
  </textarea>
  <label class="text-white pl-2 translate-y-2">
    Rejected
  </label>
  <textarea id="${
    rejectedID + elementID
  }" class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" id="${
            chosenID + elementID
          }" rows="4" cols="50">
${activeDPO[i].rejected}
  </textarea>
</div>
        `;
        }
        bindingsArray.push({
          action: deck.huirth.e.huirthNewDPOEntry(),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick,
        });
        bindingsArray.push({
          action: huirthTriggerSaveDPOStrategy(),
          elementId: saveDPOID,
          eventBinding: elementEventBinding.onclick,
        });
        const bindings = createBinding(bindingsArray);
        // console.log('Check bindings', bindings);
        const strategy = strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings,
            universal: false,
            boundSelectors: [
              // START HERE
              createBoundSelectors(id, self(payload), [huirth_createDPOSelector(concepts_, semaphore) as KeyedSelector]),
            ],
            action: self(payload),
            html: /*html*/ `
        <div class="flex flex-col items-center" id='${id}'>
          <button id=${addEntryID} class="m-2 center-m bg-white/5 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Add Entry
          </button>
          <button id=${saveDPOID} class="m-2 center-m bg-white/5 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Save Training Data
          </button>
          <div class="mt-4 p-4 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
            ${finalOutput}
          </div>
        </div>
  `,
          })
        );
        return strategy;
      }
      return action;
    },
    50
  ),
});
/*#>*/
