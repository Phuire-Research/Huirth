/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the content slice of the DPO DataSet Component with the necessary bindings.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  Action,
  KeyedSelector,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  nullReducer,
  selectUnifiedState,
  strategySuccess,
} from '@phuire/stratimux';

import {
  createBinding,
  createBoundSelectors,
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { huirthState } from '../../../huirth.concept';
import { chosenID, generateNumID, promptID, rejectedID } from '../../../huirth.model';
import { huirthUpdateFromPromptPayload } from '../../updateFromPromptPayload.quality';
import { huirthUpdateFromChosenPayload } from '../../updateFromChosenPayload.quality';
import { huirthUpdateFromRejectedPayload } from '../../updateFromRejectedPayload.quality';
import { huirthNewDataSetEntry } from '../../newDataSetEntry.quality';
import { huirth_createDPOSelector } from '../../../huirth.selector';
import { huirthTriggerSaveDPOStrategy } from '../../../strategies/server/triggerSaveDPOStrategy.helper';
import { huirthNewDPOEntry } from '../../newDPOEntry.quality';

export const [huirthIndexDPOContent, huirthIndexDPOContentType, huirthIndexDPOContentQuality] = createQualityCardComponent({
  type: 'create userInterface for IndexDPOContent',
  reducer: nullReducer,
  componentCreator: (act, concepts$, _semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts, semaphore) => {
        const payload = selectComponentPayload(action);
        const id = '#trainingDataID' + payload.pageTitle;
        const addEntryID = '#addEntry' + payload.pageTitle;
        const saveDPOID = '#saveDPO' + payload.pageTitle;
        if (action.strategy) {
          const activeDPO = (selectUnifiedState<huirthState>(concepts, semaphore) as huirthState).activeDPO;
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
              action: huirthUpdateFromPromptPayload(),
            });
            bindingsArray.push({
              elementId: chosenID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: huirthUpdateFromChosenPayload(),
            });
            bindingsArray.push({
              elementId: rejectedID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: huirthUpdateFromRejectedPayload(),
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
            action: huirthNewDPOEntry(),
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
                createBoundSelectors(id, huirthIndexDPOContent(payload), [huirth_createDPOSelector(concepts, semaphore) as KeyedSelector]),
              ],
              action: act(payload),
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
      concepts$ as UnifiedSubject,
      _semaphore as number,
      50
    ),
});
/*#>*/
