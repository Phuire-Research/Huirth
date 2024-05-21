/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the content slice for the DataSet Component that binds all necessary functionality.
$>*/
/*<#*/
import {
  Action,
  KeyedSelector,
  UnifiedSubject,
  createMethodWithConcepts,
  nullReducer,
  selectUnifiedState,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { huirthState } from '../../../huirth.concept';
import { BaseDataSet, chosenID, contentID, generateNumID, promptID, rejectedID } from '../../../huirth.model';
import { huirthNewDataSetEntry } from '../../newDataSetEntry.quality';
import { huirth_createDataSetSelector, huirth_createTrainingDataSelector } from '../../../huirth.selector';
import { huirthUpdateDataSetContents } from '../../updateDataSetContents.quality';
import { huirthUpdateDataSetPrompt } from '../../updateDataSetPrompt.quality';

export const [
  huirthDataSetContent,
  huirthDataSetContentType,
  huirthDataSetContentQuality
] = createQualitySetComponent({
  type: 'create userInterface for DataSetContent',
  reducer: nullReducer,
  componentCreator: (act, concepts$, _semaphore) =>
    createMethodWithConcepts((action, concepts, semaphore) => {
      const payload = selectComponentPayload(action);
      const id = '#dataSetID' + payload.pageTitle;
      const addEntryID = '#addDataEntry' + payload.pageTitle;
      if (action.strategy) {
        const trainingData = (selectUnifiedState<huirthState>(concepts, semaphore) as huirthState).trainingData;
        let finalOutput = '';
        const bindingsArray: {
          elementId: string;
          eventBinding: elementEventBinding;
          action: Action;
        }[] = [];
        let dataSet: BaseDataSet[] | undefined;
        let index = -1;
        for (const [i, data] of trainingData.entries()) {
          if (data.name === payload.pageTitle) {
            dataSet = data.dataSet;
            console.log('CHECK DATASET IN CONTENT', data.name, payload.pageTitle, dataSet.length, i);
            index = i;
            break;
          }
        }
        // console.log('CHECK DATASET IN CONTENT', dataSet);
        if (dataSet) {
          // console.log('CHECK TRAINING DATA INFO', trainingData[index].name, trainingData[index].type);
          for (const [i, data] of dataSet.entries()) {
            // So I don't break anything in the final sprint. Can save pagination if I have time today or tomorrow.
            if (i === 10) {
              break;
            }
            const elementID = generateNumID(i);
            bindingsArray.push({
              elementId: promptID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: huirthUpdateDataSetPrompt({index, dataSetIndex: i})
            });
            bindingsArray.push({
              elementId: contentID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: huirthUpdateDataSetContents({index, dataSetIndex: i})
            });
            finalOutput += /*html*/`
<div class="text-black m-4">
  <label class="text-white pl-2 translate-y-2">
    Prompt
  </label>
  <input
    id="${promptID + elementID}"
    class="${'input-' + i + ' mb-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent' +
'bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all' +
'placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200' +
'focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'}"
    value="${data.prompt + ''}"
  />
  <label class="text-white pl-2 translate-y-2">
    Content
  </label>
  <textarea contentEditable="true" id="${contentID + elementID}" class="${'peer h-full min-h-[300px] w-full resize-none rounded-[7px] ' +
'border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal' +
'text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200' +
'placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0' +
'disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'}" id="${chosenID + elementID}" rows="4" cols="50"
>${data.content}</textarea>
</div>
`;
          //
          }
        }
        bindingsArray.push({
          action: huirthNewDataSetEntry({index}),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick
        });
        const bindings = createBinding(bindingsArray);
        // console.log('Check bindings', bindings);
        console.log('CHECK THIS', trainingData[index], trainingData[index]?.dataSet, index, payload);
        if (index !== -1) {
          const strategy = strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
            id,
            bindings,
            universal: false,
            boundSelectors: [
              // START HERE
              createBoundSelectors(id, huirthDataSetContent(payload), [
                huirth_createTrainingDataSelector(concepts, semaphore) as KeyedSelector,
                huirth_createDataSetSelector(concepts, semaphore, index) as KeyedSelector
              ])
            ],
            action: act(payload),
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
            <h1>Entries: ${trainingData[index] && trainingData[index].dataSet ? trainingData[index].dataSet.length : 'Data Set Removed'}</h1>
            <h1>Page: ${trainingData[index] ? trainingData[index].index + 1 + '/' + Math.round((trainingData[index].dataSet.length / 10) + 1) : '0/0'}</h1>
            <div class="flex-1 p-4 pt-0 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
              ${finalOutput}
            </div>
          </div>
    `
          }));
          return strategy;
        } else {
          return strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, 'Data Set for ' + payload.pageTitle + ' not found!'));
        }
      }
      return action;
    }, concepts$ as UnifiedSubject, _semaphore as number)
});
/*#>*/