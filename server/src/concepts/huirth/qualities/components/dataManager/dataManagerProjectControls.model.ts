import { Deck } from 'stratimux';
import { elementEventBinding } from '../../../../../model/html';
import { PreBind } from '../../../../../model/userInterface';
import { GeneralProjectStatuses, ProjectStatus, generateNumID } from '../../../huirth.model';
import { huirthSendTriggerParseRepositoryStrategy } from '../../sendTriggerParseRepositoryStrategy.quality';
import { HuirthDeck } from '../../../huirth.concept';

export const determineProjectControls = (statuses: GeneralProjectStatuses, deck: Deck<HuirthDeck>): [string, PreBind[]] => {
  const pb: PreBind[] = [];
  let final = '';
  let dataNote = '';
  let dataStatus = '';
  // console.log('CHECK STATUS', statuses);
  for (const [i, st] of statuses.entries()) {
    const dataID = '#projectID-' + generateNumID(i, 0);
    dataStatus = st.status;
    // console.log('WHAT IS THIS STATUS', st);
    switch (st.status) {
      case ProjectStatus.installed: {
        pb.push({
          action: deck.huirth.e.huirthSendTriggerParseRepositoryStrategy({ name: st.name }),
          elementId: dataID,
          eventBinding: elementEventBinding.onclick,
        });
        dataNote = 'Parse ' + st.name;
        break;
      }
      case ProjectStatus.pulled: {
        pb.push({
          action: deck.huirth.e.huirthSendTriggerParseRepositoryStrategy({ name: st.name }),
          elementId: dataID,
          eventBinding: elementEventBinding.onclick,
        });
        dataNote = 'Parse ' + st.name;
        break;
      }
      default: {
        dataNote = st.name;
      }
    }
    final += /*html*/ `
<div class="m-4 flex-none flex items-center justify-end w-full">
  <h2 class="w-full text-white text-center italic">${dataStatus}</h2>
  <button
    id="${dataID}"
    class="w-44 m-2 items-center bg-yellow-800/5 hover:bg-yellow-500 text-yellow-50 hover:text-white font-semibold py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
  >
    ${dataNote} <i class="fa-solid fa-campfire"></i>
  </button>
</div>
`;
  }
  return [final, pb];
};
