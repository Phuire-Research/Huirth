/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality that will create the Data Manager's body slice and bind all essential functions to properly manage a Stratimux project data.
$>*/
/*<#*/
import {
  KeyedSelector,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  nullReducer,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';

import { createBinding, createBoundSelectors, createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';
import { elementEventBinding } from '../../../../../model/html';
import { huirthState } from '../../../huirth.concept';
import {
  huirth_createDataSetSelectionSelector,
  huirth_createHuirthStatusSelector,
  huirth_createPossibleProjectValidSelector,
  huirth_createProjectStatusSelector,
  huirth_createSelectedTransformationSelector,
  huirth_createStratimuxStatusSelector,
  huirth_createTrainingDataSelector
} from '../../../huirth.selector';
import { huirthNewDataSet } from '../../newDataSet.quality';
import { PhuirEProjects, ProjectStatus, dataSetNameID, dataSetSelectionID, generateNumID } from '../../../huirth.model';
import { huirthUpdateDataSetName } from '../../updateDataSetName.quality';
import { huirthTriggerInstallGitRepository } from '../../triggerInstallGitRepository.quality';
import { huirthUpdateDataSetSelection } from '../../updateDataSetSelection.quality';
import { huirthSendTriggerParseRepositoryStrategy } from '../../sendTriggerParseRepositoryStrategy.quality';
import { huirthSendTriggerSaveDataSetSelectionStrategy } from '../../sendTriggerSaveDataSetSelectionStrategy.quality';
import { huirthRemoveDataSetSelection } from '../../removeDataSetSelection.quality';
import { determineProjectControls } from './dataManagerProjectControls.model';
import { huirthSetPossibleProject } from '../../setPossibleProject.quality';
import { huirthFilterTriggerInstallGitRepository } from '../../filterTriggerInstallGitRepository.quality';
import { huirthSetSelectedTransformation } from '../../setSelectedTransformation.quality';
import { huirthSendTriggerTransformationStrategy } from '../../../strategies/server/triggerTransformationStrategy.helper';
import { huirthSendTriggerSelectedTransformationStrategy } from '../../sendTriggerSelectedTransformationStrategy.quality';
import { huirthSendTriggerGitPullRepositoryStrategy } from '../../../strategies/server/triggerGitPullRepositoryStrategy.helper';

export const [
  huirthDataManagerContent,
  huirthDataManagerContentType,
  huirthDataManagerContentQuality
] = createQualitySetComponent({
  type: 'create userInterface for DataManagerContent',
  reducer: nullReducer,
  componentCreator: (act, concepts$, _semaphore) =>
    createMethodDebounceWithConcepts((action, concepts, semaphore) => {
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
      const pullStratimuxID = '#pull_' + PhuirEProjects.stratimux;
      let finalStratimuxID = '#stratimuxID';
      let finalStratimuxNote = 'Stratimux';
      const parseStratimuxID = '#parse_' + PhuirEProjects.stratimux;
      const installHuirth_ID = '#install_' + PhuirEProjects.huirth;
      const pullHuirth_ID = '#pull_' + PhuirEProjects.huirth;
      let finalHuirth_ID = '#huirth_ID';
      let finalHuirth_note = 'Huirth';
      const parseHuirth_ID = '#parse_' + PhuirEProjects.huirth;
      if (action.strategy) {
        const {
          trainingData,
          stratimuxStatus,
          huirthStatus,
          dataSetSelection,
          projectsStatuses,
          possibleProject,
          possibleProjectValid,
          selectedTransformation,
          transformationStrategies
        } = (selectUnifiedState<huirthState>(concepts, semaphore) as huirthState);
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
            action: huirthUpdateDataSetName({index: i})
          });
          bindingsArray.push({
            elementId: dataSetSelectionID + elementID,
            eventBinding: elementEventBinding.onchange,
            action: huirthUpdateDataSetSelection({index: i})
          });
          finalOutput += /*html*/`
<div class="w-full ml-4 mt-2 mb-2">
  <div class="relative flex items-center h-10 w-full min-w-[200px]">
    <div class="absolute top-2/4 right-52 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
      <i class="fa-solid fa-book"></i>
    </div>
    <input
      id="${dataSetNameID + elementID}"
      class="${'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white ' +
'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all ' +
'placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 ' +
'focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'}"
      value="${trainingData[i].name}"
    />
    <button class="ml-4 italic cursor-pointer bg-purple-800/5 hover:bg-purple-500 text-purple-50 font-semibold hover:text-white py-2 px-4 border border-purple-400 hover:border-transparent border-solid rounded">
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
          action: huirthNewDataSet(),
          elementId: addEntryID,
          eventBinding: elementEventBinding.onclick
        });
        const stratimuxSaved = trainingData.filter(d => d.name.toLowerCase() === PhuirEProjects.stratimux.toLocaleLowerCase()).length > 0;
        const huirthSaved = trainingData.filter(d => d.name.toLowerCase() === PhuirEProjects.huirth.toLocaleLowerCase()).length > 0;
        if (stratimuxStatus === ProjectStatus.notInstalled) {
          bindingsArray.push({
            action: huirthTriggerInstallGitRepository({
              url: PhuirEProjects.stratimuxURL,
              name: PhuirEProjects.stratimux
            }),
            elementId: installStratimuxID,
            eventBinding: elementEventBinding.onclick
          });
          finalStratimuxID = installStratimuxID;
          finalStratimuxNote = 'Install Stratimux';
        } else if (stratimuxStatus === ProjectStatus.installed && !stratimuxSaved) {
          bindingsArray.push({
            action: huirthSendTriggerParseRepositoryStrategy({name: PhuirEProjects.stratimux}),
            elementId: parseStratimuxID,
            eventBinding: elementEventBinding.onclick
          });
          finalStratimuxID = parseStratimuxID;
          finalStratimuxNote = 'Parse Stratimux';
        } else if (stratimuxStatus === ProjectStatus.saved || stratimuxStatus === ProjectStatus.parsed) {
          bindingsArray.push({
            action: huirthSendTriggerGitPullRepositoryStrategy(PhuirEProjects.stratimux),
            elementId: pullStratimuxID,
            eventBinding: elementEventBinding.onclick
          });
          finalStratimuxID = pullStratimuxID;
          finalStratimuxNote = 'Pull Stratimux';
        }
        if (huirthStatus === ProjectStatus.notInstalled) {
          bindingsArray.push({
            action: huirthTriggerInstallGitRepository({
              url: PhuirEProjects.huirth_URL,
              name: PhuirEProjects.huirth
            }),
            elementId: installHuirth_ID,
            eventBinding: elementEventBinding.onclick
          });
          finalHuirth_ID = installHuirth_ID;
          finalHuirth_note = 'Install Huirth';
        } else if (huirthStatus === ProjectStatus.installed && !huirthSaved) {
          bindingsArray.push({
            action: huirthSendTriggerParseRepositoryStrategy({name: PhuirEProjects.huirth}),
            elementId: parseHuirth_ID,
            eventBinding: elementEventBinding.onclick
          });
          finalHuirth_ID = parseHuirth_ID;
          finalHuirth_note = 'Parse Huirth';
        } else if (huirthStatus === ProjectStatus.saved || huirthStatus === ProjectStatus.parsed) {
          bindingsArray.push({
            action: huirthSendTriggerGitPullRepositoryStrategy(PhuirEProjects.huirth),
            elementId: pullHuirth_ID,
            eventBinding: elementEventBinding.onclick
          });
          finalHuirth_ID = pullHuirth_ID;
          finalHuirth_note = 'Pull Huirth';
        }
        bindingsArray.push({
          action: huirthSendTriggerSaveDataSetSelectionStrategy(),
          elementId: saveID,
          eventBinding: elementEventBinding.onclick
        });
        bindingsArray.push({
          action: huirthRemoveDataSetSelection(),
          elementId: removeID,
          eventBinding: elementEventBinding.onclick
        });
        bindingsArray.push({
          action: huirthSetPossibleProject(),
          elementId: projectInputID,
          eventBinding: elementEventBinding.onkeyup
        });
        bindingsArray.push({
          action: huirthSetPossibleProject(),
          elementId: projectInputID,
          eventBinding: elementEventBinding.onpaste
        });
        bindingsArray.push({
          action: huirthFilterTriggerInstallGitRepository(),
          elementId: installProjectID,
          eventBinding: elementEventBinding.onclick
        });
        bindingsArray.push({
          action: huirthSetSelectedTransformation(),
          elementId: transformationSelectionID,
          eventBinding: elementEventBinding.onchange
        });
        bindingsArray.push({
          action: huirthSendTriggerSelectedTransformationStrategy(),
          elementId: triggerCreateTransformationDataSetID,
          eventBinding: elementEventBinding.onclick
        });
        const bindings = createBinding(bindingsArray);
        // console.log('Check bindings', bindings);
        const strategy = strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id,
          bindings,
          universal: false,
          boundSelectors: [
            // START HERE
            createBoundSelectors(id, huirthDataManagerContent(payload), [
              huirth_createTrainingDataSelector(concepts, semaphore) as KeyedSelector,
              huirth_createStratimuxStatusSelector(concepts, semaphore) as KeyedSelector,
              huirth_createHuirthStatusSelector(concepts, semaphore) as KeyedSelector,
              huirth_createDataSetSelectionSelector(concepts, semaphore) as KeyedSelector,
              huirth_createProjectStatusSelector(concepts, semaphore) as KeyedSelector,
              huirth_createPossibleProjectValidSelector(concepts, semaphore) as KeyedSelector,
              huirth_createSelectedTransformationSelector(concepts, semaphore) as KeyedSelector
            ])
          ],
          action: act(payload),
          html: /*html*/`
        <div class="flex flex-col items-center text-black" id='${id}'>
          <button class="italic cursor-not-allowed mb-4 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
            Open <i class="fa-solid fa-folder"></i>
          </button>
          <div class="p-8 pt-2 mt-2 bg-black/10 border border-t-2 rounded border-gray-700 [&>*:nth-child(3n+3)]:text-sky-400 [&>*:nth-child(2n+2)]:text-orange-400">
             <div class="m-4 flex-none flex items-center justify-end w-full">
              <h2 class="w-full text-white text-center italic">${stratimuxStatus}</h2>
              <button
                id="${finalStratimuxID}"
                class="w-44 m-2 items-center bg-red-800/5 hover:bg-red-500 text-red-50 hover:text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                ${finalStratimuxNote} <img class="inline w-[27px]" src="/static/Stratimux-Spiral.png">
              </button>
            </div>
            <div class="m-4 flex-none flex items-center justify-end w-full">
              <h2 class="w-full text-white text-center italic">${huirthStatus}</h2>
              <button
                id="${finalHuirth_ID}"
                class="w-44 m-2 items-center bg-yellow-800/5 hover:bg-yellow-500 text-yellow-50 hover:text-white font-semibold py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
              >
                ${finalHuirth_note} <img class="inline w-[27px]" src="/static/logixUX-Spiral.png">
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
                  class="${possibleProjectValid ? 'peer h-full w-full rounded-[7px] border border-orange-200 border-t-transparent bg-white ' +
'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border ' +
'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ' +
'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50' : 'peer h-full w-full rounded-[7px] border border-orange-200 border-t-transparent bg-white ' +
'px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-red-800 outline outline-0 transition-all placeholder-shown:border ' +
'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ' +
'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'}"
                  placeholder="${possibleProject !== 'INVALID' ? 'Paste Git Repository' : 'INVALID PASTE NEW GIT REPO'}"
                  value="${possibleProject !== 'INVALID' ? possibleProject : ''}"
                />
              </div>
              <button
                id="${installProjectID}"
                class="${
  possibleProjectValid ?
    'w-44 m-2 bg-/5 bg-orange-800/5 hover:bg-orange-500 text-orange-50 hover:text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded'
    :
    'w-44 m-2 bg-/5 cursor-not-allowed bg-gray-800 hover:bg-gray-500 text-gray-50 hover:text-white font-semibold py-2 px-4 border border-gray-500 hover:border-transparent rounded'
}"
              >
                Project <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div class="m-4 flex-none flex items-center w-full">
              <select id="${transformationSelectionID}" class="${'mr-4 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 ' +
'focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500' +
'dark:focus:border-blue-500'}">
            <option>Select a Data Transformation Strategy</option>
${
  transformationStrategies.map(str => `<option ${selectedTransformation === str ? 'selected' : ''} value="${str}"> ${str}</option>`).join('')
}
              </select>
              <button
                id="${triggerCreateTransformationDataSetID}"
                class="w-44 m-2 bg-blue-800/5 hover:bg-blue-500 text-blue-50 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Strategy <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <h1 class="m-4 text-white text-3xl w-full text-center">Data Sets</h1>
            <div class="mb-4 flex-none flex items-center w-full">
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
  !anySelected ?
  /*html*/`
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Remove <i class="fa-solid fa-trash"></i>
              </button>
` : /*html*/`
              <button id="${removeID}"
                class="italic cursor-pointer mb-8 mt-2 center-m bg-red-800/5 hover:bg-red-800 text-white font-semibold hover:text-black py-2 px-4 border border-red-800 hover:border-transparent rounded">
                Remove <i class="fa-solid fa-trash"></i>
              </button>
`
}
${
  !anySelected ?
  /*html*/`
              <button class="italic cursor-not-allowed mb-8 mt-2 center-m bg-white/5 hover:bg-slate-500 text-slate-500 font-semibold hover:text-red-400 py-2 px-4 border border-slate-400 hover:border-transparent border-dashed rounded">
                Save <i class="fa-solid fa-floppy-disk"></i>
              </button>
` : /*html*/`
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
  `
        }));
        return strategy;
      }
      return action;
    }, concepts$ as UnifiedSubject, _semaphore as number, 50)
});
/*#>*/

// <button
//   class="w-44 m-2 center-m bg-/5 bg-orange-800/5 hover:bg-orange-500 text-orange-50 hover:text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded"
// >
//   Load <i class="fa-solid fa-folder-open"></i>
// </button>