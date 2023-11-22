/*<$*/
// PROMPT: For the framework Stratimux and Document Object Model Concept, generate an ActionStrategy that will bind a event to a target action.
/*$>*/
/*<#*/
import { Action, createActionNode, createStrategy } from 'stratimux';
import { DocumentObjectModelBindPayloadPayload, documentObjectModelBindPayload } from '../qualities/bindPayload.quality';

export const documentObjectModelBindActionStrategyTopic = 'Document Object Model bind target Action with Payload';
export const documentObjectModelBindActionStrategy = (payload: DocumentObjectModelBindPayloadPayload, target: Action) => {
  // Body
  const stepAction = createActionNode(target, {
    successNode: null,
    failureNode: null
  });
  const stepBinding = createActionNode(documentObjectModelBindPayload(payload), {
    successNode: stepAction,
    failureNode: null
  });
  return createStrategy({
    topic: `Bind payload to ${target.type}`,
    initialNode: stepBinding,
  });
};
/*#>*/