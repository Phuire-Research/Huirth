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
  prepareActionCreator,
  selectUnifiedState,
  strategySuccess,
} from 'stratimux';

import { createBinding, createBoundSelectors, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { chosenID, generateNumID, promptID, rejectedID } from '../../../logixUX.model';
import { logixUXUpdateFromPromptPayload } from '../../updateFromPromptPayload.quality';
import { logixUXUpdateFromChosenPayload } from '../../updateFromChosenPayload.quality';
import { logixUXUpdateFromRejectedPayload } from '../../updateFromRejectedPayload.quality';
import { logixUXNewDataSetEntry } from '../../newDataSetEntry.quality';
import { logixUX_createTrainingDataSelector } from '../../../logixUX.selector';

export const logixUXIndexTrainingDataContentType: ActionType = 'create userInterface for IndexTrainingDataContent';
export const logixUXIndexTrainingDataContent = prepareActionCreator(logixUXIndexTrainingDataContentType);

const createIndexTrainingDataContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts, semaphore) => {
      const id = '#trainingDataID';
      const addEntryID = '#addEntry';
      if (action.strategy) {
        const trainingData = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).trainingData;
        let finalOutput = '';
        const bindingsArray: {
          elementId: string;
          eventBinding: elementEventBinding;
          action: Action;
        }[] = [];
        console.log('CHECK LENGTH', trainingData);
        for (let i = 0; i < trainingData.length; i++) {
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: promptID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromPromptPayload(),
          });
          bindingsArray.push({
            elementId: chosenID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromChosenPayload(),
          });
          bindingsArray.push({
            elementId: rejectedID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromRejectedPayload(),
          });
          finalOutput += /*html*/ `
<div class="text-black">
  <input type="text" id="${promptID + elementID}" value='${trainingData[i].prompt}'/>
  <textarea id="${chosenID + elementID}" rows="4" cols="50">
${trainingData[i].chosen}
  </textarea>
  <textarea id="${rejectedID + elementID}" rows="4" cols="50">
${trainingData[i].rejected}
  </textarea>
</div>
        `;
        }
        bindingsArray.push({
          action: logixUXNewDataSetEntry(),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick,
        });
        const bindings = createBinding(bindingsArray);
        console.log('Check bindings', bindings);
        const strategy = strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings,
            boundSelectors: [
              // START HERE
              createBoundSelectors(id, logixUXIndexTrainingDataContent(), [
                logixUX_createTrainingDataSelector(concepts, semaphore) as KeyedSelector,
              ]),
            ],
            action: logixUXIndexTrainingDataContent(),
            html: /*html*/ `
        <div id='${id}'>
          <div class="mt-4 overflow-scroll max-h-[70vh] p-4 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
          <button id=${addEntryID} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Add Entry
          </button>
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
  );

export const logixUXIndexTrainingDataContentQuality = createQuality(
  logixUXIndexTrainingDataContentType,
  defaultReducer,
  createIndexTrainingDataContentMethodCreator
);
