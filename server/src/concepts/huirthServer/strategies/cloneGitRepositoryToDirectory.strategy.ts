/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will clone a git repository to a target directory
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { huirthServerSendUpdateProjectToInstalled } from './client/huirthServerSendUpdateProjectToInstalled.helper';
import { ProjectStatus } from '../../huirth/huirth.model';
import { HuirthDeck } from '../../huirth/huirth.concept';
import { WebSocketServerDeck } from '../../webSocketServer/webSocketServer.concept';
import { HuirthServerDeck } from '../huirthServer.concept';
import { FileSystemDeck } from '../../fileSystem/fileSystem.concept';

export const huirthServerCloneGitRepositoryToDirectoryTopic = 'huirthServer clone git repository to directory';
export const huirthServerCloneGitRepositoryToDirectoryStrategy = (
  root: string,
  url: string,
  name: string,
  deck: Deck<HuirthDeck & HuirthServerDeck & WebSocketServerDeck & FileSystemDeck>
) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Step 3 Update status to installed by name as payload
  console.log('CLONING ', url, name);
  const stepUpdateProjectToUninstalled = createActionNode(
    deck.webSocketServer.e.webSocketServerAppendToActionQue({
      actionQue: [
        deck.huirth.e.huirthUpdateProjectStatus({
          name,
          status: ProjectStatus.notInstalled,
        }),
      ],
    })
  );
  const stepUpdateProjectToInstalled = createActionNode(huirthServerSendUpdateProjectToInstalled(name, deck));
  // Step 2 Git clone into that directory by name
  const stepCloneRepo = createActionNode(
    deck.huirthServer.e.huirthServerGitCloneRepoToDirectory({
      url,
      path: dataPath,
    }),
    {
      successNode: stepUpdateProjectToInstalled,
      // TODO: If failed we can use open to load a window with the git install webpage
      failureNode: stepUpdateProjectToUninstalled,
      agreement: 600000,
    }
  );
  // Step 1 Remove directory if exists based on name
  const stepRemoveDirectory = createActionNode(deck.fileSystem.e.fileSystemRemoveTargetDirectory({ path: dataPath }), {
    successNode: stepCloneRepo,
    agreement: 60000,
  });
  return createStrategy({
    topic: huirthServerCloneGitRepositoryToDirectoryTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
