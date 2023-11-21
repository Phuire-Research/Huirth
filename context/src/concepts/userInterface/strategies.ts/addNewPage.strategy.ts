import { ActionStrategy, createActionNode, createStrategy } from 'stratimux';
import { userInterfaceAddNewPage } from '../qualities/addNewPage.quality';
import { PageStrategyCreators } from '../../../model/userInterface';

export const userInterfaceAddNewPageStrategyTopic = 'User Interface add new Page';
export function userInterfaceAddNewPageStrategy(pageStrategy: PageStrategyCreators): ActionStrategy {
  const stepAddToState = createActionNode(
    userInterfaceAddNewPage({
      pageStrategy,
    }),
    {
      successNode: null,
      failureNode: null,
    }
  );

  return createStrategy({
    topic: userInterfaceAddNewPageStrategyTopic,
    initialNode: stepAddToState,
  });
}
