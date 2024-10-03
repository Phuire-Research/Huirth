/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save training data ActionStrategy.
$>*/
/*<#*/
import { Concepts, createMethodDebounceWithConcepts, createQualityCard, nullReducer, selectState, strategyBegin } from 'stratimux';
import { huirthServerName, huirthServerState } from '../huirthServer.concept';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveTrainingDataStrategy } from '../strategies/saveTrainingData.strategy';
import { Subject } from 'rxjs';

export const huirthServerTriggerSaveTrainingDataStrategy = createQualityCard({
  type: 'huirthServer trigger save training data strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_ }) => {
      const state = selectState<huirthServerState>(concepts_, huirthServerName);
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (state && fileSystemState) {
        const strategy = huirthServerSaveTrainingDataStrategy(fileSystemState.root);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
