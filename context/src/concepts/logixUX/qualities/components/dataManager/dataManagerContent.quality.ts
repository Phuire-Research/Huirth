/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality that will create the Data Manager's body slice and bind all essential functions to properly manage a Stratimux project data.
$>*/
/*<#*/
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
import {
  logixUX_createDataSetSelectionSelector,
  logixUX_createLogixUXStatusSelector,
  logixUX_createPossibleProjectValidSelector,
  logixUX_createProjectStatusSelector,
  logixUX_createSelectedTransformationSelector,
  logixUX_createStratimuxStatusSelector,
  logixUX_createTrainingDataSelector,
} from '../../../logixUX.selector';
import { logixUXNewDataSet } from '../../newDataSet.quality';
import { PhuirEProjects, ProjectStatus, dataSetNameID, dataSetSelectionID, generateNumID } from '../../../logixUX.model';
import { logixUXUpdateDataSetName } from '../../updateDataSetName.quality';
import { logixUXTriggerInstallGitRepository } from '../../triggerInstallGitRepository.quality';
import { logixUXUpdateDataSetSelection } from '../../updateDataSetSelection.quality';
import { logixUXSendTriggerParseRepositoryStrategy } from '../../sendTriggerParseRepositoryStrategy.quality';
import { logixUXSendTriggerSaveDataSetSelectionStrategy } from '../../sendTriggerSaveDataSetSelectionStrategy.quality';
import { logixUXRemoveDataSetSelection } from '../../removeDataSetSelection.quality';
import { determineProjectControls } from './dataManagerProjectControls.model';
import { logixUXSetPossibleProject } from '../../setPossibleProject.quality';
import { logixUXFilterTriggerInstallGitRepository } from '../../filterTriggerInstallGitRepository.quality';
import { logixUXSetSelectedTransformation } from '../../setSelectedTransformation.quality';
import { logixUXTriggerTransformationStrategy } from '../../triggerSelectedTransformationStrategy.quality';
import { logixUXSendTriggerTransformationStrategy } from '../../../strategies/server/triggerTransformationStrategy.helper';

export const logixUXDataManagerContentType: ActionType = 'create userInterface for DataManagerContent';
export const logixUXDataManagerContent = prepareActionComponentCreator(logixUXDataManagerContentType);

const createDataManagerContentMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, _semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts, semaphore) => {
      const payload = selectComponentPayload(action);
      const id = '#dataManagerID' + payload.pageTitle;
      const projectInputID = '#projectInputID';
      const saveID = '#saveID';
      const addEntryID = '#addEntry' + payload.pageTitle;
      const removeID = '#removeID';
      const transformationSelectionID = '#transformationSelectionID';
      const triggerCreateTransformationDataSetID = '#triggerCreateTransformationDataSetID';
      const installProjectID = '#installProjectID';
      const installStratimuxID = '#install_' + PhuirEProjects.stratimux;
      let finalStratimuxID = '#stratimuxID';
      let finalStratimuxNote = 'Stratimux';
      const parseStratimuxID = '#parse_' + PhuirEProjects.stratimux;
      const installLogixUX_ID = '#install_' + PhuirEProjects.logixUX;
      let finalLogixUX_ID = '#logixUX_ID';
      let finalLogixUX_note = 'logixUX';
      const parseLogixUX_ID = '#parse_' + PhuirEProjects.logixUX;
      if (action.strategy) {
        const {
          trainingData,
          stratimuxStatus,
          logixUXStatus,
          dataSetSelection,
          projectsStatuses,
          possibleProject,
          possibleProjectValid,
          selectedTransformation,
          transformationStrategies,
        } = selectUnifiedState<LogixUXState>(concepts, semaphore) as LogixUXState;
        const anySelected = (() => {
          for (const selected of dataSetSelection) {
            if (selected) {
              return true;
            }
          }
          return false;
        })();
        let finalOutput = '';
        const [finalProjects, bindingsArray] = determineProjectControls(projectsStatuses);
        for (let i = 0; i < trainingData.length; i++) {
          const elementID = generateNumID(i);
          bindingsArray.push({
            elementId: dataSetNameID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateDataSetName({ index: i }),
          });
          bindingsArray.push({
            elementId: dataSetSelectionID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: logixUXUpdateDataSetSelection({ index: i }),
          });
          finalOutput += /*html*/ `
<div class="w-full ml-4 mt-2 mb-2">
  <div class="relative flex items-center h-10 w-full min-w-[200px]">
    <div class="absolute top-2/4 right-48 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
      <i class="fa-solid fa-book"></i>
    </div>
    <input
      id="${dataSetNameID + elementID}"
      class="${
        'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white ' +
        'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all ' +
        'placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 ' +
        'focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
      }"
      value="${trainingData[i].name}"
    />
    <button class="ml-4 italic cursor-pointer center-m bg-purple-800/5 hover:bg-purple-500 text-purple-50 font-semibold hover:text-white py-2 px-4 border border-purple-400 hover:border-transparent border-solid rounded">
      <a href="/${trainingData[i].name}"><i class="fa-solid fa-link"></i></a>
    </button>
    <input
      id="${dataSetSelectionID + elementID}"
      type="checkbox"
      class="w-40 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
      ${dataSetSelection[i] ? 'checked' : ''}
    />
  </div>
</div>
        `;
        }
        finalOutput += '</div>';
        bindingsArray.push({
          action: logixUXNewDataSet(),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick,
        });
        if (stratimuxStatus === ProjectStatus.notInstalled) {
          bindingsArray.push({
            action: logixUXTriggerInstallGitRepository({
              url: PhuirEProjects.stratimuxURL,
              name: PhuirEProjects.stratimux,
            }),
            elementId: installStratimuxID,
            eventBinding: elementEventBinding.onclick,
          });
          finalStratimuxID = installStratimuxID;
          finalStratimuxNote = 'Install Stratimux';
        } else if (stratimuxStatus === ProjectStatus.installed) {
          bindingsArray.push({
            action: logixUXSendTriggerParseRepositoryStrategy({ name: PhuirEProjects.stratimux }),
            elementId: parseStratimuxID,
            eventBinding: elementEventBinding.onclick,
          });
          finalStratimuxID = parseStratimuxID;
          finalStratimuxNote = 'Parse Stratimux';
        }
        if (logixUXStatus === ProjectStatus.notInstalled) {
          bindingsArray.push({
            action: logixUXTriggerInstallGitRepository({
              url: PhuirEProjects.logixUX_URL,
              name: PhuirEProjects.logixUX,
            }),
            elementId: installLogixUX_ID,
            eventBinding: elementEventBinding.onclick,
          });
          finalLogixUX_ID = installLogixUX_ID;
          finalLogixUX_note = 'Install LogixUX';
        } else if (logixUXStatus === ProjectStatus.installed) {
          bindingsArray.push({
            action: logixUXSendTriggerParseRepositoryStrategy({ name: PhuirEProjects.logixUX }),
            elementId: parseLogixUX_ID,
            eventBinding: elementEventBinding.onclick,
          });
          finalLogixUX_ID = parseLogixUX_ID;
          finalLogixUX_note = 'Parse LogixUX';
        }
        bindingsArray.push({
          action: logixUXSendTriggerSaveDataSetSelectionStrategy(),
          elementId: saveID,
          eventBinding: elementEventBinding.onclick,
        });
        bindingsArray.push({
          action: logixUXRemoveDataSetSelection(),
          elementId: removeID,
          eventBinding: elementEventBinding.onclick,
        });
        bindingsArray.push({
          action: logixUXSetPossibleProject(),
          elementId: projectInputID,
          eventBinding: elementEventBinding.oninput,
        });
        bindingsArray.push({
          action: logixUXSetPossibleProject(),
          elementId: projectInputID,
          eventBinding: elementEventBinding.onpaste,
        });
        bindingsArray.push({
          action: logixUXFilterTriggerInstallGitRepository(),
          elementId: installProjectID,
          eventBinding: elementEventBinding.onclick,
        });
        bindingsArray.push({
          action: logixUXSetSelectedTransformation(),
          elementId: transformationSelectionID,
          eventBinding: elementEventBinding.onchange,
        });
        bindingsArray.push({
          action: logixUXSendTriggerTransformationStrategy(),
          elementId: triggerCreateTransformationDataSetID,
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
                logixUX_createStratimuxStatusSelector(concepts, semaphore) as KeyedSelector,
                logixUX_createLogixUXStatusSelector(concepts, semaphore) as KeyedSelector,
                logixUX_createDataSetSelectionSelector(concepts, semaphore) as KeyedSelector,
                logixUX_createProjectStatusSelector(concepts, semaphore) as KeyedSelector,
                logixUX_createPossibleProjectValidSelector(concepts, semaphore) as KeyedSelector,
                logixUX_createSelectedTransformationSelector(concepts, semaphore) as KeyedSelector,
              ]),
            ],
            action: logixUXDataManagerContent(payload),
            html: /*html*/ `
        <div class="flex flex-col items-center text-black" id='${id}'>
          <button class="italic cursor-not-allowed mb-4 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
            Open <i class="fa-solid fa-folder"></i>
          </button>
          <div class="p-8 pt-2 mt-2 bg-black/10 border border-t-2 rounded border-gray-700 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
             <div class="m-4 flex-none flex items-center justify-end w-full">
              <h2 class="w-72 text-white text-center italic">${stratimuxStatus}</h2>
              <button
                id="${finalStratimuxID}"
                class="w-44 m-2 center-m items-center bg-red-800/5 hover:bg-red-500 text-red-50 hover:text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                ${finalStratimuxNote} <img class="inline w-[27px]" src="/static/Stratimux-Spiral.png">
              </button>
            </div>
            <div class="m-4 flex-none flex items-center justify-end w-full">
              <h2 class="w-72 text-white text-center italic">${logixUXStatus}</h2>
              <button
                id="${finalLogixUX_ID}"
                class="w-44 m-2 center-m items-center bg-yellow-800/5 hover:bg-yellow-500 text-yellow-50 hover:text-white font-semibold py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
              >
                ${finalLogixUX_note} <img class="inline w-[27px]" src="/static/LogixUX-Spiral.png">
              </button>
            </div>
            ${finalProjects}
            <div class="m-4 flex-none flex items-center w-full">
              <div class="mr-4 relative h-10 w-full min-w-[200px]">
                <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-orange-500">
                  <i class="fa-brands fa-github"></i>
                </div>
                <input
                  id="${projectInputID}"
                  class="${
                    possibleProjectValid
                      ? 'peer h-full w-full rounded-[7px] border border-orange-200 border-t-transparent bg-white ' +
                        'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border ' +
                        'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ' +
                        'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                      : 'peer h-full w-full rounded-[7px] border border-orange-200 border-t-transparent bg-white ' +
                        'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-red-800 outline outline-0 transition-all placeholder-shown:border ' +
                        'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ' +
                        'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                  }"
                  placeholder="${possibleProject !== 'INVALID' ? 'Paste Git Repository' : 'INVALID PASTE NEW GIT REPO'}"
                  value="${possibleProject !== 'INVALID' ? possibleProject : ''}"
                />
              </div>
              <button
                id="${installProjectID}"
                class="w-44 m-2 center-m bg-/5 bg-orange-800/5 hover:bg-orange-500 text-orange-50 hover:text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded"
              >
                Project <i class="fa-solid fa-plus"></i>
              </button>

            </div>
            <div class="m-4 flex-none flex items-center w-full">
              <select id="${transformationSelectionID}" class="${
              'mr-4 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 ' +
              'focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500' +
              'dark:focus:border-blue-500'
            }">
${transformationStrategies
  .map((str) => `<option ${selectedTransformation === str ? 'select' : ''} value="${str}"> ${str}</option>`)
  .join('')}
              </select>
              <button
                id="${triggerCreateTransformationDataSetID}"
                class="w-44 m-2 center-m bg-blue-800/5 hover:bg-blue-500 text-blue-50 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Strategy <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <h1 class="m-4 text-white text-3xl w-full text-center">Data Sets</h1>
            <div class="flex-none flex items-center w-full">
              <button id=${addEntryID} class="mb-8 mt-2 center-m bg-green-800/5 hover:bg-green-500 text-green-50 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                Custom Data Set <i class="fa-solid fa-plus"></i>
              </button>
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Load <i class="fa-solid fa-folder-open"></i>
              </button>
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Unify <i class="fa-solid fa-code-merge"></i>
              </button>
${
  !anySelected
    ? /*html*/ `
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Remove <i class="fa-solid fa-trash"></i>
              </button>
`
    : /*html*/ `
              <button id="${removeID}"
                class="italic cursor-pointer mb-8 mt-2 center-m bg-red-800/5 hover:bg-red-800 text-white font-semibold hover:text-black py-2 px-4 border border-red-800 hover:border-transparent rounded">
                Remove <i class="fa-solid fa-trash"></i>
              </button>
`
}
${
  !anySelected
    ? /*html*/ `
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Save <i class="fa-solid fa-floppy-disk"></i>
              </button>
`
    : /*html*/ `
              <button id="${saveID}"
                class="italic cursor-pointer mb-8 mt-2 center-m bg-white/5 hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded">
                Save <i class="fa-solid fa-floppy-disk"></i>
              </button>
`
}
            </div>
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
/*#>*/

// <button
//   class="w-44 m-2 center-m bg-/5 bg-orange-800/5 hover:bg-orange-500 text-orange-50 hover:text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded"
// >
//   Load <i class="fa-solid fa-folder-open"></i>
// </button>
