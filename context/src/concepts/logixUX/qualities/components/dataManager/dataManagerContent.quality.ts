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
import { chosenID, generateNumID, promptID, rejectedID } from '../../../logixUX.model';
import { logixUXUpdateFromPromptPayload } from '../../updateFromPromptPayload.quality';
import { logixUXUpdateFromChosenPayload } from '../../updateFromChosenPayload.quality';
import { logixUXUpdateFromRejectedPayload } from '../../updateFromRejectedPayload.quality';
import { logixUXNewDataSetEntry } from '../../newDataSetEntry.quality';
import { logixUX_createTrainingDataSelector } from '../../../logixUX.selector';
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
          // bindingsArray.push({
          //   elementId: promptID + elementID,
          //   eventBinding: elementEventBinding.onchange,
          //   action: logixUXUpdateFromPromptPayload()
          // });
          // bindingsArray.push({
          //   elementId: chosenID + elementID,
          //   eventBinding: elementEventBinding.onchange,
          //   action: logixUXUpdateFromChosenPayload()
          // });
          // bindingsArray.push({
          //   elementId: rejectedID + elementID,
          //   eventBinding: elementEventBinding.onchange,
          //   action: logixUXUpdateFromRejectedPayload()
          // });
          finalOutput += /*html*/ `
<div class="text-black">
  <h1>${trainingData[i].name}</h1>
</div>
        `;
        }
        bindingsArray.push({
          action: logixUXNewDataSetEntry(),
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
        <div id='${id}'>
          <button id=${addEntryID} class="m-2 center-m bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Add Entry
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
  );

export const logixUXDataManagerContentQuality = createQuality(
  logixUXDataManagerContentType,
  defaultReducer,
  createDataManagerContentMethodCreator
);
