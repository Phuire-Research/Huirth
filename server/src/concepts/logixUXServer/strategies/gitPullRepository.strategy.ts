/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will git pull a targeted repository and inform the client if the repository was updated.
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from 'stratimux';
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
  }));
  const stepGitPull = createActionNode(logixUXServerGitPullRepository({
    path: dataPath
  }), {
    successNode: stepUpdateProjectStatusToPulled,
    agreement: 60000
  });
  return createStrategy({
    topic: logixUXServerGitPullRepositoryTopic,
    initialNode: stepGitPull,
  });
};
/*#>*/