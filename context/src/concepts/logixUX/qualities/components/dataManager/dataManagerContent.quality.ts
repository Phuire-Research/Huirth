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
  strategySuccess,
} from 'stratimux';

import {
  createBinding,
  createBoundSelectors,
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { logixUX_createTrainingDataSelector } from '../../../logixUX.selector';
import { logixUXNewDataSet } from '../../newDataSet.quality';
import { dataSetNameID, generateNumID } from '../../../logixUX.model';
import { logixUXUpdateDataSetName } from '../../updateDataSetName.quality';
// import { logixUXTriggerSaveDataManagerStrategy } from '../../../strategies/server/triggerSaveDataManagerStrategy.helper';

export const logixUXDataManagerContentType: ActionType = 'create userInterface for DataManagerContent';
export const logixUXDataManagerContent = prepareActionComponentCreator(logixUXDataManagerContentType);

const createDataManagerContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts, semaphore) => {
      const payload = selectComponentPayload(action);
      const id = '#dataManagerID' + payload.pageTitle;
      const addEntryID = '#addEntry' + payload.pageTitle;
      if (action.strategy) {
        const trainingData = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).trainingData;
        let finalOutput = '';
        const bindingsArray: {
          elementId: string;
          eventBinding: elementEventBinding;
          action: Action;
        }[] = [];
        console.log('CHECK LENGTH Training Data', trainingData);
        for (let i = 0; i < trainingData.length; i++) {
          console.log('HIT');
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: dataSetNameID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateDataSetName({ index: i }),
          });
          finalOutput += /*html*/ `
<div class="w-72 ml-4 mt-2 mb-2">
  <div class="relative h-10 w-full min-w-[200px]">
    <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
      <i class="fa-solid fa-book"></i>
    </div>
    <input
      id="${dataSetNameID + elementID}"
      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      value="${trainingData[i].name}"
    />
  </div>
</div>
        `;
        }
        bindingsArray.push({
          action: logixUXNewDataSet(),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick,
        });
        const bindings = createBinding(bindingsArray);
        // console.log('Check bindings', bindings);
        const strategy = strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings,
            boundSelectors: [
              // START HERE
              createBoundSelectors(id, logixUXDataManagerContent(payload), [
                logixUX_createTrainingDataSelector(concepts, semaphore) as KeyedSelector,
              ]),
            ],
            action: logixUXDataManagerContent(payload),
            html: /*html*/ `
        <div class="flex flex-col items-center text-black" id='${id}'>
          <div class="flex-none flex items-center w-full">
            <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
              Compile Data Sets
            </button>
          </div>
          <div class="p-8 bg-black/10 border border-t-2 rounded border-gray-700 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
             <div class="m-4 flex-none flex items-center justify-end w-full">
              
              <h2 class="w-72 text-white text-center italic">Not Installed</h2>
              <button
                class="w-44 m-2 center-m items-center bg-white/5 hover:bg-red-500 text-red-50 hover:text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                Stratimux <img class="inline w-[27px]" src="/static/Stratimux-Spiral.png">
              </button>
            </div>
            <div class="m-4 flex-none flex items-center justify-end w-full">
              <h2 class="w-72 text-white text-center italic">Not Installed</h2>
              <button
                class="w-44 m-2 center-m items-center bg-white/5 hover:bg-yellow-500 text-yellow-50 hover:text-white font-semibold py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
              >
                logixUX <img class="inline w-[27px]" src="/static/LogixUX-Spiral.png">
              </button>
            </div>
            <div class="m-4 flex-none flex items-center w-full">
              <div class="mr-4 relative h-10 w-full min-w-[200px]">
                <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-orange-500">
                  <i class="fa-brands fa-github"></i>
                </div>
                <input
                  class="peer h-full w-full rounded-[7px] border border-orange-200 border-t-transparent bg-white px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  value="Git Repository"
                />
              </div>
              <button
                class="w-44 m-2 center-m bg-/5 hover:bg-orange-500 text-orange-50 hover:text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded"
              >
                Add Project
              </button>
            </div>
            <div class="m-4 flex-none flex items-center w-full">
              <select id="strategies" class="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Transformation Strategies</option>
                <option value="something">Something</option>
              </select>
              <button
                class="w-44 m-2 center-m bg-white/5 hover:bg-blue-500 text-blue-50 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Add Strategy
              </button>
            </div>
            <h1 class="m-4 mb-8 text-white text-3xl w-full text-center">Data Sets</h1>
            ${finalOutput}
            <button id=${addEntryID} class="m-4 center-m bg-white/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              Add Custom Data Set
            </button>
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
  );

export const logixUXDataManagerContentQuality = createQuality(
  logixUXDataManagerContentType,
  defaultReducer,
  createDataManagerContentMethodCreator
);
