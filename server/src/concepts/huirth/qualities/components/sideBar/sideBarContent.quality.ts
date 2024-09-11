/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the content slice of the Side Bar Component with the necessary bindings and selectors.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  KeyedSelector,
  UnifiedSubject,
  createMethodWithConcepts,
  nullReducer,
  selectUnifiedState,
  strategySuccess,
  select,
  createMethodDebounceWithConcepts,
} from '@phuire/stratimux';

import {
  createBinding,
  createBoundSelectors,
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';
import { huirthState } from '../../../huirth.concept';
import { UserInterfaceState } from '../../../../userInterface/userInterface.concept';
import { huirth_createSideBarExpandedSelector, huirth_createTrainingDataSelector } from '../../../huirth.selector';
import { huirthToggleSidebar } from '../../toggleSidebar.quality';
import { elementEventBinding } from '../../../../../model/html';
import { userInterface_createPagesSelector } from '../../../../userInterface/userInterface.selector';

export const [huirthSideBarContent, huirthSideBarContentType, huirthSideBarContentQuality] = createQualityCardComponent({
  type: 'create userInterface for SideBarContent',
  reducer: nullReducer,
  componentCreator: (act, concepts$, semaphore) =>
    createMethodWithConcepts(
      (action, concepts) => {
        // console.log('SIDEBAR CONTENT', action.strategy);
        const state = selectUnifiedState<UserInterfaceState & huirthState>(concepts, semaphore as number);
        const payload = selectComponentPayload(action);
        const id = '#sideBarContent';
        const expandSideBarId = '#expandSideBarID';
        let liClass = 'w-48 overflow-hidden relative flex items-center py-2 px-3 my-2 font-medium rounded-md bg-gray-100 hover:bg-white';
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
            // let add = false;
            // state.pages.forEach(page => {
            //   if (page.title === data.name) {
            //     add = true;
            //   }
            // });
            // if (add) {
            pages += /*html*/ `
<li class='${liClass}'><a href="/${data.name}"><i class="fa-solid fa-file"></i> ${data.name}</a></li>
`;
            // }
          }
        }
        const boundSelectors = [
          createBoundSelectors(id, act(payload), [
            huirth_createSideBarExpandedSelector(concepts, semaphore as number) as KeyedSelector,
            huirth_createTrainingDataSelector(concepts, semaphore as number) as KeyedSelector,
          ]),
        ];
        if (action.strategy && state) {
          return strategySuccess(
            action.strategy,
            userInterface_appendCompositionToPage(action.strategy, {
              id,
              boundSelectors,
              universal: true,
              bindings: createBinding([
                { elementId: expandSideBarId, action: huirthToggleSidebar(), eventBinding: elementEventBinding.onclick },
              ]),
              action: act(payload),
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
      <li class='${liClass} cursor-pointer'><a class="" href="https://github.com/Phuire-Research/huirth"><i class="fa-brands fa-github"></i> Github</a></li>
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
    ),
});
/*#>*/
