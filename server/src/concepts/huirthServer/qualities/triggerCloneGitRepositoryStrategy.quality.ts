/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will trigger the ActionStrategy that will clone a specified git repository.
$>*/
/*<#*/
import {
  Concepts,
  createMethodDebounceWithConcepts,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerCloneGitRepositoryToDirectoryStrategy } from '../strategies/cloneGitRepositoryToDirectory.strategy';
import { Subject } from 'rxjs';

export type huirthServerTriggerCloneGitRepositoryStrategyPayload = {
  url: string,
  name: string
}

export const [
  huirthServerTriggerCloneGitRepositoryStrategy,
  huirthServerTriggerCloneGitRepositoryStrategyType,
  huirthServerTriggerCloneGitRepositoryStrategyQuality
] = createQualitySetWithPayload<huirthServerTriggerCloneGitRepositoryStrategyPayload>({
  type: 'huirthServer trigger clone git repository ActionStrategy',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithConcepts(
      (action, concepts) => {
        const {name, url} = selectPayload<huirthServerTriggerCloneGitRepositoryStrategyPayload>(action);
        const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
        if (fileSystemState) {
          const strategy = huirthServerCloneGitRepositoryToDirectoryStrategy(fileSystemState.root, url, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      }, concepts$ as Subject<Concepts>, semaphore as number, 50
    )
});
/*#>*/