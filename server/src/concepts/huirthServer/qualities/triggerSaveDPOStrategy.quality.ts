/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save DPO ActionStrategy.
$>*/
/*<#*/
import { createMethodDebounceWithConcepts, createQualityCard, nullReducer, selectState, strategyBegin } from 'stratimux';
import { HuirthServerDeck, huirthServerName, huirthServerState } from '../huirthServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveDPOStrategy } from '../strategies/saveDPO.strategy';
import { userInterfaceServerName } from '../../userInterfaceServer/userInterfaceServer.concept';

export const huirthServerTriggerSaveDPOStrategy = createQualityCard<huirthServerState, HuirthServerDeck>({
  type: 'huirthServer trigger save DPO strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_, deck }) => {
      const state = selectState<huirthServerState>(concepts_, userInterfaceServerName);
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (state && fileSystemState) {
        const strategy = huirthServerSaveDPOStrategy(fileSystemState.root, state.activeDPO, deck);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
