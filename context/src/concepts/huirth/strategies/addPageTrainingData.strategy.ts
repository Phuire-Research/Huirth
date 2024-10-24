/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will append each page strategy's page composition to the state pages property.
$>*/
/*<#*/
import { ActionStrategy, Concepts, createActionNode, createActionNodeFromStrategy, createStrategy, Deck } from 'stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';
import { userInterfacePageToStateStrategyStitch } from '../../userInterface/strategies.ts/pageToState.strategy';
import { huirthSetTrainingDataPage } from '../qualities/setTrainingDataPage.quality';
import { HuirthDeck } from '../huirth.concept';

export const huirthAddTrainingDataPageStrategyTopic = 'User Interface add new Page Strategy, for: ';
export function huirthAddTrainingDataPageStrategy(
  name: string,
  pageStrategy: PageStrategyCreators,
  concepts: Concepts,
  deck: Deck<HuirthDeck>
): ActionStrategy {
  const setToTrainingDataPages = createActionNode(
    deck.huirth.e.huirthSetTrainingDataPage({
      trainingDataName: name,
    })
  );
  const [step, strategy] = userInterfacePageToStateStrategyStitch(pageStrategy(concepts), deck);
  step.successNode = setToTrainingDataPages;
  const stepPageToState = createActionNodeFromStrategy(strategy);
  const stepAddToState = createActionNode(
    deck.userInterface.e.userInterfaceAddNewPage({
      pageStrategy,
    }),
    {
      successNode: stepPageToState,
    }
  );

  return createStrategy({
    topic: huirthAddTrainingDataPageStrategyTopic + name,
    initialNode: stepAddToState,
    data: strategy.data,
    priority: 1100,
  });
}
/*#>*/
