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
} from 'stratimux';
import { FileSystemDeck, FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirthServerCloneGitRepositoryToDirectoryStrategy } from '../strategies/cloneGitRepositoryToDirectory.strategy';
import { HuirthServerDeck, huirthServerState } from '../huirthServer.concept';
import { HuirthDeck } from '../../huirth/huirth.concept';
import { WebSocketServerDeck } from '../../webSocketServer/webSocketServer.concept';

export type huirthServerTriggerCloneGitRepositoryStrategyPayload = {
  url: string;
  name: string;
};

export const huirthServerTriggerCloneGitRepositoryStrategy = createQualityCardWithPayload<
  huirthServerState,
  huirthServerTriggerCloneGitRepositoryStrategyPayload,
  HuirthDeck & HuirthServerDeck & FileSystemDeck & WebSocketServerDeck
>({
  type: 'huirthServer trigger clone git repository ActionStrategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithConcepts(({ action, concepts_, deck }) => {
      const { name, url } = action.payload;
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (fileSystemState) {
        const strategy = huirthServerCloneGitRepositoryToDirectoryStrategy(fileSystemState.root, url, name, deck);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    }, 50),
});
/*#>*/
