/*<$
For the graph programming framework Stratimux and the Huirth Brand Concept, generate a strategy that will remove a page by name and its union pageStrategy
$>*/
/*<#*/
import { ActionStrategy, createActionNode, createStrategy, Deck } from 'stratimux';
import { HuirthDeck } from '../huirth.concept';

export const huirthRemoveTrainingDataPageStrategyTopic = 'Huirth remove training data page strategy. ';
export function huirthRemoveTrainingDataPageStrategy(name: string, deck: Deck<HuirthDeck>): ActionStrategy {
  const filterFromTrainingDataPages = createActionNode(
    deck.huirth.e.huirthFilterTrainingDataPage({
      trainingDataName: name,
    })
  );
  const stepRemoveTrainingDataFromState = createActionNode(
    deck.userInterface.e.userInterfaceRemovePage({
      name,
    }),
    {
      successNode: filterFromTrainingDataPages,
    }
  );

  return createStrategy({
    topic: huirthRemoveTrainingDataPageStrategyTopic,
    initialNode: stepRemoveTrainingDataFromState,
    priority: 600,
  });
}
/*#>*/
