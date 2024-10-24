/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save training data ActionStrategy.
$>*/
/*<#*/
import { Concepts, createMethodDebounceWithConcepts, createQualityCard, nullReducer, selectState, strategyBegin } from 'stratimux';
import { HuirthServerDeck, huirthServerName, huirthServerState } from '../huirthServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';
import { Subject } from 'rxjs';
import { userInterfaceServerName } from '../../userInterfaceServer/userInterfaceServer.concept';

export const huirthServerTriggerSaveTrainingDataStrategy = createQualityCard<huirthServerState, HuirthServerDeck>({
  type: 'huirthServer trigger save training data strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_, deck }) => {
      const state = selectState<huirthServerState>(concepts_, userInterfaceServerName);
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (state && fileSystemState) {
        const strategy = huirthServerSaveTrainingDataStrategy(fileSystemState.root, deck);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
