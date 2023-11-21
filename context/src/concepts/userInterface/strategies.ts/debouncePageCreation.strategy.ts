import { ActionStrategy, createActionNode, createStrategy } from 'stratimux';
import { userInterfaceDebouncePageCreation } from '../qualities/debouncePageCreation.quality';

export const userInterfaceDebouncePageCreationStrategyTopic = 'User Interface Debounce Page Creation then Begin Page Creation Sequence';
export function userInterfaceDebouncePageCreationStrategy(): ActionStrategy {
  const stepAddToState = createActionNode(userInterfaceDebouncePageCreation(), {
    successNode: null,
    failureNode: null,
  });

  return createStrategy({
    topic: userInterfaceDebouncePageCreationStrategyTopic,
    initialNode: stepAddToState,
  });
}