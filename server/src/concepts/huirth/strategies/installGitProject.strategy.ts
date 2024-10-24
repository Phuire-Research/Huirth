/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that will set a target project status to installing then utilize the client helper function to trigger the git clone strategy on the server.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { ProjectStatus } from '../huirth.model';
import { huirthTriggerCloneGitRepositoryStrategy } from './server/triggerCloneGitRepositoryStrategy.helper';
import { HuirthDeck } from '../huirth.concept';

export const huirthInstallGitRepositoryStrategyTopic = 'huirth set project status to installing then trigger git clone strategy on server';
export const huirthInstallGitRepositoryStrategy = (url: string, name: string, deck: Deck<HuirthDeck>) => {
  const stepSendToServer = createActionNode(huirthTriggerCloneGitRepositoryStrategy(url, name), {
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  const stepUpdateToInstalling = createActionNode(deck.huirth.e.huirthUpdateProjectStatus({ name, status: ProjectStatus.installing }), {
    successNode: stepSendToServer,
  });
  return createStrategy({
    topic: huirthInstallGitRepositoryStrategyTopic,
    initialNode: stepUpdateToInstalling,
  });
};
/*#>*/
