/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will git pull a targeted repository and inform the client if the repository was updated.
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { ProjectStatus } from '../../huirth/huirth.model';
import { HuirthServerDeck } from '../huirthServer.concept';

export const huirthServerGitPullRepositoryTopic = 'huirthServer git pull target repository';
export const huirthServerGitPullRepositoryStrategy = (root: string, name: string, deck: Deck<HuirthServerDeck>) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  const stepUpdateProjectStatusToPulled = createActionNode(
    deck.webSocketServer.e.webSocketServerAppendToActionQue({
      actionQue: [
        deck.huirth.e.huirthUpdateProjectStatus({
          name,
          status: ProjectStatus.pulled,
        }),
      ],
    })
  );
  const stepGitPull = createActionNode(
    deck.huirthServer.e.huirthServerGitPullRepository({
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
