/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will clone a git repository to a target directory
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from '@phuire/stratimux';
import { huirthServerSendUpdateProjectToInstalled } from './client/huirthServerSendUpdateProjectToInstalled.helper';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { huirthServerGitCloneRepoToDirectory } from '../qualities/gitCloneRepoToDirectory.quality';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';
import { huirthUpdateProjectStatus } from '../../huirth/qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../../huirth/huirth.model';

export const huirthServerCloneGitRepositoryToDirectoryTopic = 'huirthServer clone git repository to directory';
export const huirthServerCloneGitRepositoryToDirectoryStrategy = (root: string, url: string, name: string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Step 3 Update status to installed by name as payload
  console.log('CLONING ', url, name);
  const stepUpdateProjectToUninstalled = createActionNode(
    webSocketServerAppendToActionQue.actionCreator({
      actionQue: [
        huirthUpdateProjectStatus.actionCreator({
          name,
          status: ProjectStatus.notInstalled,
        }),
      ],
    })
  );
  const stepUpdateProjectToInstalled = createActionNode(huirthServerSendUpdateProjectToInstalled(name));
  // Step 2 Git clone into that directory by name
  const stepCloneRepo = createActionNode(
    huirthServerGitCloneRepoToDirectory.actionCreator({
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
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory.actionCreator({ path: dataPath }), {
    successNode: stepCloneRepo,
    agreement: 60000,
  });
  return createStrategy({
    topic: huirthServerCloneGitRepositoryToDirectoryTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
