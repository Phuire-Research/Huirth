/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the delete data sets strategy based on passed payload.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerDeleteDataSetsStrategy } from '../strategies/deleteDataSets.strategy';
import { huirthState } from '../../huirth/huirth.concept';

export type huirthServerTriggerDeleteDataSetsStrategyPayload = {
  names: string[];
};

export const [
  huirthServerTriggerDeleteDataSetsStrategy,
  huirthServerTriggerDeleteDataSetsStrategyType,
  huirthServerTriggerDeleteDataSetsStrategyQuality,
] = createQualityCardWithPayload<huirthServerTriggerDeleteDataSetsStrategyPayload>({
  type: 'huirthServer trigger delete data sets strategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const { names } = selectPayload<huirthServerTriggerDeleteDataSetsStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        const state = selectUnifiedState<huirthState>(concepts, semaphore as number);
        if (fileSystemState && state) {
          const { trainingData } = state;
          const strategy = huirthServerDeleteDataSetsStrategy(fileSystemState.root, trainingData, names);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      },
      concepts$ as UnifiedSubject,
      semaphore as number,
      50
    ),
});
/*#>*/
