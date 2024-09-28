/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the parse repository ActionStrategy set by name supplied by the incoming payload.
$>*/
/*<#*/
import {
  createMethodDebounceWithConcepts,
  createQualityCardWithPayload,
  nullReducer,
  selectState,
  strategyBegin,
} from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerParseRepositoryStrategy } from '../strategies/parseRepositoryIntoDataSet.strategy';
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerTriggerParseRepositoryStrategyPayload = {
  name: string;
};

export const huirthServerTriggerParseRepositoryStrategy =
  createQualityCardWithPayload<huirthServerState, huirthServerTriggerParseRepositoryStrategyPayload>({
    type: 'huirthServer trigger parse repository strategy',
    reducer: nullReducer,
    methodCreator: () =>
      createMethodDebounceWithConcepts(
        ({action, concepts}) => {
          const { name } = action.payload;
          const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
          if (fileSystemState) {
            const strategy = huirthServerParseRepositoryStrategy(fileSystemState.root, name);
            return strategyBegin(strategy);
          } else {
            return action;
          }
        }, 50
      ),
  });
/*#>*/
