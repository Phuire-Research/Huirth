/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will git pull a targeted repository and inform the client if the repository was updated.
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from 'stratimux';
import { huirthServerGitPullRepository } from '../qualities/gitPullRepository.quality';
import { ProjectStatus } from '../../huirth/huirth.model';
import { webSocketServerAppendToActionQue } from '../../webSocketServer/qualities/appendActionQue.quality';
import { huirthUpdateProjectStatus } from '../../huirth/qualities/updateProjectToStatus.quality';

export const huirthServerGitPullRepositoryTopic = 'huirthServer git pull target repository';
export const huirthServerGitPullRepositoryStrategy = (root: string, name: string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  const stepUpdateProjectStatusToPulled = createActionNode(
    webSocketServerAppendToActionQue.actionCreator({
      actionQue: [
        huirthUpdateProjectStatus.actionCreator({
          name,
          status: ProjectStatus.pulled,
        }),
      ],
    })
  );
  const stepGitPull = createActionNode(
    huirthServerGitPullRepository.actionCreator({
      path: dataPath,
    }),
    {
      successNode: stepUpdateProjectStatusToPulled,
      agreement: 60000,
    }
  );
  return createStrategy({
    topic: huirthServerGitPullRepositoryTopic,
    initialNode: stepGitPull,
  });
};
/*#>*/
