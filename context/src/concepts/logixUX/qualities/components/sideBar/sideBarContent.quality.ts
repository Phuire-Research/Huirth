/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the content slice of the Side Bar Component with the necessary bindings and selectors.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  ActionType,
  KeyedSelector,
  MethodCreator,
  UnifiedSubject,
  createMethodWithConcepts,
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
import { LogixUXState } from '../../../logixUX.concept';
import { UserInterfaceState } from '../../../../userInterface/userInterface.concept';
import { logixUX_createSideBarExpandedSelector, logixUX_createTrainingDataSelector } from '../../../logixUX.selector';
import { logixUXToggleSidebar } from '../../toggleSidebar.quality';
import { elementEventBinding } from '../../../../../model/html';

export const logixUXSideBarContentType: ActionType = 'create userInterface for SideBarContent';
export const logixUXSideBarContent = prepareActionComponentCreator(logixUXSideBarContentType);

const createSideBarContentMethodCreator: MethodCreator = (concepts$, semaphore) =>
  createMethodWithConcepts(
    (action, concepts) => {
      const state = selectUnifiedState<UserInterfaceState & LogixUXState>(concepts, semaphore as number);

      const payload = selectComponentPayload(action);
      const id = '#sideBarContent' + payload.pageTitle;
      const expandSideBarId = '#expandSideBarID';
      let liClass = ' relative flex items-center py-2 px-3 my-2 font-medium rounded-md bg-gray-100 hover:bg-white';
      let pages = '';
      if (state) {
        if (!state.sideBarExpanded) {
          liClass += ' hidden';
        }
        pages = /*html*/ `
<li class="${liClass} cursor-pointer"><a href="/"><i class="fa-solid fa-house"></i> Home</a></li>
<li class="${liClass} text-slate-400 italic cursor-not-allowed"><a><i class="fa-solid fa-compass"></i> Applications</a></li>
<li class="${liClass} text-slate-400 italic cursor-not-allowed"><a><i class="fa-solid fa-lightbulb"></i> Concepts</a></li>
<li class="${liClass} text-slate-400 italic cursor-not-allowed"><a><i class="fa-solid fa-fire"></i> Tutorials</a></li>
<li class="${liClass} text-slate-400 italic cursor-not-allowed"><a><i class="fa-solid fa-vial-circle-check"></i> Model Lab</a></li>
<li class="${liClass} text-slate-400 italic cursor-not-allowed"><a><i class="fa-sharp fa-solid fa-diagram-project"></i> Project Manager</a></li>
<li class="${liClass} cursor-pointer"><a href="/dataManager"><i class="fa-solid fa-book"></i> Data Manager</a></li>
`;
        for (const data of state.trainingData) {
          pages += /*html*/ `
<li class='${liClass}'><a href="/${data.name}"><i class="fa-solid fa-file"></i> ${data.name}</a></li>
`;
        }
      }
      const boundSelectors = [
        createBoundSelectors(id, logixUXSideBarContent(payload), [
          logixUX_createSideBarExpandedSelector(concepts, semaphore as number) as KeyedSelector,
          logixUX_createTrainingDataSelector(concepts, semaphore as number) as KeyedSelector,
        ]),
      ];
      if (action.strategy && state) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            boundSelectors,
            bindings: createBinding([
              { elementId: expandSideBarId, action: logixUXToggleSidebar(), eventBinding: elementEventBinding.onclick },
            ]),
            action: logixUXSideBarContent(payload),
            html: /*html*/ `
<div id="${id}" class="p-4 pb-2 flex flex-col justify-between items-center">
  <div class="flex mb-8">
    <img class="overflow-hidden transition-all ${
      state.sideBarExpanded ? 'p-2 w-52 max-w-none' : 'w-0'
    }" src="/static/PHUIRE-Title.png" alt="PhuirE">
    <!-- Navbar Logo -->
    <button id="${expandSideBarId}" class="h-24 p-1.5 rounded-lg bg-transparent hover:bg-gray-100">
      <i class="fa-solid fa-bars translate-y-1"></i>
    </button>
  </div>
  <!-- Navbar Menu -->
  <div class="flex overflow-y-scroll">
    <ul class="${state?.sideBarExpanded ? '' : 'w-0 overflow-hidden'} flex-1 px-3 text-xl">
      ${pages}
      <li class='${liClass} cursor-pointer'><a class="" href="https://github.com/Phuire-Research/logixUX"><i class="fa-brands fa-github"></i> Github</a></li>
    </ul>
  </div>
</div>
`,
          })
        );
      }
      return action;
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );

export const logixUXSideBarContentQuality = createQuality(logixUXSideBarContentType, defaultReducer, createSideBarContentMethodCreator);
/*#>*/
