/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will git pull a targeted repository and inform the client if the repository was updated.
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXServerSendUpdateProjectToInstalled } from './client/logixUXServerSendUpdateProjectToInstalled.helper';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { logixUXServerGitCloneRepoToDirectory } from '../qualities/gitCloneRepoToDirectory.quality';
import { logixUXServerGitPullRepository } from '../qualities/gitPullRepository.quality';
import { ProjectStatus } from '../../logixUX/logixUX.model';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';
import { logixUXUpdateProjectStatus } from '../../logixUX/qualities/updateProjectToStatus.quality';

export const logixUXServerGitPullRepositoryTopic = 'logixUXServer git pull target repository';
export const logixUXServerGitPullRepositoryStrategy = (root: string, name:string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  const stepUpdateProjectStatusToPulled = createActionNode(webSocketServerAppendToActionQue({
    actionQue: [
      logixUXUpdateProjectStatus({
        name,
        status: ProjectStatus.pulled
      })
    ]
  }), {
    successNode: null,
    failureNode: null
  });
  const stepGitPull = createActionNode(logixUXServerGitPullRepository({
    path: dataPath
  }), {
    successNode: stepUpdateProjectStatusToPulled,
    failureNode: null,
    agreement: 60000
  });
  return createStrategy({
    topic: logixUXServerGitPullRepositoryTopic,
    initialNode: stepGitPull,
  });
};
/*#>*/