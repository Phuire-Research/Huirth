/*<$
For the graph programming framework Stratimux and the Huirth Brand Concept, generate a strategy that will remove a page by name and its union pageStrategy
$>*/
/*<#*/
import { ActionStrategy, createActionNode, createStrategy } from '@phuire/stratimux';
import { huirthFilterTrainingDataPage } from '../qualities/filterTrainingDataPage.quality';
import { userInterfaceRemovePage } from '../../userInterface/qualities/removePage.quality';

export const huirthRemoveTrainingDataPageStrategyTopic = 'Huirth remove training data page strategy. ';
export function huirthRemoveTrainingDataPageStrategy(name: string): ActionStrategy {
  const filterFromTrainingDataPages = createActionNode(
    huirthFilterTrainingDataPage.actionCreator({
      trainingDataName: name,
    })
  );
  const stepRemoveTrainingDataFromState = createActionNode(
    userInterfaceRemovePage.actionCreator({
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
