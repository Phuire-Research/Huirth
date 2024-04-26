/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will clone a git repository to a target directory
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXServerSendUpdateProjectToInstalled } from './client/logixUXServerSendUpdateProjectToInstalled.helper';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { logixUXServerGitCloneRepoToDirectory } from '../qualities/gitCloneRepoToDirectory.quality';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';
import { logixUXUpdateProjectStatus } from '../../logixUX/qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../../logixUX/logixUX.model';

export const logixUXServerCloneGitRepositoryToDirectoryTopic = 'logixUXServer clone git repository to directory';
export const logixUXServerCloneGitRepositoryToDirectoryStrategy = (root: string, url: string, name:string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Step 3 Update status to installed by name as payload
  console.log('CLONING ', url, name);
  const stepUpdateProjectToUninstalled = createActionNode(webSocketServerAppendToActionQue({ actionQue: [
    logixUXUpdateProjectStatus({
      name,
      status: ProjectStatus.notInstalled
    })
  ]}));
  const stepUpdateProjectToInstalled = createActionNode(logixUXServerSendUpdateProjectToInstalled(name));
  // Step 2 Git clone into that directory by name
  const stepCloneRepo = createActionNode(logixUXServerGitCloneRepoToDirectory({
    url,
    path: dataPath
  }), {
    successNode: stepUpdateProjectToInstalled,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: stepUpdateProjectToUninstalled,
    agreement: 600000
  });
  // Step 1 Remove directory if exists based on name
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: dataPath}), {
    successNode: stepCloneRepo,
    agreement: 60000
  });
  return createStrategy({
    topic: logixUXServerCloneGitRepositoryToDirectoryTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/