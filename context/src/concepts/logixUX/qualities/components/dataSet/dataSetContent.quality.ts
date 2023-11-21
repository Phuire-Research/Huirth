/* eslint-disable max-len */
import {
  Action,
  ActionType,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  axiumLog,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { BaseDataSet, chosenID, contentID, generateNumID, promptID, rejectedID } from '../../../logixUX.model';
import { logixUXNewDataSetEntry } from '../../newDataSetEntry.quality';
import { logixUX_createDataSetSelector, logixUX_createTrainingDataSelector } from '../../../logixUX.selector';
import { logixUXUpdateDataSetContents } from '../../updateDataSetContents.quality';
import { logixUXUpdateDataSetPrompt } from '../../updateDataSetPrompt.quality';
// import { logixUXTriggerSaveDataSetStrategy } from '../../../strategies/server/triggerSaveDataSetStrategy.helper';

export const logixUXDataSetContentType: ActionType = 'create userInterface for DataSetContent';
export const logixUXDataSetContent = prepareActionComponentCreator(logixUXDataSetContentType);

const createDataSetContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts((action, concepts, semaphore) => {
    const payload = selectComponentPayload(action);
    const id = '#dataSetID' + payload.pageTitle;
    const addEntryID = '#addDataEntry' + payload.pageTitle;
    if (action.strategy) {
      const trainingData = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).trainingData;
      let finalOutput = '';
      const bindingsArray: {
        elementId: string;
        eventBinding: elementEventBinding;
        action: Action;
      }[] = [];
      console.log('CHECK LENGTH Training Data', trainingData);
      let dataSet: BaseDataSet[] | undefined;
      let index = -1;
      for (const [i, data] of trainingData.entries()) {
        if (data.name === payload.pageTitle) {
          dataSet = data.dataSet;
          index = i;
          break;
        }
      }
      if (dataSet) {
        for (const [i, data] of dataSet.entries()) {
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: promptID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateDataSetPrompt({index, dataSetIndex: i})
          });
          bindingsArray.push({
            elementId: contentID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateDataSetContents({index, dataSetIndex: i})
          });
          finalOutput += /*html*/`
<div class="text-black m-4">
  <label class="text-white pl-2 translate-y-2">
    Prompt
  </label>
  <input
    id="${promptID + elementID}"
    class="input-${i} mb-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    value="${data.prompt}"
  />
  <label class="text-white pl-2 translate-y-2">
    Content
  </label>
  <textarea id="${contentID + elementID}" class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" id="${chosenID + elementID}" rows="4" cols="50">
${data.content}
  </textarea>
  <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
    Remove <i class="fa-solid fa-trash"></i>
  </button>
</div>
        `;
        }
      }
      bindingsArray.push({
        action: logixUXNewDataSetEntry({index}),
        elementId: addEntryID,
        eventBinding: elementEventBinding.onclick
      });
      const bindings = createBinding(bindingsArray);
      // console.log('Check bindings', bindings);
      const strategy = strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
        id,
        bindings,
        boundSelectors: [
          // START HERE
          createBoundSelectors(id, logixUXDataSetContent(payload), [
            logixUX_createTrainingDataSelector(concepts, semaphore) as KeyedSelector,
            logixUX_createDataSetSelector(concepts, semaphore, index) as KeyedSelector
          ])
        ],
        action: logixUXDataSetContent(payload),
        html: /*html*/`
        <div class="flex flex-col items-center" id='${id}'>
          <div class="flex-none flex items-center w-full">
            <button id=${addEntryID} class="mb-8 mt-2 center-m bg-green-800/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              Entry <i class="fa-solid fa-plus"></i>
            </button>
            <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
              Save <i class="fa-solid fa-floppy-disk"></i>
            </button>
          </div>
          <div class="flex-1 p-4 pt-0 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
            ${finalOutput}
          </div>
        </div>
  `
      }));
      return strategy;
    }
    return action;
  }, concepts$ as UnifiedSubject, _semaphore as number, 50);

export const logixUXDataSetContentQuality = createQuality(
  logixUXDataSetContentType,
  defaultReducer,
  createDataSetContentMethodCreator,
);
