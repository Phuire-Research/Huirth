import { Action, createActionNode, createStrategy } from 'stratimux';
import { documentObjectModelBindPayload } from '../qualities/bindPayload.quality';

export const documentObjectModelBindActionStrategyTopic = 'Document Object Model bind target Action with Payload';
export const documentObjectModelBindActionStrategy = (payload: unknown, target: Action) => {
  // Body
  const stepAction = createActionNode(target, {
    successNode: null,
    failureNode: null,
  });
  const stepBinding = createActionNode(documentObjectModelBindPayload(payload), {
    successNode: stepAction,
    failureNode: null,
  });
  return createStrategy({
    topic: `Bind payload to ${target.type}`,
    initialNode: stepBinding,
  });
};
