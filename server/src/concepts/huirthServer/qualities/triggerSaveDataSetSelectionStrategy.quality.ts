/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the save data set selection ActionStrategy.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQualitySetWithPayload,
  selectPayload,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerSaveDataSetSelectionStrategy } from '../strategies/saveDataSetSelection.strategy';
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerTriggerSaveDataSetSelectionStrategyPayload = {
  names: string[]
}

export const [
  huirthServerTriggerSaveDataSetSelectionStrategy,
  huirthServerTriggerSaveDataSetSelectionStrategyType,
  huirthServerTriggerSaveDataSetSelectionStrategyQuality
] = createQualitySetWithPayload<huirthServerTriggerSaveDataSetSelectionStrategyPayload>({
  type: 'huirthServer trigger save data set selection strategy',
  reducer: (state: huirthServerState): huirthServerState => {
    return {
      ...state,
      dataSetSelection: state.dataSetSelection.map(() => false)
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const {names} = selectPayload<huirthServerTriggerSaveDataSetSelectionStrategyPayload>(action);
        const state = selectUnifiedState<huirthServerState>(concepts, semaphore as number);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState && state) {
          const {trainingData} = state;
          console.log('CHECK TRIGGER', fileSystemState.root, trainingData.length, names);
          const strategy = huirthServerSaveDataSetSelectionStrategy(fileSystemState.root, trainingData, names);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as UnifiedSubject, semaphore as number, 50
    )
});
/*#>*/