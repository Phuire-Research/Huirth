/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the ActionStrategy that will clone a specified git repository.
$>*/
/*<#*/
import {
  Concepts,
  createMethodDebounceWithConcepts,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  selectState,
  strategyBegin,
} from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerCloneGitRepositoryToDirectoryStrategy } from '../strategies/cloneGitRepositoryToDirectory.strategy';
import { Subject } from 'rxjs';
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerTriggerCloneGitRepositoryStrategyPayload = {
  url: string;
  name: string;
};

export const huirthServerTriggerCloneGitRepositoryStrategy = createQualityCardWithPayload<
  huirthServerState,
  huirthServerTriggerCloneGitRepositoryStrategyPayload
>({
  type: 'huirthServer trigger clone git repository ActionStrategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_ }) => {
      const { name, url } = action.payload;
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (fileSystemState) {
        const strategy = huirthServerCloneGitRepositoryToDirectoryStrategy(fileSystemState.root, url, name);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
