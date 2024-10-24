/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an ActionStrategy that will set a target project status to the passed value of status.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { ProjectStatus } from '../huirth.model';
import { HuirthDeck } from '../huirth.concept';

export const huirthUpdateProjectStatusStrategyTopic = 'huirth set project status to the specified status';
export const huirthUpdateProjectStatusStrategy = (name: string, status: ProjectStatus, deck: Deck<HuirthDeck>) => {
  const stepSendToServer = createActionNode(
    deck.huirth.e.huirthUpdateProjectStatus({
      name,
      status,
    }),
    {
      // TODO: If failed we can use open to load a window with the git install webpage
      failureNode: null,
    }
  );
  const stepUpdateToInstalling = createActionNode(deck.huirth.e.huirthUpdateProjectStatus({ name, status: ProjectStatus.installing }), {
    successNode: stepSendToServer,
  });
  return createStrategy({
    topic: huirthUpdateProjectStatusStrategyTopic,
    initialNode: stepUpdateToInstalling,
  });
};
/*#>*/
