/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save data set selection ActionStrategy.
$>*/
/*<#*/
import { createMethodDebounceWithConcepts, createQualityCardWithPayload, selectPayload, selectState, strategyBegin } from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveDataSetSelectionStrategy } from '../strategies/saveDataSetSelection.strategy';
import { HuirthServerDeck, huirthServerName, huirthServerState } from '../huirthServer.concept';
import { userInterfaceServerName } from '../../userInterfaceServer/userInterfaceServer.concept';

export type huirthServerTriggerSaveDataSetSelectionStrategyPayload = {
  names: string[];
};

export const huirthServerTriggerSaveDataSetSelectionStrategy = createQualityCardWithPayload<
  huirthServerState,
  huirthServerTriggerSaveDataSetSelectionStrategyPayload,
  HuirthServerDeck
>({
  type: 'huirthServer trigger save data set selection strategy',
  reducer: (state) => {
    return {
      dataSetSelection: state.dataSetSelection.map(() => false),
    };
  },
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_, deck }) => {
      const { names } = action.payload;
      const state = selectState<huirthServerState>(concepts_, userInterfaceServerName);
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      console.log('CHECK TRIGGER', fileSystemState, state, names);
      if (fileSystemState && state) {
        const { trainingData } = state;
        console.log('CHECK TRIGGER', fileSystemState.root, trainingData.length, names);
        const strategy = huirthServerSaveDataSetSelectionStrategy(fileSystemState.root, trainingData, names, deck);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
