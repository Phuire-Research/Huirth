/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the delete data sets strategy based on passed payload.
$>*/
/*<#*/
import { createMethodDebounceWithConcepts, createQualityCardWithPayload, nullReducer, selectState, strategyBegin } from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerDeleteDataSetsStrategy } from '../strategies/deleteDataSets.strategy';
import { huirthState } from '../../huirth/huirth.concept';
import { HuirthServerDeck, huirthServerName, huirthServerState } from '../huirthServer.concept';
import { userInterfaceServerName } from '../../userInterfaceServer/userInterfaceServer.concept';

export type huirthServerTriggerDeleteDataSetsStrategyPayload = {
  names: string[];
};

export const huirthServerTriggerDeleteDataSetsStrategy = createQualityCardWithPayload<
  huirthServerState,
  huirthServerTriggerDeleteDataSetsStrategyPayload,
  HuirthServerDeck
>({
  type: 'huirthServer trigger delete data sets strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_, deck }) => {
      const { names } = action.payload;
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      const state = selectState<huirthState>(concepts_, userInterfaceServerName);
      if (fileSystemState && state) {
        const { trainingData } = state;
        const strategy = huirthServerDeleteDataSetsStrategy(fileSystemState.root, trainingData, names, deck);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
