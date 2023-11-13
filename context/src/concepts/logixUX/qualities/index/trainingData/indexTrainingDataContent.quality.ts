/* eslint-disable max-len */
import {
  Action,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  axiumLog,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  selectUnifiedState,
  strategySuccess,
} from 'stratimux';

import { createBinding, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { LogixUXState } from '../../../logixUX.concept';
import { logixUXUpdateFromPayload } from '../../updateFromPayload.quality';

export const logixUXIndexTrainingDataContentType: ActionType = 'create userInterface for IndexTrainingDataContent';
export const logixUXIndexTrainingDataContent = prepareActionCreator(logixUXIndexTrainingDataContentType);

const createIndexTrainingDataContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts, semaphore) => {
      const id = '#trainingDataID';

      if (action.strategy) {
        const trainingData = (selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState).trainingData;
        const trainingDataKeys = Object.keys(trainingData);
        const promptID = '#promptID';
        const chosenID = '#chosenID';
        const rejectedID = '#rejectedID';
        let finalOutput = '';
        const bindingsArray: {
          elementId: string;
          eventBinding: elementEventBinding;
          action: Action;
        }[] = [];
        if (trainingDataKeys.length === 0) {
          const elementID = 0;
          bindingsArray.push({
            elementId: promptID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromPayload(),
          });
          bindingsArray.push({
            elementId: chosenID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromPayload(),
          });
          bindingsArray.push({
            elementId: rejectedID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateFromPayload(),
          });
          finalOutput += /*html*/ `
          <div>
            TESTING
            <input type="text" id="${promptID + elementID}"/>
            <textarea id="${chosenID + elementID}" rows="4" cols="50">
              Chosen Output
            </textarea>
            <textarea id="${rejectedID + elementID}" rows="4" cols="50">
              Rejected Output
            </textarea>
          </div>
        `;
        }
        const bindings = createBinding(bindingsArray);
        console.log('Check bindings', bindings);
        const strategy = strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            bindings,
            boundSelectors: [],
            action: logixUXIndexTrainingDataContent(),
            html: /*html*/ `
        <div id='${id}'>
          <div class="mt-4 overflow-scroll max-h-[70vh] p-4 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
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
