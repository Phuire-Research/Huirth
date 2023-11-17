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
import { logixUX_createTrainingDataSelector } from '../../../logixUX.selector';
// import { logixUXTriggerSaveDataSetStrategy } from '../../../strategies/server/triggerSaveDataSetStrategy.helper';

export const logixUXDataSetContentType: ActionType = 'create userInterface for DataSetContent';
export const logixUXDataSetContent = prepareActionComponentCreator(logixUXDataSetContentType);

const createDataSetContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts((action, concepts, semaphore) => {
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
      let dataSet: BaseDataSet[] | undefined;
      let index = -1;
      for (const [i, data] of trainingData.entries()) {
        if (data.name === payload.pageTitle) {
          dataSet = data.dataSet;
          index = 1;
          break;
        }
      }
      if (dataSet) {
        for (const [i, data] of dataSet.entries()) {
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: contentID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: axiumLog()
          });
          finalOutput += /*html*/`
<div class="text-black">
  <h1 type="text" id="${promptID + elementID}"> ${data.prompt} </h1>
    <textarea id="${chosenID + elementID}" rows="4" cols="50">
  ${data.content}
    </textarea>
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
            logixUX_createTrainingDataSelector(concepts, semaphore) as KeyedSelector
          ])
        ],
        action: logixUXDataSetContent(payload),
        html: /*html*/`
        <div id='${id}'>
          <button id=${addEntryID} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Add Entry
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

export const logixUXDataSetContentQuality = createQuality(
  logixUXDataSetContentType,
  defaultReducer,
  createDataSetContentMethodCreator,
);
