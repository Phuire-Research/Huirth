/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the content slice for the DataSet Component that binds all necessary functionality.
$>*/
/*<#*/
import { AnyAction, createMethodWithState, nullReducer, strategyData_appendFailure, strategyFailed, strategySuccess } from 'stratimux';

import {
  ActionComponentPayload,
  createBinding,
  createBoundSelectors,
  createQualityCardComponent,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { HuirthDeck, huirthState } from '../../../huirth.concept';
import { BaseDataSet, chosenID, contentID, generateNumID, promptID, rejectedID } from '../../../huirth.model';

export const huirthDataSetContent = createQualityCardComponent<huirthState, ActionComponentPayload, HuirthDeck>({
  type: 'create userInterface for DataSetContent',
  reducer: nullReducer,
  componentCreator: createMethodWithState<huirthState, ActionComponentPayload, HuirthDeck>(({ action, state, deck, self }) => {
    const payload = action.payload;
    const id = '#dataSetID' + payload.pageTitle;
    const addEntryID = '#addDataEntry' + payload.pageTitle;
    const addSystemInstructions = '#addSystemInstructions' + payload.pageTitle;
    const roleID = '#role' + payload.pageTitle;
    const systemInstructions = '#systemInstructions' + payload.pageTitle;
    const removeEntryID = '#removeDataEntry' + payload.pageTitle;
    const incrementPageIndex = '#incrementPageIndex' + payload.pageTitle;
    const decrementPageIndex = '#decrementPageIndex' + payload.pageTitle;
    if (action.strategy) {
      const trainingData = state.trainingData;
      let finalOutput = '';
      const bindingsArray: {
        elementId: string;
        eventBinding: elementEventBinding;
        action: AnyAction;
      }[] = [];
      let dataSet: BaseDataSet[] | undefined;
      let index = -1;
      let entryIndex = -1;
      let someIndex;
      for (const [i, data] of trainingData.entries()) {
        if (data.name === payload.pageTitle) {
          dataSet = data.dataSet;
          someIndex = data;
          // console.log('CHECK DATASET IN CONTENT', data.name, payload.pageTitle, dataSet.length, i);
          index = i;
          entryIndex = data.index;
          break;
        }
      }
      if (dataSet) {
        const pageMax = entryIndex + 10;
        // console.log('CHECK TRAINING DATA INFO', trainingData[index].name, trainingData[index].type);
        for (let i = entryIndex; i < dataSet.length; i++) {
          // So I don't break anything in the final sprint. Can save pagination if I have time today or tomorrow.
          const data = dataSet[i];
          if (i === pageMax) {
            break;
          }
          finalOutput += `<div class="border-dotted border-2 border-${i % 2 === 0 ? 'sky' : 'orange'}-500 rounded-lg m-2">`;
          if (data.systemInstructions === undefined) {
            bindingsArray.push({
              elementId: addSystemInstructions + i,
              eventBinding: elementEventBinding.onclick,
              action: deck.huirth.e.huirthUpdateDataSetAddSystemInstructions({ index, dataSetIndex: i }),
            });
            finalOutput += `
        <button id=${
          addSystemInstructions + i
        } class="mb-8 mt-2 center-m bg-green-800/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            System Instructions <i class="fa-solid fa-plus"></i>
          </button>
            `;
          } else {
            bindingsArray.push({
              elementId: systemInstructions + i,
              eventBinding: elementEventBinding.onchange,
              action: deck.huirth.e.huirthUpdateDataSetSystemInstructions({ index, dataSetIndex: i }),
            });
            finalOutput += `

<div class="text-black m-4">
<label class="text-white pl-2 translate-y-2">
    System Instructions
  </label>
  <textarea contentEditable="true" id="${systemInstructions + i}" class="${
              'peer h-full min-h-[300px] w-full resize-none rounded-[7px] ' +
              'border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal' +
              'text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200' +
              'placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0' +
              'disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
            }" rows="4" cols="50"
>${data.systemInstructions}</textarea>
</div>
            `;
          }
          for (let ie = 0; ie < data.contents.length; ie++) {
            const elementID = generateNumID(i, ie);
            bindingsArray.push({
              elementId: contentID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: deck.huirth.e.huirthUpdateDataSetContents({ index, dataSetIndex: i, dataSetEntry: ie }),
            });
            bindingsArray.push({
              elementId: removeEntryID + elementID,
              eventBinding: elementEventBinding.onclick,
              action: deck.huirth.e.huirthUpdateDataSetRemoveContentsEntry({ index, dataSetIndex: i, dataSetEntry: ie }),
            });
            bindingsArray.push({
              elementId: roleID + elementID,
              eventBinding: elementEventBinding.onchange,
              action: deck.huirth.e.huirthUpdateDataSetRole({ index, dataSetIndex: i, dataSetEntry: ie }),
            });
            finalOutput += /*html*/ `
<div class="text-black m-4">
  <form class="max-w-sm mx-auto">
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
    <select id="${
      roleID + elementID
    }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected value="${data.contents[ie].role}">${data.contents[ie].role}</option>
      <option value="user">user</option>
      <option value="model">model</option>
      <option value="unset">unset</option>
    </select>
  </form> 
  <button id=${
    removeEntryID + elementID
  } class="mb-8 mt-2 center-m bg-red-800/5 hover:bg-red-500 text-red-50 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Entry <i class="fa-solid fa-minus"></i>
          </button>
  <label class="text-white pl-2 translate-y-2">
    Content
  </label>
  <textarea contentEditable="true" id="${contentID + elementID}" class="${
              'peer h-full min-h-[300px] w-full resize-none rounded-[7px] ' +
              'border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal' +
              'text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200' +
              'placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0' +
              'disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
            }" id="${chosenID + elementID}" rows="4" cols="50"
>${data.contents[ie].text}</textarea>
</div>
`;
            //
          }
          finalOutput += `<button id=${
            addEntryID + i
          } class="mb-8 mt-2 center-m bg-green-800/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Entry <i class="fa-solid fa-plus"></i>
          </button>`;
          bindingsArray.push({
            action: deck.huirth.e.huirthUpdateDataSetAddContentsEntry({
              dataSetIndex: i,
              index,
            }),
            elementId: addEntryID + i,
            eventBinding: elementEventBinding.onclick,
          });
          finalOutput += '</div>';
        }
      }
      bindingsArray.push({
        action: deck.huirth.e.huirthNewDataSetEntry({ index }),
        elementId: addEntryID,
        eventBinding: elementEventBinding.onclick,
      });
      bindingsArray.push({
        action: deck.huirth.e.huirthUpdateDataSetPageIndex({ index, increase: true }),
        elementId: incrementPageIndex,
        eventBinding: elementEventBinding.onclick,
      });
      bindingsArray.push({
        action: deck.huirth.e.huirthUpdateDataSetPageIndex({ index, increase: false }),
        elementId: decrementPageIndex,
        eventBinding: elementEventBinding.onclick,
      });
      const bindings = createBinding(bindingsArray);
      // console.log('Check bindings', bindings);
      if (index !== -1) {
        const strategy = strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings,
            universal: false,
            boundSelectors: [
              // START HERE
              // Edge case and limitation of typescript, you need to self reference
              createBoundSelectors(id, self(payload), [deck.huirth.k.trainingData, deck.huirth.k.dataSetSelection]),
            ],
            action: self(payload),
            html: /*html*/ `
      <div class="flex flex-col items-center" id='${id}'>
        <div class="flex-none flex items-center w-full">
          <button id=${addEntryID} class="mb-8 mt-2 center-m bg-green-800/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Entry <i class="fa-solid fa-plus"></i>
          </button>
          <button id=${decrementPageIndex} class="mb-8 mt-2 center-m bg-sky-800/5 hover:bg-sky-500 text-reen-50 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button id=${incrementPageIndex} class="mb-8 mt-2 center-m bg-orange-800/5 hover:bg-orange-500 text-orange-50 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
            Save <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
        <h1>Entries: ${trainingData[index] && trainingData[index].dataSet ? trainingData[index].dataSet.length : 'Data Set Removed'}</h1>
        <h1>Page: ${
          trainingData[index]
            ? Math.floor(trainingData[index].index / 10) + 1 + '/' + (Math.floor(trainingData[index].dataSet.length / 10) + 1)
            : '0/0'
        }</h1>
        <div class="flex-1 p-4 pt-0 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
          ${finalOutput}
        </div>
      </div>
`,
          })
        );
        return strategy;
      } else {
        return strategyFailed(
          action.strategy,
          strategyData_appendFailure(action.strategy, 'Data Set for ' + payload.pageTitle + ' not found!')
        );
      }
    }
    return action;
  }),
});
/*#>*/
